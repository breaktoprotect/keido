import { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";
import jwt_decode from "jwt-decode";
import axiosReq from "../components/common/axiosCustom";

//const LOGIN_URI = process.env.REACT_APP_ENDPOINT + "/user/login";
const LOGIN_URI = "/user/login";

export const useLogin = () => {
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuth();

    const login = async (data) => {
        setIsLoading(true);
        setErrors(null); // Reset error

        try {
            // POST to server
            /* const { data: response } = await axios.post(LOGIN_URI, data); */
            const { data: response } = await axiosReq.post(LOGIN_URI, data);

            //debug
            console.log(">> ", response.token);

            // Check status
            if (!response.hasOwnProperty("token")) {
                setErrors({
                    apiError: {
                        message: response.status,
                    },
                });
            } else {
                // Decode the token to user object
                const decodedUser = jwt_decode(response.token);

                // Save the JWT to local storage (not the most secure, but works here)
                localStorage.setItem("token", JSON.stringify(response.token));

                // Update Auth context
                const authUser = {
                    email: decodedUser["sub"],
                    role: decodedUser["role"],
                    token: response.token,
                };
                dispatch({ type: "LOGIN", payload: authUser });

                //debug
                console.log("decodedUser:", decodedUser);
                console.log("authUser:", authUser);

                //
                setIsLoading(false);

                // Redirect authenticated user to main page e.g. dashboard
            }

            //debug
            console.log("response:", response);
        } catch (ex) {
            //debug
            console.log("Exception! ->", ex);

            if (ex.code === "ERR_NETWORK") {
                setErrors("apiError", {
                    message: ex.message + " - Unable to connect to the server.",
                });
            } else if (ex.response && ex.response.status === 400) {
                setErrors("apiError", { message: ex });
            } else {
                setErrors("apiError", {
                    message:
                        "Unhandled exception - You may need to contact support.",
                });
            }
        }
    };

    return { login, isLoading, errors, setErrors };
};
