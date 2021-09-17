import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { mutate } from 'swr';
import * as urls from './apiUrls';


function Login(){

    let [userLogin, setUserLogin] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [tokenObtained, setToken] = useState(false)
    let history = useHistory();

    useEffect(() =>{
        axios.get(urls.checkUserIsAuthenticatedUrl).then(response => response.data.is_authenticated ? history.push('/') : "")
    })

    function login(e){
        e.preventDefault()
        axios.post(urls.obtainJwtTokenUrl, {username: userLogin, password: userPassword})
            .then(function (response) {
            if (response.status == 200) {
                localStorage.setItem('token', response.data.access, "")
                window.location.href = "/"
            }
        }).catch(function (error){
            if(error.response.status == 401 || error.response.status == 400){
                document.getElementById('error').style.display = 'block'
            }
        })
    }

    function handleUserLogin(e){
        setUserLogin(e.target.value)
    }

    function handleUserPassword(e){
        setUserPassword(e.target.value)
    }

    return(
        <div style={{ paddingTop: "100px" }} className="container">
            <div className="row">
                <div className="col-md-6 offset-2">
                    <div className="alert alert-warning alert-dismissible fade show" id="error" role="alert" style={{ display: "none" }}>
                        Неверный логин или пароль
                    </div>
                    <Form>
                      <Form.Group controlId="formBasicLogin" className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text" value={userLogin} onChange={handleUserLogin} placeholder="Ваш логин" />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" value={userPassword} onChange={handleUserPassword} placeholder="Пароль" />
                      </Form.Group>
                      <Button variant="primary" type="button" onClick={login}>
                        Войти
                      </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;