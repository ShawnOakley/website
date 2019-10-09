import React from "react"
import Header from './../components/header';
import EventEmitter from "EventEmitter";
import EventManager from "../components/eventManager";
import ThreeContainer from './../components/threeContainer';
import SCENE_CONSTANTS from './../constants/scenes';

let EventBus = new EventEmitter();

export default () => (
    <EventManager eventBus={EventBus}>
      <Header />
      <ThreeContainer sceneName={SCENE_CONSTANTS.SCENE_PROJECTS} eventBus={EventBus} />
    </EventManager>
)