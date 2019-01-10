import React from "react";
import { Link } from "gatsby";
import Header from './../components/header';
import ThreeContainer from './../components/threeContainer';
// Intro point for gatsby app
export default () => (
    <div style={{ color: `purple` }}>
      <Link to="/contact/">Contact</Link> 
      <Header headerText="Hello Gatsby!" />
      <ThreeContainer />
    </div>
  )