import React, {Component} from 'react';
import Pin from '../pins/allPins/SinglePin';
import gucciDenim from '../../assets/gucciDenim.jpeg';
import redMakeupLook from '../../assets/redMakeupLook.jpeg';
import jewels from '../../assets/jewels.jpeg';
import oldGlamLooks from '../../assets/oldGlamLooks.jpeg';
import goldDress from '../../assets/goldDress.jpeg';
import tropicalFit from '../../assets/tropicalFit.jpeg';
import versaceShoe from '../../assets/versaceShoe.jpeg';
import whiteTwoPiece from '../../assets/whiteTwoPiece.jpeg';


const LandingPagePins = () => {
    // render() {
        return( 
        // <div className="container-fluid d-flex justify-content center"> 
        //     <div style={{display:"flex"}} className="row">

        //         <div className="col-md-3">
        //             <Pin imgsrc={gucciDenim} title="Gucci Denim"/>
        //         </div>

        //         <div className="col-md-3">
        //             <Pin imgsrc={redMakeupLook} title="Intense"/>
        //         </div>

        //         <div className="col-md-3">
        //             <Pin imgsrc={jewels} title="The finer things"/>
        //         </div>

        //         <div className="col-md-3">
        //             <Pin imgsrc={goldDress} title="Travel" />
        //         </div>

        //         <div className="col-md-3">
        //             <Pin imgsrc={whiteTwoPiece} title="Princessa" />
        //         </div>


        //         <div className="col-md-3">
        //             <Pin imgsrc={versaceShoe} title="Versace Versace Versace" />
        //         </div>

        //         <div className="col-md-3">
        //             <Pin imgsrc={oldGlamLooks} title="Serving glam"/>
        //         </div>

                

        //         <div className="col-md-3 col-sm-6"> 
        //             <Pin imgsrc={tropicalFit}/>
        //         </div>


            
        //     </div>
        // </div>


    <div class="card-deck">
        <div class="card-body">
            <Pin imgsrc={gucciDenim} title="Gucci Denim"/>  
        </div>

        <div class="card-body">
            <Pin imgsrc={redMakeupLook} title="Intense"/>
        </div>

        <div class="card-body">
            <Pin imgsrc={jewels} title="The finer things"/>
        </div>

        <div class="card-body">
            <Pin imgsrc={goldDress} title="Travel" />
        </div>
</div>










        )
    // }
}

export default LandingPagePins;