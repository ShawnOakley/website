// https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f
// https://github.com/PierfrancescoSoffritti/Doodling/blob/master/14.%20Three.js%20template/js/SceneManager.js
import * as THREE from 'three';
import GeneralLights from './sceneSubjects/GeneralLights';
import TestSubject from './sceneSubjects/TestSubject';
import StarrySkybox from './sceneSubjects/StarrySkybox';
import SkyPlane from './sceneSubjects/SkyPlane';
import AnimatedLandscape from './sceneSubjects/AnimatedLandscape';

export default function SceneManager(canvas) {

    const clock = new THREE.Clock();
    this.canvas = canvas;
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color("#000");

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 300; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.target = new THREE.Vector3( 0, 0, 0 );
        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new AnimatedLandscape(scene),
            new SkyPlane(scene),
        ];
        return sceneSubjects;
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        const { width, height } = this.canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);

    }
}