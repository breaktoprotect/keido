import { createContext, useReducer, useEffect, useMemo } from "react";
import jwt_decode from "jwt-decode";

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
        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            // Decode token
            const decodedUser = jwt_decode(token);

            // Update Auth context
            const authUser = {
                email: decodedUser["sub"],
                role: decodedUser["role"],
                token: token,
            };
            dispatch({ type: "LOGIN", payload: authUser });
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
