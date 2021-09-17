import React, {useEffect} from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import * as urls from './apiUrls';

function CartNavbar(){
    let fetchFunc = () => axios.get(urls.currentCustomerCartUrl).then(response=>response.data)
    let { data, error } = useSWR(urls.currentCustomerCartUrl, fetchFunc)
    if(!data) return ""
    if(error) return ""
    console.log(data)
    return(
        <div>
            Корзина: <span className="badge bg-danger">{data.total_products}</span>
        </div>
    )
}

export default CartNavbar;