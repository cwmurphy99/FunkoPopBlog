import React from "react";
import logo from '../components/Images/FunkoLogo.jpg';

function Hello() {
    return (

        <img src={logo} alt="FunkoPop!"
            span style={{
                position: "absolute",
                left: 500,
                right: 500,
                top: "40%",
                marginTop: "-0.5rem",
            }}></img>


    )
}

export default Hello;

// export default function Hello() {
//     return (
//         <span style={{
//             position: "fixed",
//             left: 0,
//             right: 0,
//             top: "50%",
//             marginTop: "-0.5rem",
//             textAlign: "center",
//         }}>hello</span>
//     );
// }


