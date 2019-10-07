// Intro overlay goes here
import React, { useEffect, useState} from 'react';
import {
    // TweenMax, 
    Power4, TimelineLite} from 'gsap';

export default function ScreenSplash(props) {
    var timeline = new TimelineLite()  

  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>{
      init();
      // TO DO -- Move these to transition splash component
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
      timeline.to(background,  1.4, { 
        zIndex: 101,
        ease: Power4.easeOut 
      }, 4)
    

    }, 350)

  });

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
          fontFamily: "Raleway, sans-serif",
          content: " "
        }}
        />
    </div>
  );
}