import * as THREE from 'three';
import pic from './../images/auroraCube.jpg';

export default function StarrySkybox(scene) {
    // //skybox
    // var picResources  = [frontPic, backPic, topPic, bottomPic, leftPic, rightPic];
    var picResources = [pic, pic, pic, pic, pic, pic]
    scene.background = new THREE.CubeTextureLoader().load(picResources);    
    this.update = function(time) {
        // outerPlane.material.uniforms.time.value = time%1000;
        // 100000
        // plane.material.emissive.setHex( 0xFFFFFF )
    }    
}