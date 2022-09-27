import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     fetch("https://ema-john207.herokuapp.com/products")
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // }, []);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = getStoredCart();
        let savedCart = [];
        if (storedCart) {
            const keys = Object.keys(storedCart);
            const url = `https://ema-john207.herokuapp.com/productByKeys`;
            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(keys),
            })
                .then((res) => res.json())
                .then((products) => {
                    for (let id in storedCart) {
                        const addedProduct = products.find(
                            (product) => product._id == id
                        );
                        if (addedProduct) {
                            addedProduct.quantity = storedCart[id];
                            savedCart.push(addedProduct);
                        }
                    }
                    setCart(savedCart);
                });
        }
    }, []);
    return [cart, setCart];
};

export default useCart;
