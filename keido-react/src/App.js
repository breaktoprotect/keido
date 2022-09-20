//import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/_NavBar";
import TopNavBar from "./components/TopNavBar";
import AddTask from "./components/AddTask";
import ErrorPage from "./components/ErrorPage";
import ManageUsers from "./components/ManageUsers";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import ScheduleView from "./components/ScheduleView";
import RequireAuth from "./components/RequireAuth";

import { getScheduledItems } from "./mockServices/schedule";

import {
    themeProvider,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    background:
                        "linear-gradient(45deg, #3E4756 30%, #A2ACBD 90%)",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#1769AA",
        },
        secondary: {
            main: "#4B5DC0",
        },
        info: {
            main: "#B53466",
        },
        subtle: {
            main: "#A2ACBD",
        },
        pale: {
            main: "#F1F1E6",
        },
        background: {
            default: "#F0FAFF",
        },
        //Calendar
        work: {
            main: "#89C2FF",
        },
        task: {
            main: "#EC8768",
        },
        training: {
            main: "#00B8A2",
        },
    },
});

function App() {
    /* const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            const jwt = localStorage.getItem("token");
            setUser(jwtDecode(jwt));

            //debug
            //console.log("decoded_jwt:", decoded_jwt);
            console.log("user (state):", user);
        }

        return () => {};
    }, []); */

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="container">
                <TopNavBar />
                <div className="content">
                    <Routes>
                        {/* Unauthenticated Pages */}
                        {/* <Route path="/" exact element={<ScheduleView />} /> */}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />

                        {/* Authenticated Pages */}
                        <Route element={<RequireAuth />}>
                            <Route path="/" exact element={<ScheduleView />} />
                            <Route path="/addTask" element={<AddTask />} />
                            <Route
                                path="/manageUsers"
                                element={<ManageUsers />}
                            />
                            <Route path="/logout" element={<Logout />} />
                        </Route>

                        {/* No route -> Error message */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default App;
