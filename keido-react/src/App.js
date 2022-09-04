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

function App() {
    return (
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
                        <Route path="/createTask" element={<CreateTask />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </main>
    );
}

export default App;
