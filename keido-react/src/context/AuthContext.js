import { createContext, useReducer, useEffect } from "react";
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
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
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
    console.log("AuthContext state: ", JSON.stringify(state));

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
