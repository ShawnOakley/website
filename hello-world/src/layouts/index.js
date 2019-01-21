import React from "react"
import Transition from "./../components/transition";
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

const Wrapper = styled("div")`
  width:100%;
  position:absolute;
  height:100%;
`

// https://divdev.io/animating-gatsby-pt/

// WebFont.load({
//   google: {
//     families: ['Josefin Web:300', 'sans-serif']
//   }
// });

export default ({ children, location }) => (
  <Wrapper>
    <Global
      styles={css`
        html {
            height: 100%;
        }
        body {
            height: 100%;
            margin: 0px;
        }
        .three-container {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            background-color: black;
            z-index: 5;
            canvas: {
                width: 1px;
                height: 1px;
            }
        }
        .header {
            position: relative;
            display: flex;
            z-index: 10;
            color: white;
        }
      `}
    />
      <Transition location={location}>
        {children}
      </Transition>  
  </Wrapper>
)