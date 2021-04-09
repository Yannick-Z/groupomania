import React, { useEffect, useState } from 'react'
import "./Login.css";
import Axios from 'axios';

import {useHistory} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


const [errorMessage, setErrorMessage] = useState("");

Axios.defaults.withCredentials = true;

let history = useHistory();



const login = () => {
    console.log(username);
    Axios.post("http://localhost:3001/user/login",{
        username: username,
        password: password,
    }).then((response) => {

        if (response.data.loggedIn) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", response.data.username);
            history.push("/");
        } else {
            setErrorMessage(response.data.message);

        }
        
    });
};

useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
        if (response.data.loggedIn === true) {
            localStorage.setItem(response.data.user[0].username);
        }
    });
}, []);

return (
    <div className="Login">
        <h1>Login</h1>
        <div className="LoginForm">
            <input type="text" placeholder="Username..."
            onChange= {(event) => {
                setUsername(event.target.value);
            }}
            />
            <input type="password" placeholder="Password..."
            onChange= {(event) => {
                setPassword(event.target.value);
            }}
            />
            <button onClick={login}>Login</button> 
            {errorMessage}               
        </div>
    </div>
)
}

export default Login
