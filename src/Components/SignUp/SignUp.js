import React from "react";
import "./SignUp.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import auth from "./../../firebase.init";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useEffect } from "react";
import useToken from "./../../Hooks/useToken";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState({
        value: "",
        error: "",
    });
    const [email, setEmail] = useState({
        value: "",
        error: "",
    });
    const [password, setPassword] = useState({
        value: "",
        error: "",
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        error: "",
    });

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const [token] = useToken(user || googleUser);

    const handleNameBlur = (e) => {
        if (e.target.value.length > 3) {
            setName({
                value: e.target.value,
                error: "",
            });
        } else {
            setName({
                value: "",
                error: "Username should contain atleast four characters.",
            });
        }
    };

    const handleEmailBlur = (e) => {
        if (/[a-z0-9]+@gmail.com/.test(e.target.value)) {
            setEmail({
                value: e.target.value,
                error: "",
            });
        } else {
            setEmail({
                value: "",
                error: "Please enter valid email.",
            });
        }
    };
    const handlePassBlur = (e) => {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)) {
            setPassword({
                value: e.target.value,
                error: "",
            });
        } else {
            setPassword({
                value: "",
                error: "Password should contain minimum eight characters, at least one letter and one number.",
            });
        }
    };
    const handleConfirmPassBlur = (e) => {
        if (e.target.value === password.value) {
            setConfirmPassword({
                value: e.target.value,
                error: "",
            });
        } else {
            setConfirmPassword({
                value: "",
                error: "Those passwords didn't match. Try again.",
            });
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (email.value === "") {
            setEmail({
                value: "",
                error: "Email is required.",
            });
        }
        if (password.value === "") {
            setPassword({
                value: "",
                error: "Password is required.",
            });
        }
        if (confirmPassword.value === "") {
            setConfirmPassword({
                value: "",
                error: "Confirm password is required.",
            });
        }
        if (password.value && email.value && confirmPassword.value) {
            await createUserWithEmailAndPassword(email.value, password.value);
            await updateProfile({ displayName: name.value });
        }
    };

    useEffect(() => {
        if (error?.code === "auth/email-already-in-use") {
            setEmail({
                value: "",
                error: "This email is already used for another acount.",
            });
        }
    }, [error]);

    if (user) {
        navigate(`/shop`);
    }

    return (
        <div>
            <div className="login-card-container">
                <div className="login-card">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleCreateUser}>
                        <div className="input-box">
                            <label htmlFor="name">User Name</label>
                            <input
                                onBlur={handleNameBlur}
                                type="text"
                                name="name"
                            />
                            {name.error && (
                                <p className="error-message">{name.error}</p>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                onBlur={handleEmailBlur}
                                type="email"
                                name="email"
                            />
                            {email.error && (
                                <p className="error-message">{email.error}</p>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Password</label>
                            <input
                                onBlur={handlePassBlur}
                                type="password"
                                name="password"
                            />
                            {password.error && (
                                <p className="error-message">
                                    {password.error}
                                </p>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                onBlur={handleConfirmPassBlur}
                                type="password"
                                name="password"
                            />
                            {confirmPassword.error && (
                                <p className="error-message">
                                    {confirmPassword.error}
                                </p>
                            )}
                        </div>
                        <button
                            className="login-card-button btn-clr"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already have an account?{" "}
                        <button onClick={() => navigate(`/login`)}>
                            Login
                        </button>
                    </p>
                    <div className="alternative">
                        <p>or</p>
                        <div></div>
                    </div>
                    <button
                        className="login-card-button google-btn"
                        onClick={() => signInWithGoogle()}
                    >
                        {" "}
                        <FcGoogle /> Contine with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
