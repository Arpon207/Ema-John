import "./Order.css";
import React from "react";
import useCart from "./../../Hooks/useCart";
import ReviewItem from "./ReviewItem/ReviewItem";
import ReviewCart from "./ReviewCart/ReviewCart";
import { removeDB, removeItem } from "../../utilities/fakedb";

const Order = () => {
    const [cart, setCart] = useCart();
    const handleClearReviewCart = () => {
        setCart([]);
        removeDB();
    };

    const handleRemoveItem = (selectedProduct) => {
        const rest = cart.filter((pd) => pd._id != selectedProduct._id);
        setCart(rest);
        removeItem(selectedProduct._id);
    };

    return (
        <div className="order-review-container">
            <div className="review-items-container">
                {cart.map((product) => (
                    <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </div>
            <div className="review-cart-container">
                <ReviewCart
                    cart={cart}
                    handleClearReviewCart={handleClearReviewCart}
                />
            </div>
        </div>
    );
};

export default Order;
