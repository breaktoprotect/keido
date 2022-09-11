import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
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
