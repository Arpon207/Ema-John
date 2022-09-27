const addToDb = (id) => {
    let shoppingCart = {};
    const exists = getStoredCart();
    if (exists) {
        shoppingCart = exists;
    }
    if (shoppingCart[id]) {
        shoppingCart[id] = shoppingCart[id] + 1;
    } else {
        shoppingCart[id] = 1;
    }
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const getStoredCart = () => {
    return JSON.parse(localStorage.getItem("shopping-cart"));
};

const removeDB = () => {
    localStorage.removeItem("shopping-cart");
};

const removeItem = (id) => {
    const exists = getStoredCart();
    if (exists) {
        delete exists[id];
        localStorage.setItem("shopping-cart", JSON.stringify(exists));
    }
};

export { addToDb, getStoredCart, removeDB, removeItem };
