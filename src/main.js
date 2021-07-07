"use strict";

import SceneLoader from "./SceneLoader";
import RobotManipulator from "./RobotManipulator";
import { BoxGeometry, MeshBasicMaterial, Mesh, Box3 } from "three";

const canvas = document.querySelector("canvas.webgl");

let [qClicked, wClicked, rClicked] = [false, false, false];

const init = function () {
  this.colors["part18"].setHex(0xff0000);
};

const sceneLoader = new SceneLoader(canvas);

const robotManipulator = new RobotManipulator(
  sceneLoader.scene,
  sceneLoader.camera,
  canvas,
  sceneLoader.orbitControls,
  "/urdf-model/modular-robot.urdf",
  "inverse",
  undefined,
  undefined,
  undefined,
  undefined,
  init
);

const box = new Box3();
let cube;

const inverseText = document.querySelector(".inverse");
const mode = document.querySelector(".mode");

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

createRandomCube();

render();

function render() {
  requestAnimationFrame(render);
  box.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld);
  if (robotManipulator.loaded) {
    if (box.intersectsBox(robotManipulator.bboxGroup.children[12].box)) {
      sceneLoader.scene.remove(cube);
      createRandomCube();
    }
  }
}

function createRandomCube() {
  const geometry = new BoxGeometry(0.1, 0.1, 0.1);
  geometry.translate(
    Math.random() * 1.2 - 0.6,
    Math.random() * 0.6,
    Math.random() * 1.2 - 0.6
  );
  geometry.computeBoundingBox();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  cube = new Mesh(geometry, material);
  sceneLoader.scene.add(cube);
}

function keydown(event) {
  switch (event.key) {
    case "q":
      console.log(qClicked);
      if (!qClicked) {
        qClicked = true;
        if (robotManipulator.mode === "inverse") {
          robotManipulator.setMode("forward");
          inverseText.style.visibility = "hidden";
          mode.textContent = "Forward Control";
        } else {
          robotManipulator.setMode("inverse");
          inverseText.style.visibility = "visible";
          mode.textContent = "Inverse Control";
        }
      }
      break;
    case "w":
      if (!wClicked) {
        wClicked = true;
        robotManipulator.toggleControlMode();
      }
      break;
    case "r":
      if (!rClicked) {
        rClicked = true;
        sceneLoader.scene.remove(cube);
        createRandomCube();
        robotManipulator.resetRobot();
      }
      break;
  }
}

// TODO
function keyup(event) {
  switch (event.key) {
    case "q":
      qClicked = false;
      break;
    case "w":
      wClicked = false;
      break;
    case "r":
      rClicked = false;
      break;
  }
}
