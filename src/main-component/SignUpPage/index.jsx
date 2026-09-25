import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./style.scss";

const SignUpPage = () => {
  const push = useNavigate();

  const [value, setValue] = useState({
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  });

  const [validator] = useState(
    new SimpleReactValidator({ className: "errorMessage" })
  );

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      validator.hideMessages();
      toast.success("Registration Complete successfully!");
      push("/login");
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };

  return (
    <div className="loginWrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          {/* SIGNUP BOX */}
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 loginForm">
            <h2 className="text-center">Signup</h2>
            <p className="text-center">Signup your account</p>

            <form onSubmit={submitForm}>
              <div className="row g-3">
                {/* FULL NAME */}
                <div className="col-12">
                  <TextField
                    fullWidth
                    label="Name"
                    name="full_name"
                    value={value.full_name}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                  />
                  {validator.message(
                    "full name",
                    value.full_name,
                    "required|alpha"
                  )}
                </div>

                {/* EMAIL */}
                <div className="col-12">
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={value.email}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                  />
                  {validator.message("email", value.email, "required|email")}
                </div>

                {/* PASSWORD */}
                <div className="col-12">
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={value.password}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                  />
                  {validator.message("password", value.password, "required")}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="col-12">
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    name="confirm_password"
                    value={value.confirm_password}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                  />
                  {validator.message(
                    "confirm password",
                    value.confirm_password,
                    `required|in:${value.password}`
                  )}
                </div>

                {/* ACTIONS */}
                <div className="col-12">
                  <div className="formFooter">
                    <Button
                      fullWidth
                      className="cBtn cBtnLarge cBtnTheme"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>

                  <div className="loginWithSocial text-center mt-3">
                    <Button className="facebook me-2">
                      <i className="fa fa-facebook" />
                    </Button>
                    <Button className="twitter me-2">
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button className="linkedin">
                      <i className="fa fa-linkedin" />
                    </Button>
                  </div>

                  <p className="noteHelp text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login">Return to Sign In</Link>
                  </p>
                </div>
              </div>
            </form>

            <div className="shape-img">
              <i className="fi flaticon-honeycomb"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
