import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Card, Carousel, Image} from 'react-bootstrap';
import useSWR, { mutate } from "swr";
import {Link} from "react-router-dom";
import * as urls from './apiUrls';
import { useHistory } from "react-router-dom";

function MainContent(){

    let [userIsAuthenticated, setUserIsAuthenticated] = useState({'is_authenticated': false})
    let fetchFunc = () => axios.get(urls.productUrl).then(res=>res.data)
    let { data, error } = useSWR(urls.productUrl, fetchFunc)
    function addToCart(product_id) {
        return function (e){

            e.preventDefault()

            axios.put(urls.addToCartUrl + `${product_id}/`)
                .then(
                () => {
                    mutate(urls.currentCustomerCartUrl);
                    mutate(urls.productUrl)
                }).catch(function (error){
                alert("Товар уже в корзине")
            })
        }
    }

    useEffect(()=>{
        axios.get(urls.checkUserIsAuthenticatedUrl)
            .then(response => setUserIsAuthenticated({'is_authenticated': response.data.is_authenticated}))
    }, [])

    if(!data) return "No products"
    if(error) return "Error"

    return(
        <div className="row mt-5">
            {data ? data.map(p => (
            <div className="col-md-3 pt-5">
                <Card style={{ border: "none" }}>
                  <Card.Img variant="top" src={p.image} fluid/>
                  <Card.Body>
                      <Card.Title className="text-center"><Link to={{ pathname: `/product/${p.id}/`, fromDashboard: false }} style={{ textDecoration: "none" }}>{p.title}</Link></Card.Title>
                      <Card.Body>
                          <p className="text-center"> Цена: <strong>{p.price}</strong> руб.</p>
                      </Card.Body>
                    <Card.Text>
                    </Card.Text>
                  </Card.Body>
                    {p.in_cart ? <Button variant="default" size="md" id={p.id} disabled>Товар в корзине</Button>  : ""}
                    {userIsAuthenticated.is_authenticated && !p.in_cart ? <Button variant="danger" size="md" id={p.id} onClick={addToCart(p.id)}>Добавить в корзину</Button> : ""}
                </Card>
            </div>
            )) : ''}
        </div>
    )
}

export default MainContent;