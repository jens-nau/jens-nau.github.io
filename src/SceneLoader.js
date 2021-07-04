"use strict";

import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  ShadowMaterial,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class SceneLoader {
  constructor(
    canvas,
    camera,
    renderer,
    directionalLight,
    ambientLight,
    orbitControls,
    groundObject
  ) {
    this.canvas = canvas;

    const defaultCamera = new PerspectiveCamera(50, 2, 0.01, 1000);
    defaultCamera.position.set(0, 0.5, 2.5);

    this.camera = camera ?? defaultCamera;

    const defaultRenderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas,
    });
    defaultRenderer.outputEncoding = sRGBEncoding;
    defaultRenderer.shadowMap.enabled = true;
    defaultRenderer.shadowMap.type = PCFSoftShadowMap;

    this.renderer = renderer ?? defaultRenderer;

    const defaultDirectionalLight = new DirectionalLight(0xffffff, 1.0);
    defaultDirectionalLight.castShadow = true;
    defaultDirectionalLight.shadow.mapSize.setScalar(1024);
    defaultDirectionalLight.position.set(5, 30, 5);

    this.directionalLight =
      directionalLight ?? (directionalLight || defaultDirectionalLight);

    const defaultAmbientLight = new AmbientLight(0xffffff, 0.2);

    this.ambientLight = ambientLight ?? (ambientLight || defaultAmbientLight);

    const defaultOrbitControls = new OrbitControls(this.camera, this.canvas);
    defaultOrbitControls.target = new Vector3(0, 0.5, 0);
    defaultOrbitControls.maxPolarAngle = (Math.PI / 16) * 8;
    defaultOrbitControls.minPolarAngle = 0;
    defaultOrbitControls.update();

    this.orbitControls =
      orbitControls ?? (orbitControls || defaultOrbitControls);

    const defaultGroundObject = new Mesh(
      new PlaneBufferGeometry(),
      new ShadowMaterial({ opacity: 0.25 })
    );
    defaultGroundObject.rotation.x = -Math.PI / 2;
    defaultGroundObject.scale.setScalar(30);
    defaultGroundObject.receiveShadow = true;

    this.groundObject = groundObject ?? (groundObject || defaultGroundObject);

    this.scene = new Scene();
    this.scene.add(this.camera);
    this.directionalLight && this.scene.add(this.directionalLight);
    this.ambientLight && this.scene.add(this.ambientLight);
    this.groundObject && this.scene.add(this.groundObject);

    this._render();
  }

  _render() {
    this._resizeCanvasToDisplaySize();
    this.animationRequest = requestAnimationFrame(this._render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  _resizeCanvasToDisplaySize() {
    if (
      this.canvas.width !== this.canvas.clientWidth ||
      this.canvas.height !== this.canvas.clientHeight
    ) {
      this.renderer.setSize(
        this.canvas.clientWidth,
        this.canvas.clientHeight,
        false
      );
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }
}

export default SceneLoader;
