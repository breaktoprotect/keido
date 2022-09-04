import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // CSS classes
    const errorClasses = "m-1 fw-light text-danger";

    const onSubmit = (data, e) => {
        console.log("Login button clicked! Data and e:", data, e);
        console.log("errors object:", errors);
    };

    const onError = (err) => {
        console.log("onError err->", err);
        console.log("errors object:", errors);
    };

    return (
        <form
            className="form-group"
            id="loginFormID"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <div className="mb-3">
                <label htmlFor="emailAddressField" className="form-label">
                    Email address
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register("emailAddress", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                />
                {errors.emailAddress?.type === "pattern" && (
                    <div className={errorClasses}>
                        Valid email address required
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="passwordField" className="form-label">
                    Password
                </label>
                <input
                    className="form-control"
                    type="password"
                    {...register("password", {
                        required: true,
                        minLength: 12,
                        pattern: {},
                    })}
                />
                {errors.password?.type === "minLength" && (
                    <div className={errorClasses}>Minimum 12 characters.</div>
                )}
            </div>

            <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                    Log me in!
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
