import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getMyCollection } from "../../modules/FunkoPopManager";
import FunkoPopFavorites from "./FunkoPopFavorites";
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
            <h1>Welcome to Your Favorites!</h1>
            <div className="funkoPopContainer">
                {funkoPops.map(p => <FunkoPopFavorites key={p.id} funkoPop={p} setFunkoPops={setFunkoPops} />)}
            </div>
        </section>
    )
}