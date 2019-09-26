import React, { useEffect, useState } from "react";
import * as lottie from "lottie-web";

const Loader = (props) => {
  let loaderWrapper = null;
  const [player, setPlayer] = useState(null);

  const onHover= ()=>{
    player.play(props.startIndex ? props.startIndex : 0);
  }

  const onHoverLeave= ()=>{
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
    return  () => {
      player && player.destroy();
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
