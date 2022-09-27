import React, { useEffect, useState } from "react";
import "./Checkout.css";
import useCart from "./../../Hooks/useCart";
import useProducts from "../../Hooks/useProducts";
import CheckoutProducts from "./CheckoutProducts/CheckoutProducts";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { format } from "date-fns";

const Checkout = () => {
    const [user] = useAuthState(auth);
    const [products] = useProducts();
    const [cart] = useCart(products);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        id: "",
        name: "",
        state: "",
    });
    const [scStates, setScStates] = useState({});
    let totalPrice = 0;
    let totalShipping = 0;
    cart.forEach((product) => {
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
    });

    const tax = (totalPrice / 10).toFixed(2);
    const grandTotal = Math.floor(totalPrice + parseFloat(tax) + totalShipping);

    useEffect(() => {
        const handleFetch = async () => {
            const url = "https://ema-john207.herokuapp.com/countries";
            const { data } = await axios.get(url);
            setCountries(data);
        };
        handleFetch();
    }, []);

    useEffect(() => {
        const url = `https://ema-john207.herokuapp.com/countryById/${selectedCountry.id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setScStates(data));
    }, [selectedCountry.id]);

    const handleSelect = (e) => {
        const country = countries.find(
            (country) => country._id === e.target.value
        );
        setSelectedCountry({
            id: e.target.value,
            name: country.country_name,
        });
    };

    const handleSelectState = (e) => {
        setSelectedCountry({ ...selectedCountry, state: e.target.value });
    };

    const date = format(new Date(), "dd-MMMM-yyyy");

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            name: e.target.name.value,
            country: selectedCountry?.name,
            state: selectedCountry?.state,
            city: e.target.city.value,
            streetAddress: e.target.streetAddress.value,
            zipCode: e.target.zipCode.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            paymentMethod: selectedMethod,
            products: cart,
            productTotalPrice: totalPrice,
            shipping: totalShipping,
            grandTotal: grandTotal,
            date: date,
        };
        if (!Object.values(order).some((v) => v === "")) {
            const url = "https://ema-john207.herokuapp.com/orders";
            axios.post(url, order).then((response) => {
                const { data } = response;
                if (data.insertedId) {
                    alert("your order has been placed");
                }
            });
        } else {
            alert("Please fill the all input and select payment method");
        }
    };

    return (
        <div className="checkout-container">
            <form id="user-details" onSubmit={handleSubmit}>
                <h1 className="fs-3">Billing details</h1>
                <div className="billing-details-container">
                    <div className="input-box">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Email</label>
                        <input
                            disabled
                            value={user?.email}
                            type="email"
                            name="email"
                            id=""
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Phone</label>
                        <input type="number" name="phone" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Company Name (optional)</label>
                        <input type="text" name="companyName" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Country</label>
                        <Form.Select
                            aria-label="Default select example"
                            className="p-3"
                            onChange={handleSelect}
                        >
                            <option>Select your country</option>
                            {countries.map((country) => (
                                <option key={country._id} value={country._id}>
                                    {country.country_name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="input-box">
                        <label htmlFor="">State</label>
                        <Form.Select
                            aria-label="Default select example"
                            className="p-3"
                            onChange={handleSelectState}
                        >
                            <option>Select your country</option>
                            {scStates?.states?.map((state) => (
                                <option
                                    key={state.state_id}
                                    value={state.state_name}
                                >
                                    {state.state_name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Town/City</label>
                        <input type="text" name="city" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Street Address</label>
                        <input type="text" name="streetAddress" id="" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">ZIP Code</label>
                        <input type="text" name="zipCode" id="" />
                    </div>
                </div>
            </form>
            <div className="ordered-products-container">
                <h1 className="fs-3">Your Order</h1>
                <div className="checkout-product-title">
                    <h3 className="fs-5">Product Name</h3>
                    <h3 className="fs-5">Quantity</h3>
                    <h3 className="fs-5">Price</h3>
                </div>
                <div className="checkout-products">
                    {cart.map((product, index) => (
                        <CheckoutProducts key={index} product={product} />
                    ))}
                    <div className="checkout-details">
                        <p>Total Price:</p>
                        <p>$ {totalPrice}</p>
                    </div>
                    <div className="checkout-details">
                        <p>shipping:</p>
                        <p>$ {totalShipping}</p>
                    </div>
                    <div className="checkout-details">
                        <p>Grand Total:</p>
                        <p>$ {grandTotal}</p>
                    </div>
                    <div>
                        <h3 className="fs-5">Payment Methods</h3>
                        <div className="methods">
                            <div
                                className={`method ${
                                    selectedMethod === "Cash On delivery" &&
                                    "selected"
                                }`}
                                onClick={() =>
                                    setSelectedMethod("Cash On delivery")
                                }
                            >
                                <i className="fa-regular fa-money-bill-1"></i>
                                <p>Cash On Delivery</p>
                            </div>
                            <div
                                className={`method ${
                                    selectedMethod === "Credit/Debit Card" &&
                                    "selected"
                                }`}
                                onClick={() =>
                                    setSelectedMethod("Credit/Debit Card")
                                }
                            >
                                <i className="fa-solid fa-credit-card"></i>
                                <p>Credit/Debit Card</p>
                            </div>
                            <div
                                className={`method ${
                                    selectedMethod === "G-pay" && "selected"
                                }`}
                                onClick={() => setSelectedMethod("G-pay")}
                            >
                                <i className="fa-brands fa-google-pay"></i>
                                <p>G-pay</p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="place-order-btn"
                        form="user-details"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
