import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    //debug
    console.log("Triggered requireAuth. user ->", user);

    return user?.role ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
