import React, { useState } from "react";
// import { Link } from "gatsby";
import EventEmitter from "EventEmitter";
import EventManager from "../components/eventManager";
// import Header from './../components/header';
import TextSplash from './../components/textSplash';
import ThreeContainer from './../components/threeContainer';
import SCENE_CONSTANTS from './../constants/scenes';

// https://divdev.io/animating-gatsby-pt/

let EventBus = new EventEmitter();

// Intro point for gatsby app
export default () => {
  const [displayScene, setDisplayScene] = useState(false);

  return (
    <EventManager eventBus={EventBus}>
      <TextSplash onComplete={setDisplayScene} />
      {/* <Header /> */}
      {displayScene && (<div>
        <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_INTRO} eventBus={EventBus}/>
      </div>)}
    </EventManager>
  )

}