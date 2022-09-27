import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "./../../firebase.init";
import "./MyOrders.css";

const MyOrders = () => {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    useEffect(() => {
        const getOrder = async () => {
            const email = user.email;
            try {
                const { data } = await axios.get(
                    `https://ema-john207.herokuapp.com/orders?email=${email}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                );
                setOrder(data);
            } catch (error) {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    signOut(auth);
                    navigate("/login");
                }
            }
        };
        getOrder();
    }, [user]);
    return (
        <section className="my-orders">
            <h1>Your Orders</h1>
            <div>
                {order.map((or, index) => (
                    <div className="d-flex order-list" key={index}>
                        <div className="ordered_product-images">
                            {or?.products?.slice(0, 3).map(({ img }, index) => (
                                <img key={index} src={img} alt="" height={50} />
                            ))}
                            {or.products.length > 3 && <div>More...</div>}
                        </div>
                        <div>
                            <p>Order id : {or._id}</p>
                            <p>
                                Address : {or.streetAddress}, {or.city},{" "}
                                {or.state}, {or.country}
                            </p>
                            <p>
                                Products :{" "}
                                {or?.products
                                    ?.slice(0, 3)
                                    .map((product) => product.name + ", ")}
                                {or.products.length > 3 && (
                                    <span className="fw-bold">More...</span>
                                )}
                            </p>
                            <p>Date: {or?.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyOrders;
