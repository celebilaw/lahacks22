import React from 'react'
import "./Request.css"

function Request(props) {

    return (
        <div className="Container">
            <div className="RequestCard">
                <p className="CardTitle">{props.title}</p>
                <p className="CardDesc">{props.desc}</p>
                <div className="StatusContainer">
                    <p className="CardUser"><b>Requester:</b> {props.requester}</p>
                    <p className="CardStatus"><b>Status:</b> {props.status}</p>
                </div>
            </div>
        </div>
    );
}

export default Request;
