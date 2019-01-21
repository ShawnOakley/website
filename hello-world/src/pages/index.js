import React from "react";
import { Link } from "gatsby";
import Header from './../components/header';
import ThreeContainer from './../components/threeContainer';
import Layout from "../components/layout"
import SCENE_CONSTANTS from './../constants/scenes';



// Intro point for gatsby app
export default () => (
    <Layout>
      <Link to="/contact/">Contact</Link> 
      <Header headerText="Hello Gatsby!" />
      <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_INTRO}/>
    </Layout>
  )