
import React, { useEffect, useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from "react-router-dom";

export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => {
            // Maybe you need to do something here?
            setLoginStatus(false);
            sessionStorage.setItem("loginStatus", JSON.stringify([false, ""]));
            alert("You have been logged out");
            navigate("/")
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
