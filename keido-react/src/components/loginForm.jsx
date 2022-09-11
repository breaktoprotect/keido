import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Paper,
    Container,
    Box,
    TextField,
    Button,
    Alert,
    GlobalStyles,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";

const PASSWORD_MIN_LENGTH = 5;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        control,
    } = useForm();
    const {
        login,
        errors: apiErrors,
        setErrors: setApiErrors,
        isLoading,
    } = useLogin();

    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
        await login(data);

        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };

    //TODO Need to figure out how to trigger this. Controller?
    const onChange = () => {
        setApiErrors(null);

        console.log("LoginForm -> onChange entered!");
    };

    //debug
    console.log("apiErrors:", apiErrors);
    console.log("errors:", errors);

    return (
        <>
            <Container maxWidth="xs">
                <Box mb={8}></Box>
                <Paper>
                    {apiErrors?.apiError && (
                        <Alert severity="error">
                            {apiErrors.apiError.message}
                        </Alert>
                    )}
                    <Box p={4} variant="elevation" elevation={24}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    helperText={
                                        errors?.email
                                            ? "Requires a valid email"
                                            : null
                                    }
                                    /* onChange={onChange} */
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
                                    /* disabled={isLoading} */
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
