import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Pagination } from 'react-bootstrap';
import useSWR, { mutate } from 'swr';
import { Link } from "react-router-dom";
import * as urls from './apiUrls';

function Category({ match }){

    let [category, setCategory] = useState()
    let [userIsAuthenticated, setUserIsAuthenticated] = useState({'is_authenticated': false})
    let categoryId = match.params.id
    let categoryProductsUrl = urls.categoryUrl + `${categoryId}/category_products/`
    let fetchFunc = () => axios.get(categoryProductsUrl).then(res=>res.data)
    let { data, error } = useSWR(categoryProductsUrl, fetchFunc)

    function addToCart(product_id) {
        return function (e) {

            e.preventDefault()
            axios.put(urls.addToCartUrl + `${product_id}/`).then(
                () => {
                    mutate(urls.currentCustomerCartUrl)
                    mutate(categoryProductsUrl)
                }).catch(function (error) {
                alert("Товар уже в корзине")
            })
        }
    }


    useEffect(()=>{
        axios.get(urls.checkUserIsAuthenticatedUrl)
            .then(response => setUserIsAuthenticated({'is_authenticated': response.data.is_authenticated}))
    }, [])
    useEffect(()=> {
          axios.get(
            urls.categoryUrl + `${categoryId}/`).then(response => setCategory(response.data))
    }, [categoryId])

    if(!data) return "No products"
    if(error) return "Error"

    return(
        <div className="row mt-5">
            {data ? data.results.map(p => (
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

export default Category;