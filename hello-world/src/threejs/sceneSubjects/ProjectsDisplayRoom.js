import * as THREE from 'three';
import baseColorTexture from './../images/textures/marble/baseColor.jpg';
import starBackground from './../images/background/star.jpg';

// https://shaderfrog.com/app/view/2293
// https://shaderfrog.com/app/view/164
// https://shaderfrog.com/app/view/74

// http://glslsandbox.com/e#52248.0

export default function ProjectsDisplayRoom(scene) {

    var planeGeometry = new THREE.PlaneGeometry( 800, 800, 2 );
    planeGeometry.computeBoundingBox();  
    // https://stackoverflow.com/questions/52614371/apply-color-gradient-to-material-on-mesh-three-js
    // https://stackoverflow.com/questions/26965787/how-to-get-accurate-fragment-screen-position-like-gl-fragcood-in-vertex-shader
    var planeMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color(0xf61414)
          },
          color2: {
            value: new THREE.Color(0xf69114)
          },
          color3: {
            value: new THREE.Color(0x2abbd0)
          },          
          bboxMin: {
            value: planeGeometry.boundingBox.min
          },
          bboxMax: {
            value: planeGeometry.boundingBox.max
          },
          time: {
            value: 0
          }            
        },
        vertexShader: `
            uniform vec3 bboxMin;
            uniform vec3 bboxMax;
        
            varying vec2 vUv;
        
            void main() {
            vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
            vUv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            
            varying vec2 vUv;
            uniform float time;
            
            void main() {
            
                gl_FragColor = 
                    vec4(mix(color2, color1, max(cos(vUv.y*(time)), sin(vUv.x*(time)))), 0.75)
                    +
                    vec4(mix(color3, color2, max(sin(vUv.x*(time)), sin(vUv.y*(time)))), 0.75);
            }
        `,
          wireframe: false
      });

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
    
    // planeMaterial.side = THREE.BackSide
    var outerPlaneGeo = new THREE.SphereGeometry( 500, 100 );
    var outerPlaneTexture = new THREE.TextureLoader().load( starBackground );
    var outerPlaneMaterial = new THREE.MeshBasicMaterial({map: outerPlaneTexture})        
    outerPlaneMaterial.side = THREE.BackSide
    var outerPlane = new THREE.Mesh( outerPlaneGeo, outerPlaneMaterial );
    scene.add( outerPlane );
    outerPlane.position.set(0, 0, 0);


    this.update = function(time) {
        // outerPlane.material.uniforms.time.value = time%1000;
        // plane.material.emissive.setHex( 0xFFFFFF )
    }    
}