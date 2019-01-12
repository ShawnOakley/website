import * as THREE from 'three';
// import frontPic from './../images/skybox-xpos.png';
// import backPic from './../images/skybox-xneg.png';
// import topPic from './../images/skybox-ypos.png';
// import bottomPic from './../images/skybox-yneg.png';
// import leftPic from './../images/skybox-zpos.png';
// import rightPic from './../images/skybox-zneg.png';
// import pano from './../images/equiRectangular.png'
// import pic from './../images/desert.jpeg'

export default function SkyPlane(scene) {

    
    var geometry = new THREE.PlaneGeometry( 100, 100, 100 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00, emissive: 0xFF4500, emissiveIntensity: 1000, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
	plane.position.set(0, 0, -200);

    this.update = function() {
        // plane.material.emissive.setHex( 0xFFFFFF )
    }    
}