import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import WebFont from 'webfontloader';

const Wrapper = styled("div")`
  width:100%;
  position:absolute;
  height:100%;
`


WebFont.load({
  google: {
    families: ['Josefin Web:300', 'sans-serif']
  }
});

export default ({ children }) => (
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
    {children}
  </Wrapper>
)