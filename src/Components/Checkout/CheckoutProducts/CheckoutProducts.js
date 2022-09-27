import React from 'react';
import './CheckoutProducts.css';

const CheckoutProducts = ({product}) => {
    const {name, price,quantity} = product
    return (
        <div className='checkout-product'>
            <p>{name}</p>
            <p>{quantity}</p>
            <p>$ {price*quantity}</p>
        </div>
    );
};

export default CheckoutProducts;