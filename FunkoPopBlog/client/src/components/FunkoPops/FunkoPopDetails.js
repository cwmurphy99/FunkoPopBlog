import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardHeader, Button, CardFooter, CardBody } from "reactstrap";
import { getFunkoPopsById } from "../../modules/FunkoPopManager";
import { addMyFavorite } from "../../modules/FunkoPopManager";
import "./FunkoPop.css";

export const FunkoPopDetails = () => {
    const [funko, setFunko] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getFunkoPopsById(id).then(setFunko)
    }, [id])

    if (!funko) {
        return null
    }

    const handleAddFavorite = (event) => {
        event.preventDefault();
        addMyFavorite(funko.id);
    };

    const handleGoBack = (e) => {
        e.preventDefault();
        history.goBack()
    }


    return (
        <div className="funkoPopList">
            <h2>FunkoPop! Details</h2>
            <div className="funkoPopContainer">
                <div className="funkoCard">
                    <Card>
                        <CardHeader>
                            <strong>{funko.title}</strong>
                        </CardHeader>
                        <CardBody>
                            <img className="funkoImageSrc" src={funko.image} ></img>
                        </CardBody>
                        {funko.series ?
                            <CardFooter>
                                <strong>Series:</strong>
                                {funko.series.map(p => <p key={p.id}>{p.name} </p>)}
                                <div className="funkoPopButton">
                                    <Button onClick={handleGoBack} > Go Back </Button>
                                    <Button onClick={handleAddFavorite}> Add to Collection </Button>
                                </div>
                            </CardFooter>
                            : null}
                    </Card>
                </div>
            </div>
        </div>
    )
}