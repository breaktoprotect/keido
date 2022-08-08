//import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import DayCalendar from "./components/dayCalendar";
import { getScheduledItems } from "./mockServices/schedule";

class App extends Component {
    state = { scheduledItems: getScheduledItems() };

    render() {
        return (
            <div className="App Container">
                <DayCalendar
                    scheduledItems={this.state.scheduledItems}
                    displayStartDate={new Date(2022, 8 - 1, 15)}
                    displayEndDate={new Date(2022, 8 - 1, 27)}
                />
            </div>
        );
    }
}

export default App;
