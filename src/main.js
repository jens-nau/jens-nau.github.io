"use strict";

import SceneLoader from "./SceneLoader";
import RobotManipulator from "./RobotManipulator";

const canvas = document.querySelector("canvas.webgl");

const sceneLoader = new SceneLoader(canvas);

const robotManipulator = new RobotManipulator(
  sceneLoader.scene,
  sceneLoader.camera,
  canvas,
  sceneLoader.orbitControls,
  "/urdf-model/modular-robot.urdf",
  "inverse"
);

const inverseText = document.querySelector(".inverse");
const mode = document.querySelector(".mode");

window.addEventListener("keydown", keydown);

function keydown(event) {
  switch (event.key) {
    case "q":
      if (robotManipulator.mode === "inverse") {
        robotManipulator.setMode("forward");
        inverseText.style.visibility = "hidden";
        mode.textContent = "Forward Control";
      } else {
        robotManipulator.setMode("inverse");
        inverseText.style.visibility = "visible";
        mode.textContent = "Inverse Control";
      }
    case "w":
      robotManipulator.toggleControlMode();
      break;
    case "r":
      robotManipulator.resetRobot();
      break;
  }
}
