import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Image, Button, Alert, Form } from 'react-bootstrap';
import useSWR, { mutate } from "swr";
import * as urls from './apiUrls'

function Order(){

    const fetcher = () => axios.get(urls.currentCustomerCartUrl).then(response => response.data)

    let { data, error } = useSWR(urls.currentCustomerCartUrl, fetcher)

    if(!data) return "No data"
    if(error) return "error"

    return(
        <div style={{ marginTop: "100px"}}>

              {data.products && data.final_price !== "0.00" ?
              <React.Fragment>
              <Table borderless style={{ textAlign: "center", borderCollapse: "separate", borderSpacing: "0 20px" }}>
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Кол-во</th>
                  <th>Изображение</th>
                  <th>Цена (за шт.)</th>
                  <th>Общая цена</th>
                </tr>
              </thead>
              <tbody>
              {data.products.map(cproduct=>(
               <tr>
                  <td>{cproduct.product.title}</td>
                  <td>{cproduct.qty}</td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}><Image src={cproduct.product.image} style={{ width: "200px", height: "auto" }} fluid/></td>
                  <td>{cproduct.product.price} руб.</td>
                  <td>{cproduct.final_price} руб.</td>
                </tr>
              ))}
              </tbody>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Итого</td>
                      <td><strong>{data.final_price}</strong> руб.</td>
                  </tr>
              </Table>

              </React.Fragment>

                  :

              <Alert variant="info">В корзине нет товара для заказа</Alert>}

        </div>
    )
}

export default Order;