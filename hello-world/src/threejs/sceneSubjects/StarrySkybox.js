import * as THREE from 'three';
import pic from './../images/auroraCube.jpg';

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    // console.log('++', window.innerWidth, window.innerHeight)
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}



export default function StarrySkybox(scene, camera) {
    var outerGeometry = new THREE.CircleGeometry( 5 );
    var outerMaterial = new THREE.MeshPhongMaterial( {color: 0xcc66ff, emissive: 0xcc66ff} );
    outerMaterial.side = THREE.DoubleSide
    var outerCircle = new THREE.Mesh( outerGeometry, outerMaterial );
    scene.add( outerCircle );
  	outerCircle.position.set(20, 30, 10);    
    // //skybox
    // var picResources  = [frontPic, backPic, topPic, bottomPic, leftPic, rightPic];
    var picResources = [pic, pic, pic, pic, pic, pic]
    scene.background = new THREE.CubeTextureLoader().load(picResources);    
    this.update = function(time) {
	    // update the picking ray with the camera and mouse position
    	raycaster.setFromCamera( mouse, camera );

	    // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );
        console.log('intersects', intersects);
        if (intersects.length !== 8) {
            for ( var i = 0; i < intersects.length; i++ ) {
            
                intersects[ i ].object.material.color.set( 0xff0000 );
                intersects[ i ].object.material.emissive.set( 0xff0000 );
        
            }
        }

        // outerPlane.material.uniforms.time.value = time%1000;
        // 100000
        // plane.material.emissive.setHex( 0xFFFFFF )
    }    

    window.addEventListener( 'mousemove', onMouseMove, false );

    // window.requestAnimationFrame(render);    
}
