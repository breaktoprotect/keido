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

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const onSubmit = (data, e) => {
        console.log("Login button clicked! Data and e:", data, e);
        console.log("errors object:", errors);
    };

    //debug only
    const onError = (err) => {
        console.log("onError err->", err);
        console.log("errors object:", errors);
    };

    return (
        <>
            <GlobalStyles styles={{ body: { backgroundColor: "grey" } }} />
            <Container maxWidth="xs">
                <Box mb={8}></Box>
                <Paper>
                    <Box p={4} variant="elevation" elevation={24}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <CssBaseline />
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    helperText={
                                        errors?.emailAddress
                                            ? "Requires a valid email"
                                            : null
                                    }
                                    error={errors?.emailAddress ? true : false}
                                    variant="outlined"
                                    label="Email"
                                    {...register("emailAddress", {
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
                                        minLength: 12,
                                        pattern: {},
                                    })}
                                />
                            </Box>
                            <Box mb={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
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
