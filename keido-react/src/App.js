//import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import DayCalendar from "./components/dayCalendar";
import { getScheduledItems } from "./mockServices/schedule";

class App extends Component {
    state = { scheduledItems: getScheduledItems() };

    render() {
        return (
            <main className="container">
                <br />
                <DayCalendar
                    scheduledItems={this.state.scheduledItems}
                    displayStartDate={new Date(2022, 8 - 1, 15)}
                    displayEndDate={new Date(2022, 8 - 1, 27)}
                />
            </main>
        );
    }
}

export default App;
