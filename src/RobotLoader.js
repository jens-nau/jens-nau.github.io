"use strict";

import {
  LoadingManager,
  MeshPhysicalMaterial,
  Vector3,
  Quaternion,
  Euler,
} from "three";
import { PointerURDFDragControls } from "urdf-loader/src/URDFDragControls.js";
import URDFLoader from "urdf-loader";

class RobotLoader {
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
    init,
    material
  ) {
    this.scene = scene;
    this.path = path;
    this.mode = mode;
    this.selectedJoint = undefined;
    this.selectionColor = 0xff6666;
    this.camera = camera;
    this.canvas = canvas;
    this.orbitControls = orbitControls;
    this.endeffectorName = endeffectorName ?? "tool_dummy";

    this.colors = {};
    this.materials = {};

    const defaultOffset = new Vector3(0, 0, 0);

    this.offset = defaultOffset;
    offset && this.offset.set(...offset);

    this.ignoreLimits = ignoreLimits ?? true;

    const defaultMaterial = new MeshPhysicalMaterial({
      color: 0x404040,
      roughness: 0.5,
      metalness: 0.5,
    });

    this.material = material ?? defaultMaterial;

    this.manager = new LoadingManager();
    this.loader = new URDFLoader(this.manager);
    this.loaded = false;

    this.loader.load(path, (result) => {
      this.robot = result;
    });

    this.manager.onLoad = () => {
      this._onLoaded();
      init && init();
    };
  }

  _onLoaded() {
    this.robot.rotation.x = -Math.PI / 2;
    this.robot.updateMatrixWorld(true);
    this.robot.traverse((child) => {
      if (child.type === "Mesh") {
        const material = new MeshPhysicalMaterial();
        material.copy(this.material);
        child.castShadow = true;
        child.material = material;
      }
      if (this.ignoreLimits) {
        if ((child.type === "URDFJoint") & (child.jointType !== "fixed")) {
          child.ignoreLimits = true;
        }
      }
    });
    this.scene.add(this.robot);
    this.endeffectorLink = this.robot.links[this.endeffectorName];
    this.loaded = true;
    this._loadMaterials();
    this._loadForwardControls();
  }

  _loadForwardControls() {
    this.forwardControls = new PointerURDFDragControls(
      this.scene,
      this.camera,
      this.canvas
    );
    this.forwardControls.updateJoint = (joint, angle) => {};
    this.forwardControls.onHover = (joint) => {
      if (this.mode === "select") {
        this.highlightJointGeometry(joint, false, 0x606060);
        this.orbitControls.enabled = false;
      }
    };
    this.forwardControls.onUnhover = (joint) => {
      if (this.mode === "select") {
        this.highlightJointGeometry(joint, true);
        this.orbitControls.enabled = true;
      }
    };
    this.forwardControls.onDragStart = (joint) => {
      if (this.mode === "select") {
        this._resetEmission();
        if (joint.name !== this.selectedJoint) {
          this.highlightJointGeometry(joint, false, this.selectionColor);
          this.selectedJoint = joint.name;
        } else {
          this.selectedJoint = undefined;
        }
      }
    };
  }

  _loadMaterials() {
    this.robot.traverse((object) => {
      if (object.type === "URDFLink") {
        object.children.forEach((child) => {
          if (child.type === "URDFVisual") {
            this.materials[object.name] = child.children[0].material;
            0;
            this.colors[object.name] = child.children[0].material.color;
          }
        });
      }
    });
  }

  _resetEmission() {
    this.robot.traverse((child) => {
      if (child.type === "Mesh") {
        child.material.emissive.setHex(0);
      }
    });
  }

  highlightJointGeometry(object, undo, color) {
    const selectionColor = this.selectionColor;
    function traverse(child) {
      if (child.type === "Mesh") {
        if (child.material.emissive.getHex() !== selectionColor) {
          if (undo) {
            child.material.emissive.setHex(0);
          } else {
            child.material.emissive.setHex(color);
          }
        }
      }
      if (
        child === object ||
        !child.isURDFJoint ||
        child.jointType === "fixed"
      ) {
        for (let i = 0; i < child.children.length; i++) {
          traverse(child.children[i]);
        }
      }
    }
    traverse(object);
  }

  setMode(mode) {
    switch (mode) {
      case "select":
        this.mode = mode;
        break;
      case "view":
        this.orbitControls.enabled = true;
        this._resetEmission();
        this.selectedJoint = undefined;
        this.mode = mode;
        break;
      default:
        console.log(`WARNING: The mode "${mode}" does not exist.`);
        break;
    }
    console.log(`INFO: Mode: ${mode}`);
  }

  toggleMode() {
    this.setMode(this.mode === "view" ? "select" : "view");
  }

  get position() {
    return this.robot.position;
  }

  setPosition(position) {
    if (this.loaded) {
      if (!(position instanceof Vector3)) {
        const [x, y, z] = position;
        position = new Vector3(x, y, z);
      }
      for (const [axis, _] of Object.entries(this.robot.position)) {
        this.robot.position[axis] = position[axis] - this.offset[axis];
      }
      this.robot.updateMatrixWorld(true);
    } else {
      console.log("WARNING: Robot is still loading.");
    }
  }

  get rotation() {
    return this.robot.rotation.toVector3();
  }

  setRotation(rotation, deg) {
    if (this.loaded) {
      if (!(rotation instanceof Vector3)) {
        const [x, y, z] = rotation;
        rotation = new Vector3(x, y, z);
      }
      if (deg) {
        for (const [axis, _] of Object.entries(rotation)) {
          rotation[axis] = rotation[axis] * (Math.PI / 180);
        }
      }
      this.robot.rotation.setFromVector3(rotation);
      this.robot.updateMatrixWorld(true);
    } else {
      console.log("WARNING: Robot is still loading.");
    }
  }

  get configuration() {
    let configuration = {};
    if (this.loaded) {
      for (const [joint, value] of Object.entries(this.robot.joints)) {
        if (value.jointType !== "fixed") {
          configuration[joint] = value.angle;
        }
      }
    } else {
      console.log("WARNING: Robot is still loading.");
    }
    return configuration;
  }

  setConfiguration(configuration, deg) {
    if (this.loaded) {
      if (Array.isArray(configuration)) {
        let counter = 0;
        for (const [joint, value] of Object.entries(this.robot.joints)) {
          if (value.jointType !== "fixed" && counter < configuration.length) {
            if (deg) {
              this.robot.setJointValue(
                joint,
                configuration[counter] * (Math.PI / 180)
              );
            } else {
              this.robot.setJointValue(joint, configuration[counter]);
            }
            counter++;
          }
        }
      } else {
        for (const [joint, _] of Object.entries(configuration)) {
          if (!this.robot.joints[joint]) {
            console.log(`WARNING: The joint "${joint}" does not exists.`);
          } else if (this.robot.joints[joint].type === "fixed") {
            console.log(`WARNING: The joint "${joint}" is fixed.`);
          } else {
            if (deg) {
              this.robot.setJointValue(
                joint,
                configuration[joint] * (Math.PI / 180)
              );
            } else {
              this.robot.setJointValue(joint, configuration[joint]);
            }
          }
        }
      }
      this.robot.updateMatrixWorld(true);
    } else {
      console.log("WARNING: Robot is still loading.");
    }
  }

  setJointValue(jointName, angle, deg) {
    if (this.loaded) {
      if (deg) {
        angle = angle * (Math.PI / 180);
      }
      this.robot.setJointValue(jointName, angle);
    } else {
      console.log("WARNING: Robot is still loading.");
    }
    this.robot.updateMatrixWorld(true);
  }

  get endeffector() {
    const matrix = this.endeffectorLink.matrixWorld;
    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    position.setFromMatrixPosition(matrix);
    rotation.setFromRotationMatrix(matrix);
    quaternion.setFromRotationMatrix(matrix);
    const endeffector = {
      position: position,
      rotation: rotation,
      quaternion: quaternion,
      matrix: matrix,
    };
    return endeffector;
  }

  setColor(part, color) {
    if (Array.isArray(color)) {
      this.colors[part].setRGB(...color);
    } else {
      this.colors[part].setHex(color);
    }
  }

  setColors(colors) {
    for (const [key, value] of Object.entries(colors)) {
      this.colors[key].setRGB(...Object.values(value));
    }
  }

  setMaterial(part, material) {
    this.materials[part].copy(material);
  }

  setMaterials(materials) {
    for (const [key, value] of Object.entries(materials)) {
      this.materials[key].copy(value);
    }
  }

  resetRobot() {
    const configuration = this.configuration;
    for (const joint in configuration) {
      configuration[joint] = 0;
    }
    this.setConfiguration(configuration);
  }

  lookAt(goal) {
    if (this.loaded) {
      if (!(goal instanceof Vector3)) {
        const [x, y, z] = goal;
        goal = new Vector3(x, y, z);
      }
      this.robot.lookAt(goal);
      this.robot.updateMatrixWorld(true);
    } else {
      console.log("WARNING: Robot is still loading.");
    }
  }
}

export default RobotLoader;
