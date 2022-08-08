import React, { Component } from "react";
import { eachDayOfInterval, format, isWithinInterval } from "date-fns";

class DayCalendar extends Component {
    render() {
        const { displayStartDate, displayEndDate, scheduledItems } = this.props;

        // Get number of days based on range
        const days = eachDayOfInterval({
            start: displayStartDate,
            end: displayEndDate,
        });

        // Map consultants to each project and start and end dates
        const consultantsTasks = this.getConsultantsTasks(scheduledItems);

        //debug
        console.log(consultantsTasks);

        //debug 1 consultant
        const aConsultant = Object.keys(consultantsTasks)[0];
        const aTasks = consultantsTasks[aConsultant];

        return (
            <React.Fragment>
                <table className="table table-bordered">
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
                    <tbody>{this.populateRow(aConsultant, aTasks, days)}</tbody>
                </table>
            </React.Fragment>
        );
    }

    getConsultantsTasks(scheduledItems) {
        // Neat list of consultant and their correspond array of {day:project} keypair values
        var consultantsTasks = {};
        scheduledItems.map((item) => {
            item.consultants.map((consultant) => {
                if (consultantsTasks[consultant] === undefined) {
                    consultantsTasks[consultant] = [
                        {
                            projectID: item.id,
                            startDate: item.startDate,
                            endDate: item.endDate,
                        },
                    ];
                } else {
                    consultantsTasks[consultant] = [
                        ...consultantsTasks[consultant],
                        {
                            projectID: item.id,
                            startDate: item.startDate,
                            endDate: item.endDate,
                        },
                    ];
                }
            });
        });

        return consultantsTasks;
    }

    populateSchedule(days, consultantsTasks) {
        days.map((day) => {
            Object.keys(consultantsTasks).map((person) => {
                consultantsTasks[person].map((project) => {
                    this.addToCal(day, project);
                });
            });
        });
    }

    populateRow(consultant, tasks, days) {
        //debug
        console.log("tasks", tasks);

        //pre-process
        let columnItems = [];
        days.map((day) => {
            tasks.map((task) => {
                columnItems = [...columnItems, this.addToCal(day, task)];
            });
        });

        //debug
        console.log("columnItems:", columnItems);

        return (
            <tr key={consultant}>
                <th>{consultant}</th>
                {columnItems.map((item) => (
                    <td>{item}</td>
                ))}
            </tr>
        );
    }

    addToCal(day, project) {
        if (
            isWithinInterval(day, {
                start: this.convertToDateObject(project.startDate),
                end: this.convertToDateObject(project.endDate),
            })
        ) {
            console.log(project.startDate, project.endDate, day, true);
            return project.projectID;
        } else {
            console.log(project.startDate, project.endDate, day, false);
            return null;
        }
    }

    convertToDateObject(dateString) {
        const dayMonthYearArray = dateString.split("-");
        return new Date(
            dayMonthYearArray[2],
            dayMonthYearArray[1] - 1, // Javascript counts month starting from 0
            dayMonthYearArray[0]
        );
    }
}

export default DayCalendar;
