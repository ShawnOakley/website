import React, { useEffect} from 'react';
import { Power4, TimelineLite} from 'gsap';

export default function TextSplash(props) {

  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>{
      init();
    }, 350)

  });

  let leon, canvas, ctx;

  const sw = window ? window.innerWidth : 800;
  const sh = window ? window.innerHeight : 600;
  const pixelRatio = 2;
  
  const init = () => {
      let textContainer  = document.querySelector('#text-container');
      canvas = document.createElement('canvas');
      canvas.style.zIndex = '1500'
      canvas.style.position = 'absolute'
      textContainer.appendChild(canvas);
      ctx = canvas.getContext("2d");
  
      canvas.width = sw * pixelRatio;
      canvas.height = sh * pixelRatio;
      canvas.style.width = sw + 'px';
      canvas.style.height = sh + 'px';
      ctx.scale(pixelRatio, pixelRatio);

      var timeline = new TimelineLite()  
      
      setTimeout(()=>{
      // eslint-disable-next-line
        leon = new LeonSans({
          text: 'Welcome!',
          color: ['#ffffff'],
          size: 70,
          weight: 200
        });

        timeline.staggerFromTo(leon.drawing, 1, {value: 0}, {value:1, stagger:0.2, ease: Power4.easeOut, color: 'white'})
        .add(
          ()=>{
            props.onComplete(true)      
          }
        )
        .staggerTo(leon.drawing, 1, {delay: 1.5, value: 0, ease:  Power4.easeOut}, 0.2)    
        .add(
          ()=>{
            // Remove canvas so it doesn't block interactions with the ux
            var elem = document.querySelector('#text-container');    
            elem.parentNode.removeChild(elem);
          }
          // Set delay on canvas removal so that close anim plays successfully
          , "+=4"
        )

        requestAnimationFrame(animate);
      }, 250)

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
    <div  id={'text-container'}></div>
  );
}