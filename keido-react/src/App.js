//import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import DayCalendar from "./components/obsoleted/_dayCalendar";
import { getScheduledItems } from "./mockServices/schedule";
import NavBar from "./components/NavBar";
import CreateTask from "./components/CreateTask";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import ScheduleView from "./components/ScheduleView";

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
                            <Route path="/" exact element={<ScheduleView />} />
                            <Route
                                path="/createTask"
                                element={<CreateTask />}
                            />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default App;
