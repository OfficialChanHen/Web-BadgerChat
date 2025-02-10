import { React, useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleRegister = () => {
        if(username.length === 0 || password.length === 0) {
            alert("You must provide both a username and password!");
            return;
        } else if(password.localeCompare(repeatPassword) != 0) {
            alert("Your passwords do not match!");
            return;
        } else {
            fetch("https://cs571.org/api/s24/hw6/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId()
                },
                credentials: "include",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
            .then(res => {
                if(parseInt(res.status) === 409) {
                    alert("That username has already been taken!");
                    return;
                }

                if(parseInt(res.status) === 200) {
                    alert("The registration was successful!")
                    setLoginStatus(true);
                    sessionStorage.setItem("loginStatus", 
                                            JSON.stringify([true, username]));
                    navigate("/");
                }
            })
        }
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
            <Form.Label htmlFor="repeat-password">Repeat Password</Form.Label>
            <Form.Control id="repeat-password" type="password" onChange={e => setRepeatPassword(e.target.value)}></Form.Control>
        </Form>
        <Button type="Submit" onClick={handleRegister}>Register</Button>
    </>
}
