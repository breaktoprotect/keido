//import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import DayCalendar from "./components/_dayCalendar";
import { getScheduledItems } from "./mockServices/schedule";
import NavBar from "./components/NavBar";
import CreateTask from "./components/createTask";
import ErrorPage from "./components/errorPage";
import LoginForm from "./components/LoginForm";
import ScheduleView from "./components/ScheduleView";

import {
    themeProvider,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
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
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
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
