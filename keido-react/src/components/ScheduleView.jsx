import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import axiosReq from "./common/axiosCustom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const SCHEDULE_DATA_URL = "/schedule/list";

export default function ScheduleView() {
    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [schedule, setSchedule] = useState(null);
    const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);

    useEffect(() => {
        const getSchedule = async () => {
            const { data: response } = await axiosReq.get(SCHEDULE_DATA_URL); // test only
            setSchedule(response);
            setIsScheduleLoaded(true);
        };
        getSchedule();

        console.log("schedule --> ", schedule);
    }, []);

    const getTaskColor = (taskType) => {
        if (taskType === "work") return "work";
        if (taskType === "free") return "pale";
        if (taskType === "training") return "training";
        if (taskType === "task") return "task";
        return "";
    };

    return (
        <Box sx={{ flexGrow: 1, m: 2 }} color="secondary">
            <Paper>
                <Box m={2}>
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
                        {isScheduleLoaded &&
                            schedule.map((sched) => (
                                <>
                                    <Grid xs={1} key={sched.id}>
                                        <Button
                                            variant="plain"
                                            fullWidth
                                            color="grey"
                                        >
                                            {sched.person}
                                        </Button>
                                    </Grid>
                                    {sched.tasks.map((task) => (
                                        <Grid xs={task.effort} my={0.5}>
                                            <Button
                                                color={getTaskColor(task.type)}
                                                variant="contained"
                                                fullWidth
                                                style={{}}
                                                size="small"
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
            </Paper>
        </Box>
    );
}
