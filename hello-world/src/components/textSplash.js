/* eslint-disable */
import React, { useState , useEffect} from 'react';
import {TweenMax, Power4} from 'gsap';
import * as dat from 'dat.gui';

console.log("++++")

// https://github.com/cmiscm/leonsans/blob/master/examples/metaball-pixi.html
// https://github.com/cmiscm/leonsans/blob/master/examples/morphing-pixi.htmlf

export default function TextSplash() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);
  // eslint-disable-next-line
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>{
      init();
      let i, total = leon.drawing.length;
      for (i = 0; i < total; i++) {
          TweenMax.fromTo(leon.drawing[i], 1.6, {
              value: 0
          }, {
              delay: i * 0.05,
              value: 1,
              ease: Power4.easeOut
          });
      }      
    }, 100)
  });

  let container, texture, particleCon;
  let leon, controll, weightControll;
  const particleTotal = 10000;
  let particles = [];
  
  
  function init() {
    generatePixi(0x000000, PIXI);
    texture = PIXI.Texture.from('data/drop-alpha.png');
    particleCon = new PIXI.ParticleContainer(particleTotal, {
        vertices: false,
        scale: true,
        position: true,
        rotation: false,
        uvs: false,
        alpha: false
    });
    stage.addChild(particleCon);
    let p, i;
    for (i = 0; i < particleTotal; i++) {
        p = new PIXI.Sprite(texture);
        p.x = sw / 2;
        p.y = sh / 2;
        p.anchor.set(0.5);
        p.scale.x = p.scale.y = 0;
        particleCon.addChild(p);
        particles.push(p);
    }
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.autoFit = true;
    const fragSource = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'uniform sampler2D uSampler;',
            'uniform float threshold;',
            'uniform float mr;',
            'uniform float mg;',
            'uniform float mb;',
            'void main(void)',
            '{',
            '    vec4 color = texture2D(uSampler, vTextureCoord);',
            '    vec3 mcolor = vec3(mr, mg, mb);',
            '    if (color.a > threshold) {',
            '       gl_FragColor = vec4(mcolor, 1.0);',
            '    } else {',
            '       gl_FragColor = vec4(vec3(0.0), 0.0);',
            '    }',
            '}'
        ].join('\n');
    const uniformsData = {
        threshold: 0.5,
        mr: 255.0/255.0,
        mg: 255.0/255.0,
        mb: 255.0/255.0,
    };
    const thresholdFilter = new PIXI.Filter(null, fragSource, uniformsData);
    stage.filters = [blurFilter, thresholdFilter];
    stage.filterArea = renderer.screen;
    controll = {
        weight: 3,
        color: {},
        outline: true,
        drawing: () => {
            let i;
            for (i = 0; i < particleTotal; i++) {
                TweenMax.killTweensOf(particles[i].scale);
                TweenMax.set(particles[i].scale, {
                    x: 0,
                    y: 0
                });
                TweenMax.to(particles[i].scale, 3, {
                    delay: 0.001 * i,
                    x: particles[i].saveScale,
                    y: particles[i].saveScale,
                    ease: Circ.easeOut
                });
            }
        }
    };
    leon = new LeonSans({
        text: 'TOP\n678',
        size: getSize(400),
        weight: 700,
        pathGap: -1,
        isPath: true,
        tracking: 0
    });
    leon.on('update', (model) => {  
        update();
    });
    
    const gui = new dat.GUI();
    gui.add(leon, 'text');
    const sizeControll = gui.add(leon, 'size', 200, 1000);
    gui.add(leon, 'tracking', -6, 10);
    gui.add(leon, 'leading', -8, 10);
    weightControll = gui.add(controll, 'weight', 1, 9);
    gui.add(controll, 'drawing');
    const colorControll = gui.add(controll, 'color', [ 'white', 'black', 'red'] );
    sizeControll.onChange((value) => {
        sizeWeight();
    });
    weightControll.onChange((value) => {
        update();
    });
    colorControll.onChange((value) => {
        if (value == 'white') {
            renderer.backgroundColor = 0x000000;
            uniformsData.mr = 255.0/255.0;
            uniformsData.mg = 255.0/255.0;
            uniformsData.mb = 255.0/255.0;
        } else if (value == 'black') {
            renderer.backgroundColor = 0xffffff;
            uniformsData.mr = 0.0/255.0;
            uniformsData.mg = 0.0/255.0;
            uniformsData.mb = 0.0/255.0;
        }  else if (value == 'red') {
            renderer.backgroundColor = 0xe4c143;
            uniformsData.mr = 244.0/255.0;
            uniformsData.mg = 46.0/255.0;
            uniformsData.mb = 33.0/255.0;
        } 
    });
    colorControll.setValue('white');
    requestAnimationFrame(animate);
    sizeWeight();
    TweenMax.delayedCall(0.1, () => {
        controll.drawing();
    });            
}

  function sizeWeight() {
    let w;
    if (leon.size > 400) {
        w = (1.5 - 3) / (1000 - 400) * (leon.size - 400) + 3;
    } else {
        w = (3 - 6) / (400 - 200) * (leon.size - 200) + 6;
    }
    weightControll.setValue(w);
}

  function update() {
    const total = leon.paths.length;
    const sw2 = sw / 2;
    const sh2 = sh / 2;
    let i, p, pos, scale; 
    for (i = 0; i < particleTotal; i++) {
        p = particles[i];
        TweenMax.killTweensOf(p.scale);
        if (i < total) {
            pos = leon.paths[i];
            if (pos.type == 'a') {
                scale = controll.weight * 0.025* leon.scale;
            } else {
                scale = controll.weight * 0.01* leon.scale;
            }
            p.saveScale = scale;
            p.x = pos.x;
            p.y = pos.y;
            p.scale.x = p.scale.y = scale;
        } else {
            p.saveScale = 0;
            p.x = -1000;
            p.y = -1000;
            p.scale.x = p.scale.y = 0;                   
        }
    }        
}



  function animate(t) {
    requestAnimationFrame(animate);
    const x = (sw - leon.rect.w) / 2;
    const y = (sh - leon.rect.h) / 2;
    leon.position(x + moveX, y + moveY);
    renderer.render(stage);
}

  return (
    <div></div>
  );
}