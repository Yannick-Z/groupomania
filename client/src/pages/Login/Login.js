import React, { useEffect, useState } from 'react';
import './Login.css';
import Axios from 'axios';

import {useHistory} from 'react-router-dom';

function Login() {
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // @ts-ignore
    // @ts-ignore
    // const [token] = useState('');

    let history = useHistory();


    const login = () => {
    
        Axios.post('http://localhost:3001/user/login',{ //Envoie la requête post a la base de données.
            username: username,
            password: password,
        }).then((response) => { 
            if (response.data.loggedIn) {
                // @ts-ignore
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', response.data.username); //On récupère toutes les données dans le localStorage
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                
                history.push('/');
            } else {  
                setErrorMessage(response.data.message);  
            }
        });
    };

    useEffect(() => {
        if (localStorage.getItem('token')){
            Axios.post('http://localhost:3001/user/login/token',
                { //Envoie le token d'authentification
                    headers: {
                        authorization : `Bearer ${localStorage.getItem('token')}` //Récupération du token
                    },
                    body:{
                        id: localStorage.getItem('token') //On récupère l'id 
                    }
                }).then((response)=>{
                if (response.data.loggedIn == true ) {
                    setErrorMessage(response.data.user[0].username);
                
                }
            });
        }
    
    }, []);


    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" placeholder="Username..."  id="pseudo"/* L'utilisateur doit rentrer son pseudo */
                    onChange= {(event) => {
                        setUsername(event.target.value);
                    }}
                />
            
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" placeholder="Password..." id="mdp"
                    onChange= {(event) => {                    /*  L'utilisateur doit rentrer son pot de passe */
                        setPassword(event.target.value);
                    }}
                />
            
                <button onClick={login}>Login</button> {/*au clique on se log*/}
                {errorMessage}               
            </div>
        </div>
    );
}

export default Login;   
 