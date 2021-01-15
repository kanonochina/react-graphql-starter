import React, { Component, useState } from 'react';



// Styling
// import './index.css';
import logo from '../graphics/rglogo.svg'
import '../style/index.scss';
// Components




export default function Index() {
    return (
        <div>
             <div className="pageWrapper">
                <div className="introContainer">
                    <img className="hexContainer" src={logo} width={300} style={{margin:"30px"}} />
                    
                    <div className="loader">
                        <div className="hexContainer">
                            <div className="hex">
                                <div className="hex inner"></div>
                            </div>
                        </div>
                        <div className="triangleContainer">
                            <div className="triangle">
                                <div className="triangleInner"></div>
                            </div>
                        </div>
                        <div className="ballContainer">
                            <div className="balls ball1"></div>
                            <div className="balls ball2"></div>
                            <div className="balls ball3"></div>
                            <div className="balls ball4"></div>
                            <div className="balls ball5"></div>
                            <div className="balls ball6"></div>
                        </div>
                    </div>
                    <h1>React Graphql Starter Template</h1>
                    
                </div>
            </div>
        </div>
    )
}



