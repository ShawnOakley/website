import React from "react";
import { Link } from "gatsby";
import Header from './../components/header';
import ThreeContainer from './../components/threeContainer';
import SCENE_CONSTANTS from './../constants/scenes';

// https://divdev.io/animating-gatsby-pt/

// Intro point for gatsby app
export default () => (
    <div>
      <Header />
      <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_INTRO}/>
    </div>
  )