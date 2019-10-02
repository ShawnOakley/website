import React, { useState } from "react";
// import { Link } from "gatsby";
import EventEmitter from "EventEmitter";
import EventManager from "../components/eventManager";
import TextSplash from './../components/textSplash';
import ThreeContainer from './../components/threeContainer';
import SCENE_CONSTANTS from './../constants/scenes';
import LottieCarousel from './../components/lottieCarousel';
import SEO from './../components/SEO';


// https://divdev.io/animating-gatsby-pt/

let EventBus = new EventEmitter();

// Intro point for gatsby app
export default () => {
  const [displayScene, setDisplayScene] = useState(false);

  return (
    <EventManager eventBus={EventBus}>
      <SEO />
      <TextSplash onComplete={setDisplayScene} />
      {displayScene && <div><LottieCarousel  /></div>}
      {displayScene && (
        <div>
          <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_INTRO} eventBus={EventBus}/>
        </div>
      )}
    </EventManager>
  )

}