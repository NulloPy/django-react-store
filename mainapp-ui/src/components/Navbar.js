import axios from 'axios';
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import CartNavbar from './CartNavbar';
import { mutate } from 'swr';
import * as urls from './apiUrls'

function Navbar() {
    let [categories, setCategories] = useState([]);
    let [userIsAuthenticated, setUserIsAuthenticated] = useState({'is_authenticated': false})
    // The useEffect() hook fires any time that the component is rendered.
    // An empty array is passed as the second argument so that the effect only fires once.
    useEffect(()=>{
        axios.get(urls.checkUserIsAuthenticatedUrl)
            .then(response => setUserIsAuthenticated({'is_authenticated': response.data.is_authenticated}))
    }, [])
    useEffect(() => {
        axios.get(urls.categoryUrl).then(res => {setCategories(res.data);})
            .catch(err => {console.log(err);});
    }, []);
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link to={{ pathname: "/", fromDashboard: false }} className="navbar-brand">E-Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to={{ pathname: "/", fromDashboard: false }} className="nav-link active">Главная</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Категории
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {categories.map(category => (
                                    <Link className="dropdown-item" to={{ pathname: `/category/${category.id}/`, fromDashboard: false}}>{category.name}</Link>
                                ))}
                            </ul>
                        </li>
                        {!userIsAuthenticated.is_authenticated ?
                        <React.Fragment>
                        <li className="nav-item">
                            <Link to={{ pathname: "/login/", fromDashboard: false }} className="nav-link text-decoration-none" aria-current="page">Авторизация</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Регистрация</a>
                        </li>
                        </React.Fragment> : ''}
                    </ul>
                    <span className="navbar-text">
                        <Link to={{ pathname: '/cart_detail/', fromDashboard: false }} style={{ textDecoration: "none" }}><CartNavbar/></Link>
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;