import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Upload from './pages/Upload/Upload';
import Profile from "./pages/Profile/Profile";
import Admin from './components/Admin';



function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Route  path="/" exact render={(props) => <Home />} />
      <Route  path="/register" exact render={() => <Register />} />
      <Route  path="/login" exact render={(props) => <Login />} />
      <Route  path="/upload" exact render={() => <Upload />} />
      <Route  path="/profile" exact render={() => <Profile/>} />
      <Route  path='/admin' exact render={()=> <Admin/> } />

      
      
      
    </Router>
    
     </>
    
  );
}

export default App;
