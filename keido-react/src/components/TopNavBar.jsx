import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
    AppBar,
    Box,
    Toolbar,
    SvgIcon,
    Menu,
    MenuItem,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import keidoLogo from "../images/logo-text-transparent.svg";

// Style
const logoStyle = {
    mr: 3,
    display: { xs: "none", md: "flex" },
    fontFamily: "comic sans ms",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
};

//* Defining pages
const userPages = [
    {
        pageName: "Dashboard",
        pageLink: "/dashboard",
    },
];
const managerPages = [
    {
        pageName: "Add Task",
        pageLink: "/addTask",
    },
];
const adminPages = [
    {
        pageName: "Manage Users",
        pageLink: "/manageUsers",
    },
];

const loginPage = {
    pageName: "Login",
    pageLink: "/login",
};
const logoutPage = {
    pageName: "Logout",
    pageLink: "/logout",
};

const displayPageLink = (pageArray) => {
    return pageArray.map((page) => (
        <Typography
            variant="button"
            component={Link}
            to={page.pageLink}
            key={page.pageName}
            sx={{
                /* my: 2, */
                color: "white",
                display: "block",
                textDecoration: "none",
                mx: 2,
            }}
        >
            {page.pageName}
        </Typography>
    ));
};

const TopNavBar = () => {
    const { user } = useAuth();
    //debug
    console.log("TopNavBar useAuth() user -->", user);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <CalendarMonthIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={logoStyle}
                    >
                        Keido
                    </Typography>
                    {/* <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        News
                    </Typography> */}
                    {/* Standard user Pages */}
                    {user?.role && displayPageLink(userPages)}

                    {/* Manager's Pages */}
                    {user?.role.includes("manager") &&
                        displayPageLink(managerPages)}

                    {/* Administrator's Pages */}
                    {user?.role.includes("admin") &&
                        displayPageLink(adminPages)}

                    {/* Buffer Space  */}
                    <Typography sx={{ flexGrow: 1 }}></Typography>

                    {/* Login & Logout */}
                    {user?.role ? (
                        <Link
                            to={logoutPage.pageLink}
                            style={{ textDecoration: "none" }}
                        >
                            <LogoutIcon
                                sx={{
                                    /* my: 2, */
                                    color: "white",
                                    display: "block",
                                }}
                            />
                        </Link>
                    ) : (
                        <Link
                            to={loginPage.pageLink}
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    /* my: 2, */
                                    color: "white",
                                    display: "block",
                                }}
                                endIcon={<LoginIcon />}
                            >
                                {loginPage.pageName}
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopNavBar;
