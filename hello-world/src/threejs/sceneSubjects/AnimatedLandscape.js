import * as THREE from 'three';
import palette from './../../../static/img/pallete5.png';
import fragmentShader from './../shaders/fragment/fragmentShader1.js';
import vertexShader from './../shaders/vertex/vertexShader1.js';

export default function AnimatedLandscape(scene) {
	
    var fogColor = new THREE.Color( 0xd9b3ff )
    scene.fog = new THREE.Fog(fogColor, 10, 400);

    var geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

    var uniforms = {
      time: { type: "f", value: 0.0 },
      distortCenter: { type: "f", value: 0.1 },
      roadWidth: { type: "f", value: 0.5 },
      pallete:{ type: "t", value: null},
      speed: { type: "f", value: 0.5 },
      maxHeight: { type: "f", value: 10.0 },
      color:new THREE.Color(1, 1, 1)
    }

    // https://blog.cjgammon.com/threejs-custom-shader-material
    var material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, uniforms ]),
      vertexShader,
      fragmentShader,
      wireframe:false,
      fog:true
    });

    var terrain = new THREE.Mesh(geometry, material);
    terrain.position.z = -90;
    terrain.rotation.x = -Math.PI / 2
    terrain.position.y = -15;

    new THREE.TextureLoader().load(palette, function(texture){
      terrain.material.uniforms.pallete.value = texture;
      terrain.material.needsUpdate = true;
    });

    scene.add(terrain)    

    function map (value, start1, stop1, start2, stop2) {
      return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }
  
    function lerp (start, end, amt){
      return (1 - amt) * start + amt * end
    }

	this.update = function(time) {
    var width = window.innerWidth
    var height = window.innerHeight    
    terrain.material.uniforms.time.value = time;
    terrain.material.uniforms.distortCenter.value = map(0, 0, width, -0.1, 0.1);
    terrain.material.uniforms.roadWidth.value = map(0, 0, height, -0.5, 2.5);
  }
  
}