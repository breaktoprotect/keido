import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Paper,
    Container,
    Box,
    TextField,
    Button,
    CssBaseline,
    GlobalStyles,
} from "@mui/material";
import axios from "axios";

const LOGIN_URI = process.env.REACT_APP_ENDPOINT + "/user/login";
const PASSWORD_MIN_LENGTH = 5;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const onSubmit = async (data, e) => {
        //debug
        console.log("Login button clicked! Data and e:", data, e);
        console.log("errors object:", errors);

        // POST to server
        const { data: post } = await axios.post(LOGIN_URI, data);

        console.log("post:", post);
    };

    //debug only
    const onError = (err) => {
        console.log("onError err->", err);
        console.log("errors object:", errors);

        //debug
        console.warn("process.env:", process.env);
    };

    return (
        <>
            <Container maxWidth="xs">
                <Box mb={8}></Box>
                <Paper>
                    <Box p={4} variant="elevation" elevation={24}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    helperText={
                                        errors?.email
                                            ? "Requires a valid email"
                                            : null
                                    }
                                    error={errors?.email ? true : false}
                                    variant="outlined"
                                    label="Email"
                                    {...register("email", {
                                        required: "Required",
                                        pattern:
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    })}
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    helperText={
                                        errors?.password
                                            ? "Needs to be at least 12 characters"
                                            : null
                                    }
                                    error={errors?.password ? true : false}
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: PASSWORD_MIN_LENGTH,
                                        pattern: {},
                                    })}
                                />
                            </Box>
                            <Box mb={2}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                >
                                    Log me in!
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default LoginForm;
