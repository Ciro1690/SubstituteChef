import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import kitchen from '../../assets/kitchen.jpg';
import '../../styles/Home.css';

const Home = () => {
    return (
        <div>
            <div id="background">
                <img className="kitchen" src={kitchen} alt="kitchen"/>
            </div>
            <div id="modal">
                <img src={logo} alt="logo"/>
                <h1>Subsitute Chef</h1>
                <h2>Find jobs, get paid</h2>
                <NavLink exact to="/Search">
                    <button>Search now</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Home;