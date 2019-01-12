import * as THREE from 'three';
import pic from './../images/auroraCube.jpg';

export default function StarrySkybox(scene) {
    // //skybox
    // var picResources  = [frontPic, backPic, topPic, bottomPic, leftPic, rightPic];
    var picResources = [pic, pic, pic, pic, pic, pic]
    scene.background = new THREE.CubeTextureLoader().load(picResources);    
}