import * as THREE from 'three';
import baseColorTexture from './../images/textures/marble/baseColor.jpg';
import starBackground from './../images/background/star.jpg';
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    // console.log('++', window.innerWidth, window.innerHeight)
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
// https://shaderfrog.com/app/view/2293
// https://shaderfrog.com/app/view/164
// https://shaderfrog.com/app/view/74

// http://glslsandbox.com/e#52248.0

export default function ProjectsDisplayRoom({scene, camera, sceneObjects}) {

    // Floor
    var floorPlaneGeo = new THREE.PlaneGeometry( 800, 800, 2 );
    var texture = new THREE.TextureLoader().load( baseColorTexture );
    var floorMaterial = new THREE.MeshBasicMaterial({map: texture})        

    floorMaterial.side = THREE.BackSide
      var floorPlane = new THREE.Mesh( 
        floorPlaneGeo, 
        floorMaterial    
    );
    scene.add( floorPlane );

    floorPlane.position.set(0, -200, 0);
    floorPlane.rotation.x = Math.PI / 2;
    
    // Skybox
    var outerPlaneGeo = new THREE.SphereGeometry( 500, 100 );
    var outerPlaneTexture = new THREE.TextureLoader().load( starBackground );
    var outerPlaneMaterial = new THREE.MeshBasicMaterial({map: outerPlaneTexture})        
    outerPlaneMaterial.side = THREE.BackSide
    var outerPlane = new THREE.Mesh( outerPlaneGeo, outerPlaneMaterial );
    scene.add( outerPlane );
    outerPlane.position.set(0, 0, 0);


    // Sphere object
    var itemSphereGeo = new THREE.SphereGeometry( 25 );
    var itemMaterial = new THREE.MeshPhongMaterial( {
      color: 0xcc66ff
    } );
    var itemSphere = new THREE.Mesh( itemSphereGeo, itemMaterial );
    scene.add( itemSphere );
    itemSphere.position.set(200, 8, 0);

    this.update = function(time) {
	    // update the picking ray with the camera and mouse position
    	raycaster.setFromCamera( mouse, camera );

	    // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects( scene.children );
      if (intersects.length !== 8) {
        for ( var i = 0; i < intersects.length; i++ ) {
        //   if (
        //     // Filter out hits with wall and floor
        //     intersects[i].object.geometry && 
        //     intersects[i].object.geometry.uuid !== outerPlaneGeo.uuid &&
        //     intersects[i].object.geometry.uuid !== floorPlaneGeo.uuid
        //   ) {
        //     console.log('real intersection', intersects[i].object.geometry.uuid,  itemSphereGeo.uuid, intersects[i].object.geometry.uuid ===  itemSphereGeo.uuid)
        //     if (intersects[i].object.geometry.uuid ===  itemSphereGeo.uuid) {
        //       itemSphere.position.x = 10;
        //     } else {
        //       itemSphere.position.x = 100;
        //     }
            
        //     // intersects[ i ].object.material.color.set( 0xff0000 );
        //     // intersects[ i ].object.material.emissive.set( 0xff0000 );
    
        // }
      }

    }    
  }

    window.addEventListener( 'mousemove', onMouseMove, false );

    window.addEventListener( 'mousedown', onDocumentMouseDown, false );

    var projector = new THREE.Projector();
    
    function onDocumentMouseDown( event ) {
        event.preventDefault();
    
        var vector = new THREE.Vector3(
            ( event.clientX / window.innerWidth ) * 2 - 1,
          - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5
        );
        projector.unprojectVector( vector, camera );
    
        // var ray = new THREE.Ray( camera.position, 
        //                          vector.normalize() );

        //                          console.log("++++", itemSphereGeo)

        // var intersects = ray.intersectSphere( itemSphereGeo.boundingSphere, vector );
        // var intersects = ray.intersectObject( itemSphereGeo.boundingSphere, vector );
        // console.log('vec', vector)
    
        // if ( intersects.length > 0 ) {
    
            // intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );
    
            // var particle = new THREE.Particle( particleMaterial );
            // particle.position = intersects[ 0 ].point;
            // particle.scale.x = particle.scale.y = 8;
            // scene.add( particle );
    
        // }
    
        /*
        // Parse all the faces
        for ( var i in intersects ) {
            intersects[ i ].face.material[ 0 ].color
                .setHex( Math.random() * 0xffffff | 0x80000000 );
        }
        */
    }    
}