import React from "react";
import { Link } from "gatsby";
import Header from './../components/header';
import ThreeContainer from './../components/threeContainer';
import Layout from "../components/layout"



// Intro point for gatsby app
export default () => (
    <Layout>
      <Link to="/contact/">Contact</Link> 
      <Header headerText="Hello Gatsby!" />
      <ThreeContainer />
    </Layout>
  )