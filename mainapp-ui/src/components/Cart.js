import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Image, Button, Alert } from 'react-bootstrap';
import useSWR, { mutate } from "swr";
import { Link } from 'react-router-dom';
import * as urls from './apiUrls';


function Cart(){

    let fetchFunc = () => axios.get(urls.currentCustomerCartUrl).then(response => response.data)

    let { data , error } = useSWR(urls.currentCustomerCartUrl, fetchFunc)

    function onKeyUpFunc(cproduct_id){
        return function (e){
            e.preventDefault()
            axios.patch(urls.changeQtyUrl + `${e.target.value}/${cproduct_id}/`).then(() => mutate(urls.currentCustomerCartUrl))
        }
    }

    function removeFromCart(cproduct_id) {
        return function (e){

            e.preventDefault()

            axios.put(urls.removeFromCartUrl + `${cproduct_id}/`).then(() => mutate(urls.currentCustomerCartUrl))
                .catch(function (error){
                alert("Товар уже удален")
            })
        }

    }
    if(!data) return "No data"
    if(error) return "error"
    console.log(data, data.products)
    return(
        <div style={{ marginTop: "100px"}}>

              {data.products && data.final_price !== "0.00" ?

              <Table borderless style={{ textAlign: "center", borderCollapse: "separate", borderSpacing: "0 20px" }}>
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Кол-во</th>
                  <th>Изображение</th>
                  <th>Цена (за шт.)</th>
                  <th>Общая цена</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
              {data.products.map(cproduct=>(
               <tr>
                  <td>{cproduct.product.title}</td>
                   <td><form><input className="form-control" min="1" style={{ width: "60px" }} onChange={onKeyUpFunc(cproduct.id)} type="number" value={cproduct.qty}/></form></td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}><Image src={cproduct.product.image} style={{ width: "200px", height: "auto" }} fluid/></td>
                  <td>{cproduct.product.price} руб.</td>
                  <td>{cproduct.final_price} руб.</td>
                  <td><Button variant="danger" size="md" id={cproduct.id} onClick={removeFromCart(cproduct.id)} block>Удалить из корзины</Button></td>
                </tr>
              ))}
              </tbody>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Итого</td>
                      <td><strong>{data.final_price}</strong> руб.</td>
                      <td style={{ paddingBottom: "15px", paddingTop: "15px" }}><Link to={{ pathname: "/order/", fromDashboard: false }} style={{ textDecoration: "none" }}><Button variant="outline-primary" block size="md">Перейти к оформлению</Button></Link></td>
                  </tr>
            </Table> :   <Alert variant="info">Ваша корзина пуста</Alert>}
        </div>
    )
}

export default Cart;