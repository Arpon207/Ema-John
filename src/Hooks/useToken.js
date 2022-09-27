import axios from "axios";
import { useState, useEffect } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");
    useEffect(() => {
        const email = user?.user?.email;
        if (email) {
            const getToken = async () => {
                const { data } = await axios.post(
                    "https://ema-john207.herokuapp.com/login",
                    {
                        email,
                    }
                );
                setToken(data);
                localStorage.setItem("accessToken", data.accessToken);
            };
            getToken();
        }
    }, [user]);
    return [token];
};

export default useToken;
