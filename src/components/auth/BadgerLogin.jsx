import { React, useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    // TODO Create the login component.
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleLogin = () => {
        if(username.current.value.length === 0 
            || password.current.value.length === 0) {
            alert("You must provide both a username and password!");
            return;
        } 
        else {
            fetch("https://cs571.org/api/s24/hw6/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId()
                },
                credentials: "include",
                body: JSON.stringify({
                    "username": username.current.value,
                    "password": password.current.value
                })
            })
            .then(res => {
                if(parseInt(res.status) === 401) {
                    alert("Incorrect username or password!");
                    return;
                }

                if(parseInt(res.status) === 200) {
                    alert("The login was successful!")
                    setLoginStatus(true);
                    sessionStorage.setItem("loginStatus", 
                                            JSON.stringify([true, username.current.value]));
                    navigate("/");
                }
            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" ref={username}></Form.Control>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" ref={password}></Form.Control>
        </Form>
        <Button type="Submit" onClick={handleLogin}>Login</Button>
    </>
}
