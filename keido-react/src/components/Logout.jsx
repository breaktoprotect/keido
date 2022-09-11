import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Alert } from "@mui/material";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
    const navigate = useNavigate();
    const { logout, isLoggedOut } = useLogout();

    useEffect(() => {
        logout();

        setTimeout(() => {
            navigate("/login");
        }, 3000);
    }, []); // onload only

    /* useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            localStorage.removeItem("token");
            setLoggedOut(true);

            //TODO
            // Send HTTP request to server to log out on server side
        }
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    }, []); */

    return (
        <Box m={4}>
            <Paper sx={{ width: "50%" }}>
                <Box>
                    {/* <Typography>You have successfully logged out!</Typography> */}
                    {isLoggedOut ? (
                        <Alert severity="info" color="primary">
                            You have successfully logged out! Redirecting to
                            login page in 3 seconds...
                        </Alert>
                    ) : (
                        <Alert severity="warning">
                            You are not logged in. Redirecting to login page in
                            3 seconds...
                        </Alert>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Logout;
