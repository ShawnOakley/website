// https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f
// https://github.com/PierfrancescoSoffritti/Doodling/blob/master/14.%20Three.js%20template/js/SceneManager.js
import * as THREE from 'three';

import SCENE_CONSTANTS from './../constants/scenes';

// import GeneralLights from './sceneSubjects/GeneralLights';
// import TestSubject from './sceneSubjects/TestSubject';
import StarrySkybox from './sceneSubjects/StarrySkybox';
import SkyPlane from './sceneSubjects/SkyPlane';
import AnimatedLandscape from './sceneSubjects/AnimatedLandscape';

export default function SceneManager(canvas, sceneName, eventBus) {

    const clock = new THREE.Clock();
    this.canvas = canvas;
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions, sceneName);
    const controls = buildControls(camera, sceneName);
    const sceneSubjects = createSceneSubjects(scene, sceneName);

    setTimeout(()=>{
        eventBus.emit('test')
    }, 1000)

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    function buildRender({ width, height }) {
        try {
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
            const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(width, height);
    
            renderer.gammaInput = true;
            renderer.gammaOutput = true; 
    
            return renderer;
        }

        catch(err) {
            console.log(err)
        }

    }

    function buildControls(camera, sceneName) {
        switch (sceneName) {                
            case SCENE_CONSTANTS.SCENE_PROJECTS: 
                var orbitControls = new THREE.OrbitControls(camera)
                orbitControls.autoRotate = true;
            default:
                return null;
        }        
    }

    function buildCamera({ width, height }, sceneName) {
        switch (sceneName) {                
            default:
                const aspectRatio = width / height;
                const fieldOfView = 60;
                const nearPlane = 1;
                const farPlane = 300; 
                const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
                camera.target = new THREE.Vector3( 0, 0, 0 );
                return camera;
        }
    }

    function createSceneSubjects(scene, sceneName) {

        switch (sceneName) {
            case SCENE_CONSTANTS.SCENE_INTRO: 
                return [
                    new AnimatedLandscape(scene),
                    new SkyPlane(scene),                    
                ];
            case SCENE_CONSTANTS.SCENE_PROJECTS: 
                return [
                    new StarrySkybox(scene),                    
                ]                
            default:
                return [];
        }
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
        if (controls) {
            var delta = clock.getDelta();
            controls.update(delta);
        }
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