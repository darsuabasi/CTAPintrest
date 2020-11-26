import React, { useEffect} from 'react';
// import LandingPagePins from './LandingPagePins'
import '../../css/Landing.css'
import './styles/styles.css'

// poc
import poc1 from '../../landingPageAssets/blackgirlfashion/poc1.jpg'
import poc2 from '../../landingPageAssets/blackgirlfashion/poc2.jpg'
import poc3 from '../../landingPageAssets/blackgirlfashion/poc3.jpg'
import poc4 from '../../landingPageAssets/blackgirlfashion/poc4.jpg'
import poc5 from '../../landingPageAssets/blackgirlfashion/poc5.jpg'
import poc6 from '../../landingPageAssets/blackgirlfashion/poc6.jpg'
import poc7 from '../../landingPageAssets/blackgirlfashion/poc7.jpg'
import poc8 from '../../landingPageAssets/blackgirlfashion/poc8.jpg'
import poc9 from '../../landingPageAssets/blackgirlfashion/poc9.jpg'
import poc10 from '../../landingPageAssets/blackgirlfashion/poc10.jpg'
import poc11 from '../../landingPageAssets/blackgirlfashion/poc11.jpg'
import poc12 from '../../landingPageAssets/blackgirlfashion/poc12.jpg'
import poc13 from '../../landingPageAssets/blackgirlfashion/poc13.jpg'
import poc14 from '../../landingPageAssets/blackgirlfashion/poc14.jpg'
import poc15 from '../../landingPageAssets/blackgirlfashion/poc15.jpg'
import poc16 from '../../landingPageAssets/blackgirlfashion/poc16.jpg'
import poc17 from '../../landingPageAssets/blackgirlfashion/poc17.jpg'
import poc18 from '../../landingPageAssets/blackgirlfashion/poc18.jpg'
import poc19 from '../../landingPageAssets/blackgirlfashion/poc19.jpg'
import poc20 from '../../landingPageAssets/blackgirlfashion/poc20.jpg'
import poc21 from '../../landingPageAssets/blackgirlfashion/poc21.jpg'
import poc22 from '../../landingPageAssets/blackgirlfashion/poc22.jpg'
import poc23 from '../../landingPageAssets/blackgirlfashion/poc23.jpg'
import poc24 from '../../landingPageAssets/blackgirlfashion/poc24.jpg'
import poc25 from '../../landingPageAssets/blackgirlfashion/poc25.jpg'
import poc26 from '../../landingPageAssets/blackgirlfashion/poc26.jpg'
import poc27 from '../../landingPageAssets/blackgirlfashion/poc27.jpg'
import poc28 from '../../landingPageAssets/blackgirlfashion/poc28.jpg'
import poc29 from '../../landingPageAssets/blackgirlfashion/poc29.jpg'
import poc30 from '../../landingPageAssets/blackgirlfashion/poc30.jpg'
import poc31 from '../../landingPageAssets/blackgirlfashion/poc31.jpg'
import poc32 from '../../landingPageAssets/blackgirlfashion/poc32.jpg'
import poc33 from '../../landingPageAssets/blackgirlfashion/poc33.jpg'
import poc34 from '../../landingPageAssets/blackgirlfashion/poc34.jpg'
import poc35 from '../../landingPageAssets/blackgirlfashion/poc35.jpg'

// home
import home1 from '../../landingPageAssets/home/home1.jpg'
import home2 from '../../landingPageAssets/home/home2.jpg'
import home3 from '../../landingPageAssets/home/home3.jpg'
import home4 from '../../landingPageAssets/home/home4.jpg'
import home5 from '../../landingPageAssets/home/home5.jpg'
import home6 from '../../landingPageAssets/home/home6.jpg'
import home7 from '../../landingPageAssets/home/home7.jpg'
import home8 from '../../landingPageAssets/home/home8.jpg'
import home9 from '../../landingPageAssets/home/home9.jpg'
import home10 from '../../landingPageAssets/home/home10.jpg'
import home11 from '../../landingPageAssets/home/home11.jpg'
import home12 from '../../landingPageAssets/home/home12.jpg'
import home13 from '../../landingPageAssets/home/home13.jpg'
import home14 from '../../landingPageAssets/home/home14.jpg'
import home15 from '../../landingPageAssets/home/home15.jpg'
import home16 from '../../landingPageAssets/home/home16.jpg'
import home17 from '../../landingPageAssets/home/home17.jpg'
import home18 from '../../landingPageAssets/home/home18.jpg'
import home19 from '../../landingPageAssets/home/home19.jpg'
import home20 from '../../landingPageAssets/home/home20.jpg'
import home21 from '../../landingPageAssets/home/home21.jpg'
import home22 from '../../landingPageAssets/home/home22.jpg'
import home23 from '../../landingPageAssets/home/home23.jpg'
import home24 from '../../landingPageAssets/home/home24.jpg'
import home25 from '../../landingPageAssets/home/home25.jpg'
import home26 from '../../landingPageAssets/home/home26.jpg'
import home27 from '../../landingPageAssets/home/home27.jpg'
import home28 from '../../landingPageAssets/home/home28.jpg'
import home29 from '../../landingPageAssets/home/home29.jpg'
import home30 from '../../landingPageAssets/home/home30.jpg'
import home31 from '../../landingPageAssets/home/home31.jpg'
import home32 from '../../landingPageAssets/home/home32.jpg'
import home33 from '../../landingPageAssets/home/home33.jpg'
import home34 from '../../landingPageAssets/home/home34.jpg'
import home35 from '../../landingPageAssets/home/home35.jpg'


// green

import green1 from '../../landingPageAssets/green/green1.jpg'
import green2 from '../../landingPageAssets/green/green2.jpg'
import green3 from '../../landingPageAssets/green/green3.jpg'
import green4 from '../../landingPageAssets/green/green4.jpg'
import green5 from '../../landingPageAssets/green/green5.jpg'
import green6 from '../../landingPageAssets/green/green6.jpg'
import green7 from '../../landingPageAssets/green/green7.jpg'
import green8 from '../../landingPageAssets/green/green8.jpg'
import green9 from '../../landingPageAssets/green/green9.jpg'
import green10 from '../../landingPageAssets/green/green10.jpg'
import green11 from '../../landingPageAssets/green/green11.jpg'
import green12 from '../../landingPageAssets/green/green12.jpg'
import green13 from '../../landingPageAssets/green/green13.jpg'
import green14 from '../../landingPageAssets/green/green14.jpg'
import green15 from '../../landingPageAssets/green/green15.jpg'
import green16 from '../../landingPageAssets/green/green16.jpg'
import green17 from '../../landingPageAssets/green/green17.jpg'
import green18 from '../../landingPageAssets/green/green18.jpg'
import green19 from '../../landingPageAssets/green/green19.jpg'
import green20 from '../../landingPageAssets/green/green20.jpg'
import green21 from '../../landingPageAssets/green/green21.jpg'
import green22 from '../../landingPageAssets/green/green22.jpg'
import green23 from '../../landingPageAssets/green/green23.jpg'
import green24 from '../../landingPageAssets/green/green24.jpg'
import green25 from '../../landingPageAssets/green/green25.jpg'
import green26 from '../../landingPageAssets/green/green26.jpg'
import green27 from '../../landingPageAssets/green/green27.jpg'
import green28 from '../../landingPageAssets/green/green28.jpg'
import green29 from '../../landingPageAssets/green/green29.jpg'
import green30 from '../../landingPageAssets/green/green30.jpg'
import green31 from '../../landingPageAssets/green/green31.jpg'
import green32 from '../../landingPageAssets/green/green32.jpg'
import green33 from '../../landingPageAssets/green/green33.jpg'
import green34 from '../../landingPageAssets/green/green34.jpg'
import green35 from '../../landingPageAssets/green/green35.jpg'


// nails
import nails1 from '../../landingPageAssets/nails/nails1.jpg'
import nails2 from '../../landingPageAssets/nails/nails2.jpg'
import nails3 from '../../landingPageAssets/nails/nails3.jpg'
import nails4 from '../../landingPageAssets/nails/nails4.jpg'
import nails5 from '../../landingPageAssets/nails/nails5.jpg'
import nails6 from '../../landingPageAssets/nails/nails6.jpg'
import nails7 from '../../landingPageAssets/nails/nails7.jpg'
import nails8 from '../../landingPageAssets/nails/nails8.jpg'
import nails9 from '../../landingPageAssets/nails/nails9.jpg'
import nails10 from '../../landingPageAssets/nails/nails10.jpg'
import nails11 from '../../landingPageAssets/nails/nails11.jpg'
import nails12 from '../../landingPageAssets/nails/nails12.jpg'
import nails13 from '../../landingPageAssets/nails/nails13.jpg'
import nails14 from '../../landingPageAssets/nails/nails14.jpg'
import nails15 from '../../landingPageAssets/nails/nails15.jpg'
import nails16 from '../../landingPageAssets/nails/nails16.jpg'
import nails17 from '../../landingPageAssets/nails/nails17.jpg'
import nails18 from '../../landingPageAssets/nails/nails18.jpg'
import nails19 from '../../landingPageAssets/nails/nails19.jpg'



import nails20 from '../../landingPageAssets/nails/nails20.jpg'
import nails21 from '../../landingPageAssets/nails/nails21.jpg'
import nails22 from '../../landingPageAssets/nails/nails22.jpg'
import nails23 from '../../landingPageAssets/nails/nails23.jpg'
import nails24 from '../../landingPageAssets/nails/nails24.jpg'
import nails25 from '../../landingPageAssets/nails/nails25.jpg'
import nails26 from '../../landingPageAssets/nails/nails26.jpg'
import nails27 from '../../landingPageAssets/nails/nails27.jpg'
import nails28 from '../../landingPageAssets/nails/nails28.jpg'
import nails29 from '../../landingPageAssets/nails/nails29.jpg'

import nails30 from '../../landingPageAssets/nails/nails30.jpg'
import nails31 from '../../landingPageAssets/nails/nails31.jpg'
import nails32 from '../../landingPageAssets/nails/nails32.jpg'
import nails33 from '../../landingPageAssets/nails/nails33.jpg'
import nails34 from '../../landingPageAssets/nails/nails34.jpg'
import nails35 from '../../landingPageAssets/nails/nails35.jpg'


let grids;
let headings;

function enterScreen(index) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')
  
    grid.classList.add('active')
  
    gridColumns.forEach(element => {
      element.classList.remove('animate-before', 'animate-after')
    })
  
    heading.classList.remove('animate-before', 'animate-after')
  }
  
  function exitScreen(index, exitDelay) {
    const grid = grids[index]
    const heading = headings[index]
    const gridColumns = grid.querySelectorAll('.column')
  
    gridColumns.forEach(element => {
      element.classList.add('animate-after')
    })
  
    heading.classList.add('animate-after')
  
    setTimeout(() => {
      grid.classList.remove('active')
    }, exitDelay)
  }
  
  function setupAnimationCycle({ timePerScreen, exitDelay }) {
    const cycleTime = timePerScreen + exitDelay
    let nextIndex = 0
  
    function nextCycle() {
      const currentIndex = nextIndex
  
      enterScreen(currentIndex)
  
      setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)
  
      nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1
    }
  
    nextCycle()
  
    setInterval(nextCycle, cycleTime)
  }

const Landing = () => { 

    
    useEffect(() => {
        grids = document.querySelectorAll('.grid');
        headings = document.querySelectorAll('.heading .wrapper .text')   


        setupAnimationCycle({
            timePerScreen: 2500, // ms
            exitDelay: 200 * 9 // ms
          })
    
      }, []);

    return(
        <div> 
            
            {/* <div className="all-pins-div">
                <LandingPagePins/>
            </div> */}

            <div class="heading">
                <span class="text">Be inspired by</span>

                <div class="wrapper">
                    <div class="offset">
                        <h2 class="text animate-before poc">women of colour</h2>
                    </div>

                    <div class="offset">
                        <h2 class="text animate-before home">home decor</h2>
                    </div>

                    <div class="offset">
                        <h2 class="text animate-before green">all things green</h2>
                    </div>

                    <div class="offset">
                        <h2 class="text animate-before nails"> nail art </h2>
                    </div>
                </div>
            </div>


            <div class="grid-container">
                {/* bgm */}
                <div class="grid">
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc15}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc13}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc12}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc10}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc11}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc35}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc34}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc33}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc32}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc14}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc5}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc9}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc16}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc18}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc17}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc2}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc8}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc30}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc28}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc27}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc31}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc7}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc26}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc25}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc24}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc29}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc6}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc21}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc4}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc3}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={poc19}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc1}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc20}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc22}/></div>
                        <div class="item"> <img className="landingImgStyles" src={poc23}/></div>
                    </div>
                </div>


                {/* home decor */}
                <div class="grid">
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home1}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home8}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home15}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home22}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home29}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home2}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home9}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home16}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home23}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home30}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home3}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home10}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home17}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home24}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home31}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home4}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home11}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home18}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home25}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home32}/></div>   
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home5}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home12}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home19}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home26}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home33}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home6}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home13}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home20}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home27}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home34}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={home7}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home14}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home21}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home28}/></div>
                        <div class="item"> <img className="landingImgStyles" src={home35}/></div>
                    </div>
                </div>


                {/* all things green */}
                <div class="grid">
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green34}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green27}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green20}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green13}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green6}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green35}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green16}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green21}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green14}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green7}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green33}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green26}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green19}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green12}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green5}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green4}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green32}/></div> 
                        <div class="item"> <img className="landingImgStyles" src={green25}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green18}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green11}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green31}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green24}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green17}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green10}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green3}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green28}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green2}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green9}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green23}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green30}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={green1}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green8}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green15}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green22}/></div>
                        <div class="item"> <img className="landingImgStyles" src={green29}/></div>
                    </div>
                </div>

                {/* nails */}
                <div class="grid">
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails35}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails2}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails8}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails15}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails20}/></div>
                        
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails13}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails9}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails17}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails21}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails19}/></div>
                    </div>
                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails11}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails33}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails10}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails5}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails18}/></div>
                    </div>

                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails22}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails28}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails1}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails23}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails27}/></div>
                    </div>

                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails31}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails7}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails14}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails3}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails26}/></div>
                    </div>

                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails25}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails16}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails12}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails32}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails4}/></div>
                    </div>

                    <div class="column animate-before">
                        <div class="item"> <img className="landingImgStyles" src={nails34}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails30}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails24}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails6}/></div>
                        <div class="item"> <img className="landingImgStyles" src={nails29}/></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing;