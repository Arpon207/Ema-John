import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";
const Product = ({ product, addToCart }) => {
    const { _id, img, name, price, seller, ratings, category } = product;
    const navigate = useNavigate();
    return (
        <div className="product-container">
            <div
                className="product"
                onClick={() => navigate(`/${category}/${_id}`)}
            >
                <img className="image" src={img} alt="" />
                <h3 className="fs-5 mt-1">{name}</h3>
                <h5 className="fs-6">Price:${price}</h5>
                <p className="p1">Manufacurer:{seller}</p>
                <p className="p2">Rating:{ratings}</p>
            </div>
            <button onClick={() => addToCart(product)} className="button">
                Add to cart <i className="fa-solid fa-cart-plus"></i>
            </button>
        </div>
    );
};

export default Product;
