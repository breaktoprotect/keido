//import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import CreateTask from "./components/CreateTask";
import ErrorPage from "./components/ErrorPage";
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
                <NavBar />
                <div className="content">
                    {/* <DayCalendar
                    scheduledItems={getScheduledItems()}
                    displayStartDate={new Date(2022, 8 - 1, 15)}
                    displayEndDate={new Date(2022, 8 - 1, 27)}
                /> */}

                    <BrowserRouter>
                        <Routes>
                            {/* Unauthenticated Pages */}
                            {/* <Route path="/" exact element={<ScheduleView />} /> */}
                            <Route path="/login" element={<LoginForm />} />

                            {/* Authenticated Pages */}
                            <Route element={<RequireAuth />}>
                                <Route
                                    path="/"
                                    exact
                                    element={<ScheduleView />}
                                />
                                <Route
                                    path="/createTask"
                                    element={<CreateTask />}
                                />
                                <Route path="/logout" element={<Logout />} />
                            </Route>

                            {/* No route -> Error message */}
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default App;
