import React, {useState, useEffect} from "react";
import LottiePlayer from './lottiePlayer';
import "./../scss/circle.scss"

const projectAnim = require("./../lottie/projects.json");
const githubAnim = require("./../lottie/github.json");
const instagramAnim = require("./../lottie/instagram.json");
const linkedinAnim = require("./../lottie/linkedin.json");
const stackoverflowAnim = require("./../lottie/stackoverflow.json");

const iconCollection = [
    {
        label: "Projects",
        resource: projectAnim
    },
    {
        label: "Projects",
        resource: githubAnim
    },
    {
        label: "Instagram",
        resource: instagramAnim
    },
    {
        label: "Linkedin",
        resource: linkedinAnim
    },
    // {
    //     label: "StackOverflow",
    //     resource: stackoverflowAnim
    // },           
]

const LottieCarousel = (props) => {
    const [setCurrentIndex, ] = useState(false);
    let collectionLength = iconCollection.length

    return (
        <div className={'circle-container'}>
            {
                iconCollection.map(({resource}, idx)=><div><LottiePlayer animationData={resource}/></div>)
            }
        </div>

    );
  };
  
  export default LottieCarousel;