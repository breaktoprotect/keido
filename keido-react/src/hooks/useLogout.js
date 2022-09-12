import { useState } from "react";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { dispatch } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logout = () => {
        //TODO
        if (localStorage.getItem("token") !== null) {
            localStorage.removeItem("token");
            setIsLoggedOut(true);
            // Logout action
            dispatch({ type: "LOGOUT" });
        }
    };

    return { logout, isLoggedOut };
};
