import React, { useEffect, useState } from 'react'
import "./Login.css";
import Axios from 'axios';

import {useHistory} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


const [errorMessage, setErrorMessage] = useState("");

const [token] = useState("");

let history = useHistory();





const login = () => {
    
    Axios.post("http://localhost:3001/user/login",{
        username: username,
        password: password,
    }).then((response) => {

        if (response.data.loggedIn) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            history.push("/");
        } else {
            setErrorMessage(response.data.message);

        }
        
    });
};

 useEffect(() => {
    Axios.post('http://localhost:3001/user/login',{
      headers: {
          Authorization : "Bearer "+localStorage.getItem(token)
      },
      body:{
          id: localStorage.getItem(token)
      }
    }).then((response)=>{
        if (response.data.loggedIn == true ) {
            setErrorMessage(response.data.user[0].username);
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
