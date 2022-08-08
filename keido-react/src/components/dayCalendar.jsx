import React, { Component } from "react";
import { getScheduledItems } from "../mockServices/schedule";
import { format } from "date-fns";

class DayCalendar extends Component {
    state = { scheduleItems: getScheduledItems() };
    render() {
        const { displayStartDate, displayEndDate } = this.props;

        return (
            <React.Fragment>
                <table className="table table-dark">
                    <tr>{}</tr>
                </table>
            </React.Fragment>
        );
    }

    populateDays(startDate, endDate) {}
}

export default DayCalendar;
