import React, { useState } from 'react';
import "./Register.css";

import Axios from 'axios'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const register = () => {
        console.log(username);
        Axios.post("http://localhost:3001/user/register", { // Envoie les informations a la base de données
            username: username,
            password: password,

        }).then((response) => {
            console.log(response);
            alert('Votre compte à bien été crée !') //Alerte nous indiquant qu'on est bien enregistré
        });
    };

    return (
        <div className="Register">
            <h1>Registration</h1>
            <div className="RegisterForm">
                <label for="user">username</label>
                <input type="text" placeholder="Username..." id="user"
                    onChange={(event) => {
                        setUsername(event.target.value); /* On rentre son pseudo */
                    }}
                />
                <label for="password">password</label>
                <input type="password" placeholder="Password..." id="password"
                    onChange={(event) => {
                        setPassword(event.target.value); /* On rentre son mot de passe  */
                    }}
                />
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default Register;
