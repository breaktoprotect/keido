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
        console.log("consultantsTasks obj:", consultantsTasks);

        //debug 1 consultant
        const aConsultant = Object.keys(consultantsTasks)[0];
        const aTasks = consultantsTasks[aConsultant];

        //debug
        console.log("aConsultant:", aConsultant);
        console.log("aTasks:", aTasks);
        this.populateSchedule(consultantsTasks, days);

        // Staging to map all consultants and tasks
        const consultants = Object.keys(consultantsTasks);

        return (
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <center>{format(days[0], "yyyy")}</center>
                            </th>
                            {days.map((day) => (
                                <th key={day} scope="col">
                                    <center>{format(day, "dd/MM")}</center>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {consultants.map((consultant) => {
                            return this.populateRow(
                                consultant,
                                consultantsTasks[consultant],
                                days
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    // Convert to neat list of consultant and their correspond array of {day:project} keypair values
    /*
    john -> [ project1, project2]
    chris -> [project2, project4]
    */
    getConsultantsTasks(scheduledItems) {
        var consultantsTasks = {};
        scheduledItems.map((item) => {
            item.consultants.map((consultant) => {
                if (consultantsTasks[consultant] === undefined) {
                    consultantsTasks[consultant] = [
                        {
                            projectID: item.id,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            type: item.type,
                        },
                    ];
                } else {
                    consultantsTasks[consultant] = [
                        ...consultantsTasks[consultant],
                        {
                            projectID: item.id,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            type: item.type,
                        },
                    ];
                }
            });
        });

        return consultantsTasks;
    }

    populateSchedule(consultantsTasks, days) {
        const consultants = Object.keys(consultantsTasks);

        //debug
        console.warn("consultants:", consultants);
        console.warn("one consultant:", consultants[0]);
        console.warn(
            "one consultant's tasks:",
            consultantsTasks[consultants[0]]
        );

        //consultants.map((index, consultant) => ())

        /*             console.log(
                "single consultant's tasks:",
                consultantsTasks[consultant]
            ); */

        //this.populateRow(consultant[index], consultantsTasks[consultant[index]], days)
    }

    // Populate a single consultant across the selected date range (days)
    populateRow(consultant, tasks, days) {
        //debug
        console.log("tasks", tasks);

        //pre-process
        let columnSlots = [];
        let dayTask = [];

        days.map((day) => {
            dayTask = []; //Reset
            tasks.map((task) => {
                let curtask = this.addToCal(day, task);
                if (curtask !== undefined) {
                    if (dayTask !== []) {
                        dayTask = [...dayTask, this.addToCal(day, task)];
                    } else {
                        dayTask = [this.addToCal(day, task)];
                    }
                }
            });
            columnSlots = [...columnSlots, dayTask];
        });

        //debug
        console.log("columnSlots:", columnSlots);

        return (
            <tr key={consultant}>
                <th>{consultant}</th>
                {columnSlots.map((slot) => (
                    <td className="col-md-1">
                        {slot.map((task) => (
                            <span className={this.getBadgeClasses(task)}>
                                {task.projectID}
                            </span>
                        ))}
                    </td>
                ))}
            </tr>
        );
    }

    getBadgeClasses(task) {
        let badgeClasses = "badge rounded-pill ";
        if (task.type === "billable") badgeClasses += "bg-primary";
        else if (task.type === "research") badgeClasses += "bg-info";
        else if (task.type === "training") badgeClasses += "bg-success";
        else badgeClasses += "bg-secondary";

        return badgeClasses;
    }

    // Add project to the calendar if the day (cell) falls within the range of the project
    addToCal(day, project) {
        if (
            isWithinInterval(day, {
                start: this.convertToDateObject(project.startDate),
                end: this.convertToDateObject(project.endDate),
            })
        ) {
            return project;
        } else {
            return;
        }
    }

    // Helper function to convert "20-09-2022" to a Date() object
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
