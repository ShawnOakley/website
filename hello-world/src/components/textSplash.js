import React, { useEffect, useState} from 'react';
import {
    // TweenMax, 
    Power4, TimelineLite} from 'gsap';

export default function TextSplash(props) {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);
  // eslint-disable-next-line
  const [completed, setComplete] = useState(false);


  useEffect(() => {
    // Update the document title using the browser API
    var timeline = new TimelineLite()  
    setTimeout(()=>{
      init();
      let background  = document.querySelector('#background');

      timeline.to(background,  0.8, { 
        top:'80px', 
        left: '80px',
        borderRadius: '25%', 
        width: '200px',
        height: '100px', 
        padding: '1px',         
        ease: Power4.easeOut 
      }).add(()=>{
        if (!completed) {
          let textContainer = document.querySelector('#background');
          let firstNameSpan =  document.createElement('span');
          firstNameSpan.innerHTML = "Shawn";
          firstNameSpan.style.position = 'absolute';
          firstNameSpan.style.top = '20px';
          firstNameSpan.style.left = '40px';
          firstNameSpan.style.fontSize = '25px'
          let lastNameSpan =  document.createElement('span');
          lastNameSpan.innerHTML = "Oakley";
          lastNameSpan.style.position = 'absolute';
          lastNameSpan.style.bottom = '20px';
          lastNameSpan.style.right = '40px';
          lastNameSpan.style.fontSize = '25px'
          textContainer.appendChild(firstNameSpan);
          textContainer.appendChild(lastNameSpan);
        }        
        setComplete(true)
        props.onComplete(true)
      })              

      timeline.to(background,  1.2, { 
        opacity: 0.6, 
        ease: Power4.easeOut
      }).add(()=>{
        props.onComplete(true)

      })
      // timeline.to(background,  1.4, { 
      //   zIndex: 101,
      //   ease: Power4.easeOut 
      // }, 4)
      timeline.staggerFromTo(leon.drawing, 1, {value: 0}, {value:1, stagger:0.2, ease: Power4.easeOut, color: 'white'})
      .staggerTo(leon.drawing, 1, {value: 0, ease:  Power4.easeOut}, 0.2)

    }, 100)

  });

  let leon, canvas, ctx;

  const sw = 800;
  const sh = 600;
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
    // eslint-disable-next-line
      leon = new LeonSans({
          text: 'Welcome!',
          color: ['#ffffff'],
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
    <div  id={'text-container'}>
      <div  
        id={'background'}
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          opacity: '1',
          color: 'white',
          width: '100%',
          display:'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '100%',
          zIndex:'800',
          fontFamily: "Josefin Sans, sans-serif",
          mozBoxShadow: "inset 0 0 10px #000000",
          webkitBoxShadow: "inset 0 0 10px #000000",
          boxShadow: "inset 0 0 10px #000000",
          fontFamily: "Raleway, sans-serif"    
        }}
    >{" "}</div>
      </div>
  );
}