import "./Header.css";
import React, { useContext, useState } from "react";
import logo from "../../images/Logo.svg";
import { MenuIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { StateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
const Header = () => {
    const mobileView = window.matchMedia("(max-width: 688px)");
    const [showCart, handleCartButton] = useContext(StateContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleMenuButton = () => {
        if (mobileView.matches) {
            if (!showMenu) {
                setShowMenu(true);
                document.body.style.overflow = "hidden";
            } else {
                setShowMenu(false);
                document.body.style.overflow = "visible";
            }
        }
    };

    return (
        <nav className="header">
            <img onClick={() => navigate(`/shop`)} src={logo} alt="" />
            <div className={`menu ${showMenu ? "menu-open" : "menu-closed"}`}>
                <div className="links">
                    <NavLink
                        onClick={() => handleMenuButton()}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "custom-link"
                        }
                        to="/shop"
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        onClick={() => handleMenuButton()}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "custom-link"
                        }
                        to="/Order"
                    >
                        Order Review
                    </NavLink>
                    <NavLink
                        onClick={() => handleMenuButton()}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "custom-link"
                        }
                        to="/inventory"
                    >
                        Inventory
                    </NavLink>
                    <NavLink
                        onClick={() => handleMenuButton()}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "custom-link"
                        }
                        to="/about"
                    >
                        About
                    </NavLink>
                    <NavLink
                        onClick={() => handleMenuButton()}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "custom-link"
                        }
                        to="/checkout"
                    >
                        checkout
                    </NavLink>
                    {user ? (
                        <div
                            className={
                                showUserMenu
                                    ? "user user-show"
                                    : "user user-hide"
                            }
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <div className="user-image">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="" />
                                ) : (
                                    <img
                                        src="https://thumbs.dreamstime.com/z/happy-young-boy-teenager-character-happy-young-boy-teenager-character-vector-illustration-design-182237891.jpg"
                                        alt=""
                                    />
                                )}
                            </div>
                            <div id="user-menu">
                                <ul
                                    className={`user-menu ${
                                        showUserMenu ? "active-user-menu" : ""
                                    }`}
                                >
                                    <span className="arrow"></span>
                                    <li>
                                        <CgProfile /> My Profile
                                    </li>
                                    <li onClick={() => navigate("my-orders")}>
                                        <GiShoppingCart /> My Orders
                                    </li>
                                    <li onClick={() => signOut(auth)}>
                                        <VscSignOut />
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <NavLink
                            onClick={() => handleMenuButton()}
                            className={({ isActive }) =>
                                isActive ? "active-link" : "custom-link"
                            }
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
            <div id="buttons">
                {showMenu ? (
                    ""
                ) : (
                    <div id="cart-button" onClick={() => handleCartButton()}>
                        {showCart ? (
                            <XIcon className="show-button"></XIcon>
                        ) : (
                            <ShoppingCartIcon className="show-button"></ShoppingCartIcon>
                        )}
                    </div>
                )}
                {showCart ? (
                    ""
                ) : (
                    <div onClick={handleMenuButton}>
                        {showMenu ? (
                            <XIcon className="closed-button"></XIcon>
                        ) : (
                            <MenuIcon className="show-button"></MenuIcon>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};
export default Header;
