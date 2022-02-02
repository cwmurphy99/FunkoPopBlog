import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import "./FunkoPop.css";

export default function FunkoPop({ funkoPop }) {
    const history = useHistory();

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
            </Card>
        </div>
    )
}