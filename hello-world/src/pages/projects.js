import React from "react"
import EventEmitter from "EventEmitter";
import Layout from "../components/layout";
import EventManager from "../components/eventManager";
import ThreeContainer from './../components/threeContainer';
import SCENE_CONSTANTS from './../constants/scenes';

let EventBus = new EventEmitter();

export default () => (
  <Layout>
    <EventManager eventBus={EventBus}>
      <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_PROJECTS} eventBus={EventBus} />
    </EventManager>
  </Layout>
)