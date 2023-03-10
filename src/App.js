import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  HashRouter,
  useRoutes,
} from "react-router-dom";
  
// import CampusMaps component
import CampusMap from "./projects/CampusMap";

import Header from './components/Header';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import resumeData from './resumeData';
import SideNav from './components/SideNav';
const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home/> },
    { path: "/CampusMap", element: <CampusMap resumeData={resumeData} /> },    
  ]);
  return routes;
};
const AppWrapper = () => {
  return (
    <CampusMap resumeData={resumeData}/>
  );
};

function Home() {
  return (
    <div className="App">
      <SideNav resumeData={resumeData}/>
      <Header resumeData={resumeData}/>
      <About resumeData={resumeData}/>
      <Resume resumeData={resumeData}/>
      <Portfolio resumeData={resumeData}/>
      {/* <ContactUs resumeData={resumeData}/> */}
      <Footer resumeData={resumeData}/>
    </div>
  );}
export default AppWrapper;