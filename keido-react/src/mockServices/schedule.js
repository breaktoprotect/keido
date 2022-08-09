// This is a dummy data - eventually data will be fetched from database like MongoDB for example
/*  fields 
ProjectID 
- PRJ just a generic short form for Project
- Followed by a '-' then year of creation (not when the project is performed)
- Followed by a '-' then running number

date format
- day (2 digits) '-' month (2 digits) '-' year (4 digits)

*/
const scheduledItems = [
    {
        id: "PRJ-2022-1",
        startDate: "15-08-2022",
        endDate: "26-08-2022",
        type: "billable",
        consultants: ["Alfred Ang", "Barry Bennington"],
        description: "Web application testing of the ABC system",
        clientCodeName: "Django",
    },
    {
        id: "PRJ-2022-2",
        startDate: "15-08-2022",
        endDate: "19-08-2022",
        type: "billable",
        consultants: ["Charlene Chew"],
        description: "Annual pentest of XYZ system",
        clientCodeName: "Artichoke",
    },
    {
        id: "PRJ-2022-3",
        startDate: "29-08-2022",
        endDate: "09-09-2022",
        type: "billable",
        consultants: ["Alfred Ang"],
        description: "Mobile pentest of ABC system",
        clientCodeName: "Djano",
    },
    {
        id: "TSK-2022-2",
        startDate: "22-08-2022",
        endDate: "26-08-2022",
        type: "research",
        consultants: ["Barry Bennington"],
        description: "Research of the ethereum pentest",
        clientCodeName: "Internal",
    },
    {
        id: "TSK-2022-1",
        startDate: "01-08-2022",
        endDate: "03-08-2022",
        type: "improvement",
        consultants: ["Charlene Chew"],
        description: "Creation of on-boarding guide",
        clientCodeName: "Internal",
    },
    {
        id: "TSK-2022-3",
        startDate: "15-08-2022",
        endDate: "17-08-2022",
        type: "training",
        consultants: ["Darren Daniel"],
        description: "Cloud training with Unicorn Vendor",
        clientCodeName: "Internal",
    },
];

export function getScheduledItems() {
    return scheduledItems;
}
