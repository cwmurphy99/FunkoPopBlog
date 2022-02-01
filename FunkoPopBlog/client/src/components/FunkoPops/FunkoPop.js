import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import "./FunkoPop.css";

export default function FunkoPop({ funkoPop }) {
    const history = useHistory();

    console.log(funkoPop.image);

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
            </Card>
            <Button onClick={() => history.push('/funkoPop/details/${funkoPop.id}')}> Pop! Details </Button>
        </div>
    )
}