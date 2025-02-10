import React from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {
    
    const dt = new Date(props.created);
    const loginStatus = JSON.parse(sessionStorage.getItem("loginStatus"));

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}} className="post-message">
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            loginStatus 
            && loginStatus[0] === true 
            && loginStatus[1].localeCompare(props.poster) === 0 ?
            <>
                <Button variant="danger" onClick={() => props.delete(props.id)}>Delete</Button>
            </>
            :
            <>
            </>
        }
    </Card>
}

export default BadgerMessage;