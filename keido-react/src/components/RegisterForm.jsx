import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Box,
    Typography,
    TextField,
    Paper,
} from "@mui/material";
import PasswordPolicy from "./common/passwordPolicy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApprovalIcon from "@mui/icons-material/Approval";
import { Password } from "@mui/icons-material";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        getValues,
    } = useForm();

    const { PASSWORD_MIN_LENGTH } = PasswordPolicy();

    // Check two password fields to if they are the same
    const isPasswordsMatch = () => {};

    const onSubmit = () => {};

    //debug only
    /*     const onErrors = () => {
        //debug
        console.log("registration form errors:", errors);
    }; */

    return (
        <>
            <Container maxWidth="xs">
                <Box m={2} sx={{ flewGrow: 1 }}>
                    <Paper>
                        <Box pt={4} px={4} textAlign="center">
                            <CalendarMonthIcon
                                color="primary"
                                fontSize="large"
                            />
                            <Typography variant="h5">
                                Create a Keido account
                            </Typography>
                            <Typography color="subtle.main" variant="subtitle2">
                                Already have an account?
                                <Link to="/login">Sign in here</Link>
                            </Typography>
                        </Box>

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
                                        type="password"
                                        helperText={
                                            errors?.setPassword
                                                ? errors?.setPassword.message
                                                : null
                                        }
                                        error={
                                            errors?.setPassword ? true : false
                                        }
                                        variant="outlined"
                                        label="Set Password"
                                        {...register("setPassword", {
                                            required: "Required",
                                            minLength: PASSWORD_MIN_LENGTH,
                                        })}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        helperText={
                                            errors?.confirmPassword
                                                ? errors?.confirmPassword
                                                      .message
                                                : null
                                        }
                                        error={
                                            errors?.confirmPassword
                                                ? true
                                                : false
                                        }
                                        variant="outlined"
                                        label="Confirm Password"
                                        {...register("confirmPassword", {
                                            required: "Required",
                                            minLength: PASSWORD_MIN_LENGTH,
                                            validate: (value) =>
                                                value ===
                                                    getValues("setPassword") ||
                                                "Passwords must match!",
                                        })}
                                    />
                                </Box>

                                <Box mb={2} align="center">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        /* disabled={isLoading} */
                                    >
                                        Register
                                    </Button>
                                </Box>
                                <Box mb={2} pt={2}>
                                    <Typography
                                        variant="subtitle2"
                                        color="subtle.main"
                                        sx={{ fontStyle: "oblique" }}
                                    >
                                        <ApprovalIcon fontSize="small" />
                                        Please note that after registration, you
                                        will still need wait for a manager to
                                        approve your account.
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default RegisterForm;
