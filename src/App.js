import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Parallax, Background } from "react-parallax"
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';


const backgroundImage = require("./Components/image/bgimg2.jpg");

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Parallax bgImage={backgroundImage} strength={500}
        bgImageStyle={
          {height: '1000px', maxWidth: '180%', opacity: '.8'}
        }>
        <Header data={this.state.resumeData.main}/>  
        </Parallax>
        <About data={this.state.resumeData.main}/>
        <Parallax bgImage={backgroundImage} strength={500}
        bgImageStyle={
          {height: '3000px', maxWidth: '180%', opacity: '.8'}
        }>
          <Portfolio data={this.state.resumeData.portfolio}/>
        </Parallax>
        <Resume data={this.state.resumeData.resume}/>
        {/* <Testimonials data={this.state.resumeData.testimonials}/> */}
        <Parallax bgImage={backgroundImage} strength={1000}
        bgImageStyle={
          {height: '1000px', maxWidth: '180%', opacity: '.8'}
        }><Contact data={this.state.resumeData.main}/>
        </Parallax>
        <Footer data={this.state.resumeData.footer}/>
      </div>
    );
  }
}

export default App;
