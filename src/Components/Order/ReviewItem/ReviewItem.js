import React from "react";
import "./ReviewItem.css";
const ReviewItem = ({ product, handleRemoveItem }) => {
    const { img, name, price, quantity, shipping } = product;
    return (
        <div className="review-item">
            <div className="item-image">
                <img src={img} alt="" />
            </div>
            <div className="review-item-detail">
                <div className="item-detail">
                    <p title={name}>
                        {name.length > 20 ? name.slice(0, 20) + "..." : name}
                    </p>
                    <p>
                        <small>
                            Price: <span>${price}</span>
                        </small>
                    </p>
                    <p>
                        <small>
                            Quantity: <span>{quantity}</span>
                        </small>
                    </p>
                    <p>
                        <small>
                            Shipping: <span>${shipping}</span>
                        </small>
                    </p>
                </div>
                <div
                    onClick={() => handleRemoveItem(product)}
                    className="delete-button"
                >
                    <button>
                        <i className=" delete fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
