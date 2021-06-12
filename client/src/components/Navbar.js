import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';


function Navbar() {

    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        // @ts-ignore
        setLoggedIn(localStorage.getItem('loggedIn'));

    }, [localStorage.getItem('loggedIn')]);

    const history = useHistory();

    function logOut() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="Navbar">



            <a href="/">Home</a>    {/* Une fois connecté, la navbar changera */}
            {loggedIn ? (
                <>

                    <a href="/upload">Upload</a>
                    <a href="/profile">Profile</a>
                    <a href="/login" onClick={logOut}>logout</a> {/* au click l'utilisateur sera redirigé */}
                </>

            ) : (
                <>
                    <a href="/register">Register</a>
                    <a href="/login">Login</a>
                    <a href='/contact'>Contact us</a>

                </>

            )}
        </div>
    );
}

export default Navbar;
