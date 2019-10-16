import React, {Fragment, useState, useEffect} from "react";
import { Power4, TimelineLite} from 'gsap';
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
        case ("INSTAGRAM"):
            window.open("https://www.instagram.com/the_real_planey_mcplaneface/?hl=en", "_blank", "");
            break;
        case ("LINKEDIN"):
            window.open("https://www.linkedin.com/in/shawn-oakley", "_blank", "");
            break;
        case ("GITHUB"):
            window.open("https://github.com/ShawnOakley", "_blank", "");
            break;
        case ("PROJECTS"):
            window.open("https://github.com/ShawnOakley", "_blank", "");
            break;            
    }
}

const iconCollection = [
    {
        label: "PROJECTS",
        resource: projectAnim
    },
    {
        label: "GITHUB",
        resource: githubAnim
    },
    {
        label: "INSTAGRAM",
        resource: instagramAnim
    },
    {
        label: "LINKEDIN",
        resource: linkedinAnim
    },        
]

const LottieCarousel = (props) => {
    var leon, canvas, ctx;
    var [currentIndex, setCurrentIndex] = useState(-1);
    var [timeline, setTimeline] = useState(null)
    var [leonStateDrawer, setLeonDrawer] = useState(null)
    var [animLock, setAnimLock] = useState(false)

    const sw = 300;
    const sh = 40;
    const pixelRatio = 2;

    const initAnim = (idx) => {
        let tooltip  = document.querySelector('.tooltip');
        canvas = document.createElement('canvas');

        canvas.style.position = 'absolute'
        canvas.style.top = '-28px'
        canvas.style.left = '12%'
        canvas.style.width = '200px';
        tooltip.appendChild(canvas);
        ctx = canvas.getContext("2d");

        canvas.width = sw * pixelRatio;
        canvas.height = sh * pixelRatio;
        canvas.style.width = sw + 'px';
        canvas.style.height = sh + 'px';
        ctx.scale(pixelRatio, pixelRatio);
  
        var newTimeline = new TimelineLite()  
        setTimeline(newTimeline)

        // eslint-disable-next-line
        leon = new LeonSans({
            text: iconCollection[idx].label,
            color: ['red'],
            size: 40,
            weight: 300
            });
        
        setLeonDrawer(leon)
        if (!animLock) {
            // Sets anim lock to debounce anim and avoid writing too many
            newTimeline
                .add(
                    ()=>{
                    setAnimLock(true)      
                    }
                )
                .staggerFromTo(leon.drawing, 1, {value: 0}, {value:1, stagger:0.2, ease: Power4.easeOut, color: 'red'})        
                .add(
                    ()=>{
                    setAnimLock(false)      
                    }
                )   

            requestAnimationFrame(animate);
        }

    }

    const reverseAnim  = () => {
        // Reverses anim writing
        timeline && timeline.staggerFromTo(leonStateDrawer.drawing, 1, {value: 1}, {value:0, stagger:0.2, ease: Power4.easeOut, color: 'red'})  
    }

    const setCurrentIndexCallback = (idx) => {
        if (idx >= 0) {
            setCurrentIndex(idx)
            initAnim(idx)
        } else {
            reverseAnim();
        }
    }

    const animate = (t) => {
        // Animates drawer
        let leonAnimator = leon ? leon : leonStateDrawer;
        requestAnimationFrame(animate);
    
        ctx.clearRect(0, 0, sw, sh);
    
        const x = (sw - leonAnimator.rect.w) / 2;
        const y = (sh - leonAnimator.rect.h) / 2;
        leonAnimator.position(x, y);
    
        leonAnimator.draw(ctx);
    }

    return (
        <Fragment>
            <div className={'circle-container'}>
                <span className={'tooltip'}></span>
                {
                    iconCollection.map(({resource, label}, idx)=>(
                        <div 
                            className={'loader-container'} 
                            onMouseEnter={()=>setCurrentIndexCallback(idx)} 
                            onMouseLeave={()=>setCurrentIndexCallback(-1)} 
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