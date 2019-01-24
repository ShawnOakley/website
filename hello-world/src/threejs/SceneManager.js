// https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f
// https://github.com/PierfrancescoSoffritti/Doodling/blob/master/14.%20Three.js%20template/js/SceneManager.js
import * as THREE from 'three';

import SCENE_CONSTANTS from './../constants/scenes';

// import GeneralLights from './sceneSubjects/GeneralLights';
// import TestSubject from './sceneSubjects/TestSubject';
import StarrySkybox from './sceneSubjects/StarrySkybox';
import SkyPlane from './sceneSubjects/SkyPlane';
import AnimatedLandscape from './sceneSubjects/AnimatedLandscape';

const OrbitControls = require('three-orbitcontrols')

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
    const controls = buildControls(camera, sceneName, renderer);
    controls.update();  
    // need to set the camera to get the positions to update successfully               
    camera.position.set( 0, 20, 20 );          
    const sceneSubjects = createSceneSubjects(scene, sceneName, camera);

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


            default:
                var orbitControls = new OrbitControls(camera, renderer.domElement)
                // orbitControls.autoRotate = true;
                orbitControls.enableDamping = true
                orbitControls.dampingFactor = 0.25
                orbitControls.enableZoom = false
                return orbitControls;
        }        
    }

    function buildCamera({ width, height }, sceneName) {
        switch (sceneName) {                
            default:
                const aspectRatio = width / height;
                const fieldOfView = 60;
                const nearPlane = 1;
                const farPlane = 700; 
                const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
                camera.target = new THREE.Vector3( 0, 0, 0 ); 
                return camera;
        }
    }

    function createSceneSubjects(scene, sceneName, camera) {

        switch (sceneName) {
            case SCENE_CONSTANTS.SCENE_INTRO: 
                return [
                    new AnimatedLandscape(scene),
                    new SkyPlane(scene),                    
                ];
            case SCENE_CONSTANTS.SCENE_PROJECTS: 
                return [
                    new StarrySkybox(scene, camera),                    
                ]                
            default:
                return [];
        }
    }

    this.update = () => {
        // requestAnimationFrame( this.update );
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime);

        if (controls) {
            // var delta = clock.getDelta();
            controls.update();
        }
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