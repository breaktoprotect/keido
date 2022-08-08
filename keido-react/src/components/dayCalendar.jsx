import React, { Component } from "react";
import { getScheduledItems } from "../mockServices/schedule";
import { eachDayOfInterval, format } from "date-fns";
import { getScheduledItems } from "./../mockServices/schedule";

class DayCalendar extends Component {
    state = { scheduleItems: getScheduledItems() };
    render() {
        const { displayStartDate, displayEndDate } = this.props;

        // Get number of days based on range
        const days = eachDayOfInterval({
            start: displayStartDate,
            end: displayEndDate,
        });

        return (
            <React.Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            {days.map((day) => (
                                <th key={day} scope="col">
                                    {format(day, "dd-MM-yyyy")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{this.populateSchedule()}</tbody>
                </table>
            </React.Fragment>
        );
    }

    populateSchedule() {
        getScheduledItems;
    }
}

export default DayCalendar;
