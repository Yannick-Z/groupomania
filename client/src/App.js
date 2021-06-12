/* eslint-disable linebreak-style */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Upload from './pages/Upload/Upload';
import Profile from './pages/Profile/Profile';
import Contact from './pages/contact/contact';




function App() {
    return (
        <>
            <Navbar />
            <Router>
                <Route path="/" exact render={() => <Home />} />
                <Route path="/register" exact render={() => <Register />} />
                <Route path="/login" exact render={() => <Login />} />
                <Route path="/upload" exact render={() => <Upload />} />
                <Route path="/profile" exact render={() => <Profile />} />
                <Route path="/contact" exact render={() => <Contact />} />
            </Router>
        </>

    );
}

export default App;
