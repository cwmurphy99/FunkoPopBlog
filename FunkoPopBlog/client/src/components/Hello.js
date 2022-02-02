import React from "react";
import logo from '../components/Images/FunkoLogo.jpg';

function Hello() {
    return (

        <img src={logo} alt="FunkoPop!"
            style={{
                position: "absolute",
                left: 500,
                right: 500,
                top: "40%",
                marginTop: "-0.5rem",
            }}></img>


    )
}

export default Hello;