import React from "react"
import ReactTooltip from 'react-tooltip'

// Icons for links
import { Icon } from 'react-icons-kit'
import {linkedin} from 'react-icons-kit/icomoon/linkedin'
import {instagram} from 'react-icons-kit/icomoon/instagram'
import {blog} from 'react-icons-kit/icomoon/blog'
import {stackoverflow} from 'react-icons-kit/icomoon/stackoverflow'
import {terminal} from 'react-icons-kit/icomoon/terminal'
import {mail2} from 'react-icons-kit/icomoon/mail2'

// https://www.linkedin.com/in/zzz12345/
// https://medium.com/me/publications
// https://stackoverflow.com/users/2152944/shawn
// https://www.instagram.com/the_real_planey_mcplaneface/?hl=en

export default class Header extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            hoverState:{}
        }
    }

    turnOnHoverState(hoverKey) {
        const {hoverState} = this.state;
        this.setState({'hoverState': Object.assign(hoverState, {[hoverKey]: true})});
    }

    turnOffHoverState(hoverKey) {
        const {hoverState} = this.state;
        this.setState({'hoverState': Object.assign(hoverState, {[hoverKey]: false})});
    }

    render() {
        const {hoverState} = this.state;
        return (
            <div 
            className={'header'}
            style={{
                backgroundColor: 'rgb(0,0,0,0.2)',
                color: 'white',
                width: '120px',
                top: '40px',
                left: '80px',
                display:'block',
                padding: '4px',
                fontFamily: "Josefin Sans, sans-serif"
            }}
        >
        <ReactTooltip place='bottom'/>

        <div
            style={{
                color: 'white',
            }}    
        >Shawn Oakley</div>
        <div style={{display:'flex'}}>
        <div
                style={!hoverState['terminal'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}
                onMouseEnter={()=>this.turnOnHoverState('terminal')}          
                onMouseLeave={()=>this.turnOffHoverState('terminal')}
                data-tip='Personal Projects'          
        ><Icon icon={terminal} /></div>
            <div
                style={!hoverState['linkedin'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}          
                onMouseEnter={()=>this.turnOnHoverState('linkedin')}          
                onMouseLeave={()=>this.turnOffHoverState('linkedin')} 
                data-tip='LinkedIn Profile'                   
            ><Icon icon={linkedin} /></div>
            <div
                style={!hoverState['blog'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}          
                onMouseEnter={()=>this.turnOnHoverState('blog')}   
                onMouseLeave={()=>this.turnOffHoverState('blog')} 
                data-tip='Personal Blog/Writing'                            
            ><Icon icon={blog} /></div>   
            <div
                style={!hoverState['stackoverflow'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}          
                onMouseEnter={()=>this.turnOnHoverState('stackoverflow')} 
                onMouseLeave={()=>this.turnOffHoverState('stackoverflow')}
                data-tip='Stack Overflow Profile'                                      
            ><Icon icon={stackoverflow} /></div>  
            <div
                style={!hoverState['instagram'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}          
                onMouseEnter={()=>this.turnOnHoverState('instagram')} 
                onMouseLeave={()=>this.turnOffHoverState('instagram')}  
                data-tip='Instagram Account'                                              
            ><Icon icon={instagram} /></div>   
            {/* <div
                style={!hoverState['mail2'] ? {
                    marginRight: '4px',
                    cursor: 'pointer'
                } : {
                    marginRight: '4px',
                    cursor: 'pointer',
                    color: 'black'                
                }}
                onMouseEnter={()=>this.turnOnHoverState('mail2')}   
                onMouseLeave={()=>this.turnOffHoverState('mail2')}  
                data-tip='Contact Me'                                                      
            ><Icon icon={mail2} /></div>                               */}
        </div>

        </div>
        );
  }
}
