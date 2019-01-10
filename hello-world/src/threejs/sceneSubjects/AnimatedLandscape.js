import * as THREE from 'three';
import palette from './../../../static/img/pallete5.png';
import fragmentShader from './../shaders/fragment/fragmentShader1.js';
import vertexShader from './../shaders/vertex/vertexShader1.js';

export default function AnimatedLandscape(scene) {
	
    var fogColor = new THREE.Color( 0xd9b3ff )
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 10, 400);

    var ambientLight = new THREE.AmbientLight(0xff66a3, 1);
    scene.add(ambientLight)

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
    terrain.position.y = -5;

    new THREE.TextureLoader().load(palette, function(texture){
      terrain.material.uniforms.pallete.value = texture;
      terrain.material.needsUpdate = true;
    });

    scene.add(terrain)    

    // var sky = new THREE.Sky();
    // sky.scale.setScalar( 450000 );
    // sky.material.uniforms.turbidity.value = 20;
    // sky.material.uniforms.rayleigh.value = 0;
    // sky.material.uniforms.luminance.value = 1;
    // sky.material.uniforms.mieCoefficient.value = 0.01;
    // sky.material.uniforms.mieDirectionalG.value = 0.8;
    
    // scene.add( sky );

    // var sunSphere = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    //   new THREE.MeshBasicMaterial( { color: 0xffffff } )
    // );
    // sunSphere.visible = false;
    // scene.add( sunSphere );
    
    // var theta = Math.PI * ( -0.02 );
    // var phi = 2 * Math.PI * ( -.25 );

    // sunSphere.position.x = 400000 * Math.cos( phi );
    // sunSphere.position.y = 400000 * Math.sin( phi ) * Math.sin( theta );
    // sunSphere.position.z = 400000 * Math.sin( phi ) * Math.cos( theta );
    
    // sky.material.uniforms.sunPosition.value.copy( sunSphere.position );

	this.update = function(time) {
    terrain.material.uniforms.time.value = time;
    terrain.material.uniforms.distortCenter.value = time;
    terrain.material.uniforms.roadWidth.value = time;
  }
  
}