//import logo from "./logo.svg";
import "./App.css";
import DayCalendar from "./components/dayCalendar";

function App() {
    return (
        <div className="App">
            <DayCalendar
                displayStartDate={new Date(2022, 8, 1)}
                displayEndDate={new Date(2022, 9, 1)}
            />
        </div>
    );
}

export default App;
