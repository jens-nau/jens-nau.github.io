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

window.addEventListener("keydown", keydown);

function keydown(event) {
  switch (event.key) {
    case "q":
      robotManipulator.toggleMode();
      break;
    case "t":
      console.log(robotManipulator.camera.aspect);
      break;
  }
}
