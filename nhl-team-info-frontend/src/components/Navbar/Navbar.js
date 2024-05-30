import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; 

export default function Navbar() {
    const navigate = useNavigate();

    const goToSimPage = () => {
        navigate(`/app/stanley-cup-sim`); 
    };

    const goHome = () => {
        navigate(`/`); 
    };

    return (
        <>
            <nav>
                <ul>
                    <li class="nav" onClick={() => goHome()}>Home</li>
                    <li class="nav" id="stanley" onClick={() => goToSimPage()}>Stanley Cup Sim!!</li>
                    <li class="nav nav-right"><a href="https://www.nhl.com/"><img class="nav" src={"../../../05_NHL_Shield.svg.png"} alt="NHL logo"></img></a></li>
                </ul>
            </nav>
        </>
    )
}