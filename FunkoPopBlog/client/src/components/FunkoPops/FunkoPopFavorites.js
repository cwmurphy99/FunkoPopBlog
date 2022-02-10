import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { addMyFavorite } from "../../modules/FunkoPopManager";
import { removeMyFavorite } from "../../modules/FunkoPopManager";
import { getMyCollection } from "../../modules/FunkoPopManager";
import "./FunkoPop.css";

export default function FunkoPopFavorites({ funkoPop, setFunkoPops }) {
    const history = useHistory();




    const handleRemoveFavorite = (event) => {
        event.preventDefault();
        removeMyFavorite(funkoPop.id).then(() => {

            getMyCollection().then((pops) => {
                setFunkoPops(pops)

            });
        });
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
                <div className="funkoPopButton">
                    <Button onClick={() => history.push(`/Products/Details/${funkoPop.id}`)}> Pop! Details </Button>
                    <Button onClick={handleRemoveFavorite}> Remove from Collection </Button>
                </div>
            </Card>
        </div>
    )
}