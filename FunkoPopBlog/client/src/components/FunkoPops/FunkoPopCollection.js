import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getMyCollection } from "../../modules/FunkoPopManager";
import FunkoPop from "./FunkoPop";
import "./FunkoPop.css"

export default function FunkoPopCollection() {
    const [funkoPops, setFunkoPops] = useState([])
    const history = useHistory();
    //console.log(funkoPops);
    useEffect(() => {
        getMyCollection().then(setFunkoPops);
    }, [])

    return (
        <section className="funkoPopList">
            <h1>Welcome to the world of Funko!</h1>
            {funkoPops.map(p => <FunkoPop key={p.id} funkoPop={p} />)}
        </section>
    )
}