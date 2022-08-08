//import logo from "./logo.svg";
import "./App.css";
import DayCalendar from "./components/dayCalendar";

function App() {
    return (
        <div className="App Container">
            <DayCalendar
                displayStartDate={new Date(2022, 8, 1)}
                displayEndDate={new Date(2022, 8, 12)}
            />
        </div>
    );
}

export default App;
