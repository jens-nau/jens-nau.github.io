"use strict";

import RobotLoader from "./RobotLoader";

import { Euler, Group, Quaternion, Vector3, Clock } from "three";

import {
  Joint,
  setIKFromUrdf,
  setUrdfFromIK,
  urdfRobotToIKRoot,
  WorkerSolver,
  Solver,
} from "../additional_modules/closed-chain-ik";

import { PointerURDFDragControls } from "urdf-loader/src/URDFDragControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { quat } from "gl-matrix";

class RobotManipulator extends RobotLoader {
  constructor(
    scene,
    camera,
    canvas,
    orbitControls,
    path,
    mode,
    endeffectorName,
    offset,
    ignoreLimits,
    enableWorldControls,
    init,
    webworker,
    solverOptions,
    material
  ) {
    super(
      scene,
      camera,
      canvas,
      orbitControls,
      path,
      mode,
      endeffectorName,
      offset,
      ignoreLimits,
      init,
      material
    );
    this.solve = true;
    this.webworker = webworker ?? true;
    this.enableWorldControls = enableWorldControls ?? true;

    const defaultSolverOptions = {
      useSVD: true,
      maxIterations: 5,
      stallThreshold: 1e-4,
      divergeThreshold: 0.01,
      dampingFactor: 0.001,
      restPoseFactor: 0.01,
      translationConvergeThreshold: 1e-3,
      rotationConvergeThreshold: 1e-5,
      translationFactor: 1,
      rotationFactor: 1,
      translationStep: 1e-3,
      rotationStep: 1e-3,
      translationErrorClamp: 0.1,
      rotationErrorClamp: 0.1,
    };

    this.solverOptions = solverOptions ?? defaultSolverOptions;
  }

  _onLoaded() {
    super._onLoaded();
    this._initializeTransformControls();
    this._initalizeWorldControls();
    this._loadInverseControls();
    this._render();
    window.addEventListener("resize", this._onWindowResize.bind(this));
  }

  _render() {
    this.animationRequest = requestAnimationFrame(this._render.bind(this));
    if (this.mode === "inverse" && this.solve) {
      this._solveInverseControls();
    }
  }

  _initializeTransformControls() {
    const transformControls = new TransformControls(this.camera, this.canvas);
    transformControls.setSpace("local");
    transformControls.addEventListener(
      "mouseDown",
      () => (this.orbitControls.enabled = false)
    );
    transformControls.addEventListener(
      "mouseUp",
      () => (this.orbitControls.enabled = true)
    );
    this.transformControls = transformControls;
    if (this.mode === "inverse") {
      this.scene.add(this.transformControls);
    }

    const targetObject = new Group();
    this.targetObject = targetObject;
    this.scene.add(this.targetObject);
    this.transformControls.attach(this.targetObject);
  }

  _initalizeWorldControls() {
    this.clock = new Clock();
    this.clock.start();

    this.worldControlsBasePosition = new Vector3(-30, -25, -100);
    this.worldControlsBasePosition.x =
      this.worldControlsBasePosition.y * this.camera.aspect;
    this.worldControlsPositionMemory = new Vector3(0, 0, 0);

    const worldControls = new TransformControls(this.camera, this.canvas);
    worldControls.setSize(0.5);
    worldControls.setSpace("world");
    worldControls.addEventListener("mouseDown", () => {
      this.orbitControls.enabled = false;
    });
    worldControls.addEventListener("mouseUp", () => {
      this.orbitControls.enabled = true;
      this.worldControlsBase.position.set(
        ...Object.values(this.worldControlsBasePosition)
      );
      this.worldControlsPositionMemory = new Vector3(0, 0, 0);
    });
    worldControls.addEventListener("change", () => {
      for (const key of Object.keys(worldControlsBase.position)) {
        this.worldControlsPositionMemory[key] =
          this.worldControlsBase.position[key] -
          this.worldControlsBasePosition[key];
      }
    });

    this.worldControls = worldControls;
    if (this.enableWorldControls) {
      this.scene.add(this.worldControls);
    }

    const worldControlsBase = new Group();
    this.worldControlsBase = worldControlsBase;
    this.scene.add(this.worldControlsBase);
    this.worldControls.attach(this.worldControlsBase);
    this.worldControlsBase.position.set(
      ...Object.values(this.worldControlsBasePosition)
    );
    this.camera.add(worldControlsBase);
  }

  _loadInverseControls() {
    this.inverseKinematic = urdfRobotToIKRoot(this.robot);
    this.inverseKinematic.clearDoF();
    quat.fromEuler(this.inverseKinematic.quaternion, -90, 0, 0);
    this.inverseKinematic.setMatrixNeedsUpdate();
    setIKFromUrdf(this.inverseKinematic, this.robot);
    if (this.ignoreLimits) {
      this.inverseKinematic.traverse((child) => {
        if (child.isJoint && child.dof.length > 0) {
          child.setMaxLimit(child.dof[0], Infinity);
          child.setMinLimit(child.dof[0], -Infinity);
        }
      });
    }

    this.goal = this._loadGoal();
    this.inverseKinematic.updateMatrixWorld(true);
    this.solver = this.webworker
      ? new WorkerSolver(this.inverseKinematic)
      : new Solver(this.inverseKinematic);
  }

  _solveInverseControls() {
    const [x, y, z, w] = [...Object.values(this.camera.quaternion)];
    this.worldControlsBase.quaternion.set(x, y, z, -w);
    if (this.clock.getElapsedTime() > 0.01 && this.enableWorldControls) {
      this.clock.start();
      if (
        this.worldControlsBase.position.x - this.worldControlsBasePosition.x !==
          0 ||
        this.worldControlsBase.position.y - this.worldControlsBasePosition.y !==
          0 ||
        this.worldControlsBase.position.z - this.worldControlsBasePosition.z !==
          0
      ) {
        const position = this.endeffector.position.clone();
        const update = this.worldControlsPositionMemory.clone();
        update.applyQuaternion(this.camera.quaternion);
        for (const key of Object.keys(position)) {
          position[key] = position[key] + update[key] / 500;
        }
        this.setEndeffector(undefined, position);
      }
    }

    this.goal.setPosition(
      this.targetObject.position.x,
      this.targetObject.position.y,
      this.targetObject.position.z
    );
    this.goal.setQuaternion(
      this.targetObject.quaternion.x,
      this.targetObject.quaternion.y,
      this.targetObject.quaternion.z,
      this.targetObject.quaternion.w
    );
    if (this.solver instanceof WorkerSolver) {
      this.solver.updateSolverSettings(this.solverOptions);
      this.solver.updateFrameState(this.goal);
      if (!this.solver.running) {
        this.solver.solve();
      }
    } else {
      Object.assign(this.solver, this.solverOptions);
      this.solver.solve();
    }

    setUrdfFromIK(this.robot, this.inverseKinematic);
  }

  _updateInverseControls() {
    this.solve = false;
    setIKFromUrdf(this.inverseKinematic, this.robot);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solve = true;
  }

  _updateTarget(matrix) {
    this.targetObject.position.setFromMatrixPosition(matrix);
    this.targetObject.quaternion.setFromRotationMatrix(matrix);
  }

  _loadGoal() {
    const tool = this.inverseKinematic.find(
      (link) => link.name === this.endeffectorName
    );
    const endeffectorJoint = new Joint();
    endeffectorJoint.name = this.endeffectorLink.name;
    endeffectorJoint.makeClosure(tool);
    tool.getWorldPosition(endeffectorJoint.position);
    tool.getWorldQuaternion(endeffectorJoint.quaternion);
    endeffectorJoint.setMatrixNeedsUpdate();
    this.targetObject.position.set(...endeffectorJoint.position);
    this.targetObject.quaternion.set(...endeffectorJoint.quaternion);
    return endeffectorJoint;
  }

  _loadForwardControls() {
    this.forwardControls = new (
      this.canvas.parentElement.style.width.includes("px")
        ? CustomPointerURDFDragControls
        : PointerURDFDragControls
    )(this.scene, this.camera, this.canvas);

    this.forwardControls.updateJoint = (joint, angle) => {
      if (this.mode === "forward") {
        this.robot.setJointValue(joint.name, angle);
      }
    };
    this.forwardControls.onHover = (joint) => {
      if (this.mode === "forward" || this.mode === "select") {
        this.highlightJointGeometry(joint, false, 0x606060);
        this.orbitControls.enabled = false;
      }
    };
    this.forwardControls.onUnhover = (joint) => {
      if (this.mode === "forward" || this.mode === "select") {
        this.highlightJointGeometry(joint, true);
        this.orbitControls.enabled = true;
      }
    };
    this.forwardControls.onDragStart = (joint) => {
      if (this.mode === "select") {
        this._resetEmission();
        if (joint.name !== this.selectedJoint.val) {
          this.highlightJointGeometry(joint, false, this.selectionColor);
          this.selectedJoint.val = joint.name;
        } else {
          this.selectedJoint.val = undefined;
        }
      }
    };

    this.selectedJoint = {
      internal: 10,
      listener: function (val) {},
      set val(val) {
        this.internal = val;
        this.listener(val);
      },
      get val() {
        return this.internal;
      },
      registerListener: function (listener) {
        this.listener = listener;
      },
    };
  }

  _onWindowResize() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.worldControlsBasePosition.x =
      this.worldControlsBasePosition.y * this.camera.aspect;
    this.worldControlsBase.position.set(
      ...Object.values(this.worldControlsBasePosition)
    );
    this.worldControlsPositionMemory = new Vector3(0, 0, 0);
  }

  setSolverOptions(solverOptions) {
    this.solverOptions = solverOptions;
  }

  setMode(mode) {
    if (this.mode === "select" && mode !== "select") {
      this.orbitControls.enabled = true;
      this._resetEmission();
      this.selectedJoint.val = undefined;
    }
    switch (mode) {
      case "forward":
        this.scene.remove(this.transformControls);
        this.scene.remove(this.worldControls);
        this.mode = mode;
        break;
      case "inverse":
        this._updateInverseControls();
        this.scene.add(this.transformControls);
        this.scene.add(this.worldControls);
        this._resetEmission();
        this.mode = mode;
        break;
      case "view":
        this.scene.remove(this.transformControls);
        this.scene.remove(this.worldControls);
        this._resetEmission();
        this.orbitControls.enabled = true;
        this.mode = mode;
        break;
      case "select":
        this.scene.remove(this.transformControls);
        this.scene.remove(this.worldControls);
        this.mode = mode;
        break;
      default:
        console.log(`WARNING: The mode "${mode}" does not exist.`);
        break;
    }
    console.log(`INFO: Mode: ${mode}`);
  }

  toggleMode() {
    if (this.mode === "inverse") {
      this.setMode("forward");
    } else if (this.mode === "forward") {
      this.setMode("view");
    } else if (this.mode === "view") {
      this.setMode("select");
    } else {
      this.setMode("inverse");
    }
  }

  setControlMode(mode) {
    if (["rotate", "translate"].includes(mode)) {
      this.transformControls.setMode(mode);
    } else {
      console.log(`WARNING: The control mode "${mode}" does not exist.`);
    }
  }

  toggleControlMode() {
    this.transformControls.setMode(
      this.transformControls.mode === "rotate" ? "translate" : "rotate"
    );
  }

  get controlMode() {
    return this.transformControls.mode;
  }

  toggleWorldControls() {
    if (this.enableWorldControls) {
      this.enableWorldControls = false;
      this.scene.remove(this.worldControls);
    } else {
      this.enableWorldControls = true;
      this.scene.add(this.worldControls);
    }
  }

  setPosition(position) {
    this.solve = false;
    super.setPosition(position);
    const [x, y, z] = [...Object.values(this.robot.position)];
    this.inverseKinematic.setPosition(x, y, z);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solver.updateStructure();
    this.solve = true;
  }

  setRotation(rotation, deg) {
    this.solve = false;
    super.setRotation(rotation, deg);
    const [x, y, z, w] = [...Object.values(this.robot.quaternion)];
    this.inverseKinematic.setQuaternion(x, y, z, w);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solver.updateStructure();
    this.solve = true;
  }

  setConfiguration(configuration, deg) {
    this.solve = false;
    super.setConfiguration(configuration, deg);
    setIKFromUrdf(this.inverseKinematic, this.robot);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solver.updateStructure();
    this.solve = true;
  }

  setJointValue(jointName, angle, deg) {
    this.solve = false;
    super.setJointValue(jointName, angle, deg);
    setIKFromUrdf(this.inverseKinematic, this.robot);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solver.updateStructure();
    this.solve = true;
  }

  setEndeffector(matrix, position, quaternion, rotation, deg) {
    let x, y, z, w;
    this.solve = false;
    if (matrix) {
      this._updateTarget(matrix);
    } else {
      if (position) {
        if (!(position instanceof Vector3)) {
          [x, y, z] = position;
        } else {
          [x, y, z] = [...Object.values(position)];
        }
        this.targetObject.position.set(x, y, z);
      }
      if (quaternion) {
        if (!(quaternion instanceof Quaternion)) {
          [x, y, z, w] = quaternion;
        } else {
          [x, y, z, w] = [...Object.values(quaternion)];
        }
        this.targetObject.quaternion.set(x, y, z, w);
      } else if (rotation) {
        if (!(rotation instanceof Euler)) {
          rotation = new Euler(...rotation);
        }
        if (deg) {
          rotation.set(
            rotation.x * (Math.PI / 180),
            rotation.y * (Math.PI / 180),
            rotation.z * (Math.PI / 180)
          );
        }
        this.targetObject.quaternion.setFromEuler(rotation);
      }
    }
    this.solve = true;
  }

  resetGizmo() {
    this._updateInverseControls();
  }

  resetRobot() {
    this.solve = false;
    super.resetRobot();
    this._updateInverseControls();
    this.solve = true;
  }

  lookAt(goal) {
    this.solve = false;
    super.lookAt(goal);
    const [x, y, z, w] = [...Object.values(this.robot.quaternion)];
    this.inverseKinematic.setQuaternion(x, y, z, w);
    this._updateTarget(this.endeffectorLink.matrixWorld);
    this.solver.updateStructure();
    this.solve = true;
  }
}

export default RobotManipulator;
