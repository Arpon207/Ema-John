import React, { useEffect, useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import useToken from "./../../Hooks/useToken";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/shop";

    const [signInWithEmailAndPassword, LoginUser, loading, loginError] =
        useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, GoogleUser] = useSignInWithGoogle(auth);

    const [token] = useToken(LoginUser || GoogleUser);

    const signInUser = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token]);

    useEffect(() => {
        if (
            loginError?.code === "auth/user-not-found" ||
            loginError?.code === "auth/wrong-password"
        ) {
            setError("Incorrect email or password");
        }
    }, [loginError]);

    return (
        <div className="Login">
            <div className="login-card-container">
                <div className="login-card">
                    <h1>Login</h1>
                    <form onSubmit={signInUser}>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                onBlur={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Password</label>
                            <input
                                onBlur={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                            />
                        </div>
                        {error && (
                            <p className="text-light bg-danger">{error}</p>
                        )}
                        <button
                            className="login-card-button btn-clr"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <p>
                        New to Ema-John?{" "}
                        <button onClick={() => navigate(`/signup`)}>
                            Create New Account
                        </button>
                    </p>
                    <div className="alternative">
                        <p>or</p>
                        <div></div>
                    </div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="login-card-button google-btn"
                    >
                        {" "}
                        <FcGoogle /> Contine with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
