import React, {Component} from 'react';
import Pin from '../allPins/SinglePin';
import gucciDenim from '../../../assets/gucciDenim.jpeg';
import redMakeupLook from '../../../assets/redMakeupLook.jpeg';
import jewels from '../../../assets/jewels.jpeg';
import oldGlamLooks from '../../../assets/oldGlamLooks.jpeg';
import goldDress from '../../../assets/goldDress.jpeg';
import tropicalFit from '../../../assets/tropicalFit.jpeg';
import versaceShoe from '../../../assets/versaceShoe.jpeg';
import whiteTwoPiece from '../../../assets/whiteTwoPiece.jpeg';


class Pins extends Component{
    render() {
        return( 
        <div className="container-fluid d-flex justify-content center"> 
            <div style={{display:"flex"}} className="row">

                <div className="col-md-3">
                    <Pin imgsrc={gucciDenim} title="Gucci Denim" username="lovelyTelly" />
                </div>

                <div className="col-md-3">
                    <Pin imgsrc={redMakeupLook} title="Intense"/>
                </div>

                <div className="col-md-3">
                    <Pin imgsrc={jewels} title="The finer things" username="Jamilaj" />
                </div>

                <div className="col-md-3">
                    <Pin imgsrc={goldDress} title="Travel" />
                </div>

                <div className="col-md-3">
                    <Pin imgsrc={whiteTwoPiece} title="Princessa" />
                </div>


                <div className="col-md-3">
                    <Pin imgsrc={versaceShoe} title="Versace Versace Versace" />
                </div>

                <div className="col-md-3">
                    <Pin imgsrc={oldGlamLooks} title="Serving glam" username="xoxoDarsu"/>
                </div>


                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={slashedByTia} title="Slashed by Tia" />
                </div> */}



                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={orangeHanifa} title="Skirt by Hanifa" />
                </div> */}

                

                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={whiteTwoPiece} title="Princessa" />
                </div> */}

                <div className="col-md-3 col-sm-6"> 
                    <Pin imgsrc={tropicalFit}/>
                </div>

                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={bigHair} title="Natural" />
                </div> */}

                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={orangeEyes} title="Orange eye look" />
                </div> */}

                {/* <div className="col-md-3 col-sm-6">
                    <Pin imgsrc={versaceShoe} title="Versace Versace Versace" />
                </div> */}

            </div>
        </div>

        )
    }
}

export default Pins;