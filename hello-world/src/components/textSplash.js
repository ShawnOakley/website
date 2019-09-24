import React, { useState , useEffect} from 'react';
import {
    // TweenMax, 
    Power4, TimelineLite} from 'gsap';

export default function TextSplash() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);
  // eslint-disable-next-line
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>{
      init();
        var timeline = new TimelineLite()  
        timeline.staggerFromTo(leon.drawing, 1.6, {value: 0}, {value:1, stagger:0.2, ease: Power4.easeOut})
                .staggerTo(leon.drawing, 1.6, {value: 0, ease:  Power4.easeOut}, 0.2)
                .add(() => { 
                    // Invoke change to smaller left display here
                })

    }, 100)
  });

  let leon, canvas, ctx;

  const sw = 800;
  const sh = 600;
  const pixelRatio = 2;
  
  const init = () => {
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
  
      canvas.width = sw * pixelRatio;
      canvas.height = sh * pixelRatio;
      canvas.style.width = sw + 'px';
      canvas.style.height = sh + 'px';
      ctx.scale(pixelRatio, pixelRatio);
    // eslint-disable-next-line
      leon = new LeonSans({
          text: 'Welcome!',
          color: ['#000000'],
          size: 80,
          weight: 200
      });
  
      requestAnimationFrame(animate);
  }
  
  const animate = (t) => {
      requestAnimationFrame(animate);
  
      ctx.clearRect(0, 0, sw, sh);
  
      const x = (sw - leon.rect.w) / 2;
      const y = (sh - leon.rect.h) / 2;
      leon.position(x, y);
  
      leon.draw(ctx);
  }

  return (
    <div></div>
  );
}