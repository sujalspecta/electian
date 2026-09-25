import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import "./style.scss";

const LoginPage = () => {
  const push = useNavigate();

  const [value, setValue] = useState({
    email: "user@gmail.com",
    password: "123456",
    remember: false,
  });

  const [validator] = useState(
    new SimpleReactValidator({ className: "errorMessage" })
  );

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const rememberHandler = () => {
    setValue({ ...value, remember: !value.remember });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      validator.hideMessages();

      const userRegex = /^user+.*/gm;
      if (value.email.match(userRegex)) {
        toast.success("Successfully Login on Electian !");
        push("/home");
      }
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };

  return (
    <div className="loginWrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          {/* LOGIN BOX */}
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 loginForm">
            <h2 className="text-center">Sign In</h2>
            <p className="text-center">Sign in to your account</p>

            <form onSubmit={submitForm}>
              <div className="row g-3">
                {/* EMAIL */}
                <div className="col-12 mb-3">
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
                    label="Password"
                    type="password"
                    name="password"
                    value={value.password}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                  />
                  {validator.message(
                    "password",
                    value.password,
                    "required"
                  )}
                </div>

                {/* ACTIONS */}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center formAction">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value.remember}
                          onChange={rememberHandler}
                        />
                      }
                      label="Remember Me"
                    />
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>

                  <div className="formFooter mt-3">
                    <Button fullWidth type="submit" className="cBtnTheme">
                      Login
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
                    Don't have an account?{" "}
                    <Link to="/register">Create free account</Link>
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

export default LoginPage;
