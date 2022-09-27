import React from "react";
import "./ReviewCart.css";
import { useNavigate } from "react-router-dom";

const ReviewCart = ({ cart, handleClearReviewCart }) => {
    const navigate = useNavigate();
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    cart.forEach((product) => {
        quantity = quantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
    });

    const tax = (totalPrice / 10).toFixed(2);
    const grandTotal = Math.floor(totalPrice + parseFloat(tax) + totalShipping);

    return (
        <div className="review-order-summary">
            <h2>Order Summary</h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${grandTotal}</h4>
            <div className="button2">
                <button
                    onClick={() => handleClearReviewCart()}
                    className="clear-cart-button"
                >
                    Clear Cart <i className="fa-solid fa-trash-can"></i>
                </button>
                <br />
                <button
                    onClick={() => navigate(`/checkout`)}
                    className="review-order-button"
                >
                    Proceed checkout <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default ReviewCart;
