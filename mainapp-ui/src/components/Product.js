import axios from 'axios';
import useSWR, { mutate } from "swr";
import {Image, Button, Card} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import * as urls from './apiUrls'

function Product({ match }){

    let productId = match.params.id
    let productUrl = urls.productUrl + `${productId}/`

    let [userIsAuthenticated, setUserIsAuthenticated] = useState({'is_authenticated': false})
    useEffect(()=>{
        axios.get(urls.checkUserIsAuthenticatedUrl)
            .then(response => setUserIsAuthenticated({'is_authenticated': response.data.is_authenticated}))
    }, [])
    function addToCart(product_id) {
        return function (e){

            e.preventDefault()

            axios.put(urls.addToCartUrl + `${product_id}/`).then(
                () => {
                    mutate(urls.currentCustomerCartUrl);
                    mutate(productUrl)
                }).catch(function (error){
                alert("Товар уже в корзине")
            })
        }
    }
    let fetchFunc = () => axios.get(productUrl).then(res=>res.data)
    let { data, error } = useSWR(productUrl, fetchFunc)

    if(!data) return "No data"
    if(error) return "error"

    return(
        <div style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-md-4">
                    <Image src={data.image} fluid />
                </div>
                <div className="col-md-8">
                    <p><strong>{data.title}</strong></p>
                    <p>Описание: {data.description}</p>
                    <hr/>
                    <p>Цена: <strong>{data.price}</strong> руб.</p>
                    <p>
                    {data.in_cart ? <Button variant="default" size="md" id={data.id} disabled>Товар в корзине</Button>  : ""}
                    {userIsAuthenticated.is_authenticated && !data.in_cart ? <Button variant="danger" size="md" id={data.id} onClick={addToCart(data.id)}>Добавить в корзину</Button> : ""}
                    </p>
                </div>
            </div>
        </div>
    )

}

export default Product;