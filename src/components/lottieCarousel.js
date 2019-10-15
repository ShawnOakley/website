import React, {Fragment, useState, useEffect} from "react";
import LottiePlayer from './lottiePlayer';
import "./../scss/tooltip.scss"
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
    const [currentIndex, setCurrentIndex] = useState(-1);
    let collectionLength = iconCollection.length

    return (
        <Fragment>
            {  currentIndex > -1 && <div className={'tooltip'}>{iconCollection[currentIndex].label}</div>}       
            <div className={'circle-container'}>
                {
                    iconCollection.map(({resource, label}, idx)=>(
                        <div 
                            className={'loader-container'} 
                            onMouseEnter={()=>setCurrentIndex(idx)} 
                            onMouseLeave={()=>setCurrentIndex(-1)} 
                            onClick={()=>navigate.apply(null, [label])}
                        >
                                <LottiePlayer label={label} animationData={resource}/>
                        </div>
                    )
                    )
                }
            </div>
        </Fragment>
    );
  };
  
  export default LottieCarousel;