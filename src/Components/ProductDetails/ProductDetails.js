import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAddToCart from "../../Hooks/useAddToCart";
import useProducts from "../../Hooks/useProducts";
import "./ProductDetails.css";

const ProductDetails = () => {
    const [products] = useProducts();
    const { AddToCart } = useAddToCart();
    const { productId } = useParams();
    const [count, setCount] = useState(1);
    const selectedProduct = products.find(
        (product) => product._id == productId
    );
    const handleIncreaseCount = () => {
        const newCount = count + 1;
        setCount(newCount);
    };
    const handleDecreaseCount = () => {
        const newCount = count - 1;
        setCount(newCount);
    };

    return (
        <div className="product-details-container">
            <div className="product-details-card">
                <div className="product-image">
                    <img src={selectedProduct?.img} alt="" />
                </div>
                <div className="product-details">
                    <h3 className="product-name">{selectedProduct?.name}</h3>
                    <p>{selectedProduct?.category}</p>
                    <br />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Exercitationem corrupti autem quam a doloribus
                        eligendi, est sint consequatur? Nobis, sunt.
                    </p>
                    <h3>${selectedProduct?.price}</h3>

                    <div className="product-details-cart">
                        <div className="quantity">
                            <button onClick={handleDecreaseCount}>-</button>
                            <span>{count}</span>
                            <button onClick={handleIncreaseCount}>+</button>
                        </div>
                        <button
                            onClick={() => AddToCart(selectedProduct)}
                            className="product-details-cart-btn"
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="product-details-btn">
                        <button>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                        <button>
                            <i className="fa-solid fa-code-compare"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
