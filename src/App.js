import "./App.css";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Order from "./Components/Order/Order";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Checkout from "./Components/Checkout/Checkout";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import MyOrders from "./Components/MyOrders/MyOrders";
import NotFound from "./Components/NotFound/NotFound";

export const StateContext = createContext("state");

function App() {
    const [showCart, setShowCart] = useState(false);

    const handleCartButton = () => {
        if (!showCart) {
            setShowCart(true);
            document.body.style.overflow = "hidden";
        } else {
            setShowCart(false);
            document.body.style.overflow = "visible";
        }
    };

    return (
        <StateContext.Provider
            value={[showCart, handleCartButton, setShowCart]}
        >
            <div className="App">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Shop showCart={showCart} />}
                    ></Route>
                    <Route
                        path="/:category/:productId"
                        element={<ProductDetails />}
                    ></Route>
                    <Route
                        path="/shop"
                        element={<Shop showCart={showCart} />}
                    ></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/inventory" element={<Inventory />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route
                        path="/checkout"
                        element={
                            <RequireAuth>
                                <Checkout />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </StateContext.Provider>
    );
}

export default App;
