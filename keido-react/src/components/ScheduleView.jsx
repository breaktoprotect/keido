import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function ScheduleView() {
    const Consultants = ["Alan", "Brad", "Charlene"];

    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const Schedule = [
        {
            id: 1,
            person: "Alan Au",
            tasks: [
                { type: "work", effort: 5 },
                { type: "free", effort: 2 },
            ],
        },
        {
            id: 2,
            person: "Bob Bennington",
            tasks: [
                { type: "work", effort: 2 },
                { type: "free", effort: 1 },
                { type: "task", effort: 2 },
                { type: "free", effort: 2 },
            ],
        },
        {
            id: 3,
            person: "Nooba Nelly",
            tasks: [
                { type: "training", effort: 5 },
                { type: "free", effort: 2 },
            ],
        },
        {
            id: 4,
            person: "Zack Zimmermann",
            tasks: [
                { type: "free", effort: 2 },
                { type: "work", effort: 1 },
                { type: "task", effort: 2 },
                { type: "free", effort: 2 },
            ],
        },
    ];

    const getTaskColor = (taskType) => {
        if (taskType === "work") return "info";
        if (taskType === "free") return "grey";
        if (taskType === "training") return "success";
        if (taskType === "task") return "warning";
        return "";
    };

    return (
        <Box sx={{ flexGrow: 1, m: 2 }} color="secondary">
            {/*Days of the week*/}
            <Grid container spacing={0.5} columns="8">
                <Grid xs={1}></Grid>
                {daysOfTheWeek.map((day) => (
                    <Grid xs={1}>
                        <Typography variant="h6" align="center">
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            {/* */}
            <Grid container spacing={0.5} columns="8">
                {Schedule.map((sched) => (
                    <>
                        <Grid xs={1} key={sched.id}>
                            <Button variant="plain" fullWidth color="grey">
                                {sched.person}
                            </Button>
                        </Grid>
                        {sched.tasks.map((task) => (
                            <Grid xs={task.effort}>
                                <Button
                                    color={getTaskColor(task.type)}
                                    variant="contained"
                                    fullWidth
                                    style={{}}
                                >
                                    {task.type}
                                </Button>
                            </Grid>
                        ))}
                    </>
                ))}
            </Grid>
            {/* <Grid container spacing={0.5} columns="7">
                <Grid xs={5}>
                    <Button variant="contained" fullWidth>
                        PRJ-2022-1
                    </Button>
                </Grid>
                <Grid xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid> */}
        </Box>
    );
}
