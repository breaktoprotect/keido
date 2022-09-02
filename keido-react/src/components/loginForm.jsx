import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log("Login button clicked! Data:", data);
    };

    return (
        <div className="form-group">
            <div className="mb-3">
                <label htmlFor="emailAddressField" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    placeholder="email@domain.com"
                    className="form-control"
                    id="emailAddressField"
                    aria-describedby="emailHelp"
                    /* ref={register} */
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordField" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordField"
                    aria-describedby="passwordField"
                    /* ref={register} */
                />
            </div>
            <div className="mb-3">
                <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary"
                    type="submit"
                >
                    Log me in!
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
