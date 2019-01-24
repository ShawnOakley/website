import * as THREE from 'three';
import fragmentShader from './../shaders/fragment/fragmentShader1';
import vertexShader from './../shaders/vertex/vertexShader1';

export default function SkyPlane(scene) {

    var planeGeometry = new THREE.PlaneGeometry( 800, 800, 2 );
    planeGeometry.computeBoundingBox();
    // 0xF00C6F
    //  0CA352
    // 0xFF8C00
    // 0xF71B64
        //   vec4(mix(color3, color2, min(tan(vUv.y*vUv.x*(time)), cos(vUv.y*vUv.x*(time)))), 0.75);
        // vec4(mix(color2, color1, min(tan(vUv.y*vUv.x*(time)), cos(vUv.y*vUv.x*(time)))), 0.75)
        // +
        // vec4(mix(color3, color2, min(tan(vUv.y*vUv.x*(time)), cos(vUv.y*vUv.x*(time)))), 0.75);    
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
    // var outerPlane = new THREE.Mesh( planeGeometry, planeMaterial );
    planeMaterial.side = THREE.BackSide
    var outerPlaneGeo = new THREE.SphereGeometry( 250, 250, 250 );
    var outerPlane = new THREE.Mesh( outerPlaneGeo, planeMaterial );

    scene.add( outerPlane );
    outerPlane.position.set(0, 0, -180);
    // outerPlane.position.set(0, 0, 0);

    
    var outerGeometry = new THREE.CircleGeometry( 75, 75, 100 );
    var outerMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00, emissive: 0xffff00} );
    var outerCircle = new THREE.Mesh( outerGeometry, outerMaterial );
    scene.add( outerCircle );
  	outerCircle.position.set(0, 0, -200);

    var uniforms = {
        color: new THREE.Uniform(new THREE.Vector3(1,0,0.023529411764705882)),
        lightPosition: new THREE.Uniform(new THREE.Vector3(-10, -10, -10)),
        edgeColor:new THREE.Uniform(new THREE.Vector3(0.023529411764705882, 0, 1))
      }

    var innerMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, uniforms ]),
        vertexShader,
        fragmentShader,
        wireframe:false,
        fog:true
      });

    var innerGeometry = new THREE.SphereGeometry( 40, 40, 45 );
    var innerCircle = new THREE.Mesh( innerGeometry, innerMaterial );
    scene.add( innerCircle );
    innerCircle.position.set(0, 10, -198);
    innerCircle.rotation.y = -Math.PI/2
    // innerCircle.rotation.x = Math.PI/2

  var innerCircle2 = new THREE.Mesh( innerGeometry, innerMaterial );
  scene.add( innerCircle2 );
  innerCircle2.position.set(0, 10, 50);
  innerCircle.rotation.y = -Math.PI/2
  // innerCircle.rotation.x = Math.PI/2    

    this.update = function(time) {
        outerPlane.material.uniforms.time.value = time%1000;
        // 100000
        // plane.material.emissive.setHex( 0xFFFFFF )
    }    
}