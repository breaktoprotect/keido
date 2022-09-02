import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data, e) => {
        console.log("Login button clicked! Data and e:", data, e);
    };

    const onError = (err) => {
        console.log("onError err->", err);
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
                    placeholder="valid_email@domain.com"
                    {...register("emailAddress")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordField" className="form-label">
                    Password
                </label>
                <input
                    className="form-control"
                    type="password"
                    {...register("password")}
                />
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
