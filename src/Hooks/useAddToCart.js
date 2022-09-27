import { useState } from "react";
import { addToDb } from "../utilities/fakedb";

const useAddToCart = () => {
    const [cart, setCart] = useState([]);

    const AddToCart = (selectedProduct) => {
        let newCart = [];
        const exist = cart.find(
            (product) => product._id == selectedProduct._id
        );
        if (!exist) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            selectedProduct.quantity = selectedProduct.quantity + 1;
            const rest = cart.filter(
                (product) => product._id !== selectedProduct._id
            );
            newCart = [...rest, selectedProduct];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    };
    return { cart, setCart, AddToCart };
};

export default useAddToCart;
