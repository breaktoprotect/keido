import { createContext, useReducer, useMemo } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    //debug
    console.log("AuthContext action ->", action);

    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            //debug
            console.log(
                "authReducer() returning default mode with state:",
                state
            );

            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useMemo(() => {
        //debug
        console.log("AuthContext -> useMemo() parse token");

        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            // Decode token
            const decodedUser = jwt_decode(token);

            //debug
            console.log("decodedUser ->", decodedUser);

            // Check for expiry
            /* if (dayjs.unix(decodedUser.exp) > dayjs()) {
                isToken
            } */
            const isTokenExpired =
                dayjs.unix(decodedUser.exp).diff(dayjs()) < 1;

            //debug
            console.log("isTokenExpired ->", isTokenExpired);
            console.log(
                "dayjs.unix(decodedUser.exp):",
                dayjs.unix(decodedUser.exp)
            );
            console.log("dayjs():", dayjs());
            console.log(
                "diff of dayjs -->",
                dayjs.unix(decodedUser.exp).diff(dayjs())
            );

            // Update Auth context
            if (!isTokenExpired) {
                const authUser = {
                    email: decodedUser["sub"],
                    role: decodedUser["role"],
                    token: token,
                };
                dispatch({ type: "LOGIN", payload: authUser });
            } else {
                localStorage.removeItem("token");
                dispatch({ type: "LOGOUT" });
            }
        }
    }, []); // onload only

    //debug
    console.log("AuthContext AFTER useeffect(): ", JSON.stringify(state));

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
