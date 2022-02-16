import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { addMyFavorite } from "../../modules/FunkoPopManager";
import "./FunkoPop.css";

export default function FunkoPop({ funkoPop }) {
    const history = useHistory();


    const handleAddFavorite = (event) => {
        event.preventDefault();
        addMyFavorite(funkoPop.id);
    };

    return (
        <div className="funkoCard">
            <Card>
                <CardHeader>
                    <div className="funkoTitle">
                        <strong> {funkoPop.title} </strong>
                    </div>
                </CardHeader>
                <div className="funkoImage">
                    <CardBody>
                        <img className="funkoImageSrc" src={funkoPop.image} ></img>
                    </CardBody>
                </div>
                <div className="funkoPopButton">
                    <Button onClick={() => history.push(`/Products/Details/${funkoPop.id}`)}> Pop! Details </Button>
                    <Button onClick={handleAddFavorite} > Add to Collection </Button>
                </div>
            </Card>
        </div>
    )
}