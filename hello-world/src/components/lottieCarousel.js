import React, {useState, useEffect} from "react";
import LottiePlayer from './lottiePlayer';
import "./../scss/circle.scss"

const projectAnim = require("./../lottie/projects.json");
const githubAnim = require("./../lottie/github.json");
const instagramAnim = require("./../lottie/instagram.json");
const linkedinAnim = require("./../lottie/linkedin.json");
const stackoverflowAnim = require("./../lottie/stackoverflow.json");

const navigate = (linkType) => {
    switch (linkType) {
        case ("Instagram"):
            window.open("https://www.instagram.com/the_real_planey_mcplaneface/?hl=en", "_blank", "");
            break;
        case ("Linkedin"):
            window.open("https://www.linkedin.com/in/shawn-oakley", "_blank", "");
            break;
        case ("Github"):
            window.open("https://github.com/ShawnOakley", "_blank", "");
            break;
        case ("Projects"):
            window.open("https://github.com/ShawnOakley", "_blank", "");
            break;            
    }
}

const iconCollection = [
    {
        label: "Projects",
        resource: projectAnim
    },
    {
        label: "Github",
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
                iconCollection.map(({resource, label}, idx)=><div onClick={()=>navigate.apply(null, [label])}><LottiePlayer label={label} animationData={resource}/></div>)
            }
        </div>

    );
  };
  
  export default LottieCarousel;