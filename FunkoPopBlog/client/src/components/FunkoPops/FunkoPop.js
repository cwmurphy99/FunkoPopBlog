import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { addMyFavorite } from "../../modules/FunkoPopManager";
import "./FunkoPop.css";

export default function FunkoPop({ funkoPop }) {
    const history = useHistory();


    const handleFavorite = (event) => {
        event.preventDefault();
        addMyFavorite(funkoPop.id).then(console.log(funkoPop.id)).then(alert("favorite added"));
    };

    return (
        <div className="funkoCard">
            <Card>
                <CardHeader>
                    <strong> {funkoPop.title} </strong>
                </CardHeader>
                <div className="funkoImage">
                    <CardBody>
                        <img src={funkoPop.image} style={{ height: "300px", width: "250px" }}></img>
                    </CardBody>
                </div>
                <Button onClick={() => history.push(`/Products/Details/${funkoPop.id}`)}> Pop! Details </Button>
                <Button onClick={handleFavorite}> Add to my Collection </Button>
            </Card>
        </div>
    )
}