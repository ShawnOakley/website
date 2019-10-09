import React, { useEffect, useState } from "react";
import * as lottie from "lottie-web";
import Tooltip from 'tooltip.js'
import "./../scss/tooltip.scss"

const Loader = (props) => {
  let loaderWrapper = null;
  var tooltip = null
  const [player, setPlayer] = useState(null);


  
  const onHover= ()=>{
    // tooltip.show()
    player.play(props.startIndex ? props.startIndex : 0);
  }

  const onHoverLeave= ()=>{
    // tooltip.hide()
    player.goToAndStop(0);
  }


  useEffect(() => {
    let animData = {
      wrapper: loaderWrapper,
      animType: "svg",
      loop: typeof props.loop != "undefined" ? props.loop : true,
      prerender: true,
      autoplay: typeof props.autoplay != "undefined" ? props.autoplay : true,
      animationData: props.animationData
    };
    // @ts-ignore
    let anim = lottie.loadAnimation(animData);
    anim.setSpeed(props.speed || 1);
    anim.stop();
    setPlayer(anim)
    // anim.goToAndPlay(props.startIndex ? props.startIndex : 0);
    tooltip = new Tooltip(loaderWrapper, {
      title: props.label,
      trigger: "hover",
    });
  
    return  () => {
      player && player.destroy();
      tooltip && tooltip.dispose();
    };
  }, [props.animationData]);

  return (
    <div 
      style={{width: '100px' }} 
      onMouseOver={onHover} 
      onMouseLeave={onHoverLeave}
      ref={image => (loaderWrapper = image)} 
      id="loader" 
    />
  );
};

export default Loader;
