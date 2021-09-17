import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Category from './components/Category';
import MainContent from './components/Maincontent';
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Product from "./components/Product";
import Login from "./components/Login";

import { useHistory } from 'react-router-dom';

if(localStorage.getItem('token')){
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
}else {
    axios.defaults.headers.common['Authorization'] = ""
}

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <div className="container mt-3">
            <Switch>
                <Route path="/" exact component={MainContent}/>
                <Route path="/order/" exact component={Order}/>
                <Route path="/login/" exact component={Login}/>
                <Route path="/cart_detail/" exact component={Cart}/>
                <Route path="/product/:id" exact component={Product}/>
                <Route path="/category/:id" exact component={Category}/>
            </Switch>
            </div>
        </Router>
    </div>
  );
}


export default App;