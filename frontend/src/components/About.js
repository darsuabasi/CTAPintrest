import React from 'react';
import '../css/About.css'

// import "../Css/PokemonAbout.css";

const AboutMe = () => {
  return(
    <div className="aboutDiv">

        <div className="sub-div">
            <p className="holaDiv"> Welcome to Lifetrest! </p>

            <p className="my-name-is"> Hi, my name is Uduakabasi but you can also call me Darsu. It's a play on my middle and last name. </p> 
  
            <p className="about-me"> This site is a space curated by a black woman for women of color to enjoy things without having to add who they are at the end of every search to find what they're looking for. I'm a fullstack software developer focusing on UX/UI and backend. I also dabble in photography.</p>

            <p> Check me out on <a className="instagram" href="https://www.instagram.com/darsu.chats/">Instagram</a> or <a className="twitter" href="https://twitter.com/darsuCodes">Twitter</a> and if you want to check out what I've been up to in regards to coding... here's my <a className="github" href="https://github.com/darsuabasi">Github</a>.
            </p> 

        </div>

    </div>
  )
}
export default AboutMe;