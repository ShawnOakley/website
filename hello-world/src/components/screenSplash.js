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
      let background  = document.querySelector('#background');
       
    timeline.to(background, 3, {
        backgroundImage: "linear-gradient(red, yellow)",

    })
      timeline.to(background,  2, { 
        opacity: 0, 
        zIndex: -200,
        ease: Power4.easeOut
      })
    

    }, 350)

  });

  return (
    <div  id={'text-container'}>
      <div  
        id={'background'}
        style={{
          position: 'absolute',
          backgroundImage: "linear-gradient(yellow, red)",
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