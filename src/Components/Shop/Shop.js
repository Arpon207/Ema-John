import "./Shop.css";
import React, { useContext, useEffect, useState } from "react";
import Product from "./Products/Product";
import Cart from "./Cart/Cart";
import { addToDb, removeDB } from "../../utilities/fakedb";
import { StateContext } from "./../../App";
import useCart from "../../Hooks/useCart";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [showCart] = useContext(StateContext);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [productCount, setProductCount] = useState(10);
    useEffect(() => {
        const url = `https://ema-john207.herokuapp.com/products?page=${currentPage}&productCount=${productCount}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [currentPage, productCount]);

    useEffect(() => {
        fetch("https://ema-john207.herokuapp.com/productCount")
            .then((res) => res.json())
            .then((data) => {
                const pages = Math.ceil(data.count / productCount);
                setPageCount(pages);
            });
    }, [productCount]);

    // const [displayedProducts, setDisplayedProduct] = useState([]);
    // const [searchText, setSearchText] = useState("");

    // useEffect(()=>{
    //   if(searchText){
    //     const searchedProducts = products.filter(product => product.category.toLowerCase().includes(searchText.toLowerCase()));
    //     setDisplayedProduct(searchedProducts);
    //   }
    //   else{
    //     setDisplayedProduct(products);
    //   }
    // },[searchText,products]);

    // console.log(displayedProducts);

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

    const handleClearCart = () => {
        setCart([]);
        removeDB();
    };
    return (
        <div className="shop">
            <div className="products">
                {/* <input onChange={(e)=> setSearchText(e.target.value)} type="text" /> */}
                <section>
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            addToCart={AddToCart}
                        />
                    ))}
                </section>
                <div>
                    {[...Array(pageCount).keys()].map((number) => (
                        <button
                            className={currentPage === number ? "selected" : ""}
                            onClick={() => setCurrentPage(number)}
                            key={number}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <select onChange={(e) => setProductCount(e.target.value)}>
                        <option value={10} selected>
                            10
                        </option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
            <div
                className={` cart ${showCart ? "cart-open" : "cart-closed"}`}
                id="cart"
            >
                <Cart cart={cart} handleClearCart={handleClearCart} />
            </div>
        </div>
    );
};

export default Shop;
