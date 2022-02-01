import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FunkoPop from "./FunkoPop";
import { getFunkoPops } from "../../modules/FunkoPopManager";
import "./FunkoPop.css"

export default function FunkoPopList() {
    const [funkoPops, setFunkoPops] = useState([])
    const history = useHistory();
    //console.log(funkoPops);
    useEffect(() => {
        getFunkoPops().then(setFunkoPops);
    }, [])

    return (
        <section className="funkoPopList">
            <h1>Welcome to the world of Funko!</h1>
            {funkoPops.map(p => <FunkoPop funkoPop={p} />)}
        </section>
    )
}