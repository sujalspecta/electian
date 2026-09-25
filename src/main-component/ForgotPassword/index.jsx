import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const changeHandler = (e) => {
        const { name, value: inputValue } = e.target;

        setValue((prev) => ({
            ...prev,
            [name]: inputValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!value.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
        ) {
            newErrors.email = 'Enter a valid email address';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please enter a valid email address!');
            return;
        }

        toast.success('Password reset link sent successfully!');

        setValue({
            email: '',
        });

        setErrors({
            email: '',
        });

        navigate('/login');
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Forgot Password</h2>

                <p>Reset your account password</p>

                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="E-mail"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="E-mail"
                                type="email"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                error={Boolean(errors.email)}
                                helperText={errors.email || ''}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Grid className="formFooter">
                                <Button
                                    fullWidth
                                    className="cBtn cBtnLarge cBtnTheme"
                                    type="submit"
                                >
                                    Resend Password
                                </Button>
                            </Grid>

                            <Grid className="loginWithSocial">
                                <Button className="facebook">
                                    <i className="fa fa-facebook"></i>
                                </Button>

                                <Button className="twitter">
                                    <i className="fa fa-twitter"></i>
                                </Button>

                                <Button className="linkedin">
                                    <i className="fa fa-linkedin"></i>
                                </Button>
                            </Grid>

                            <p className="noteHelp">
                                Already have an account?{' '}
                                <Link to="/login">
                                    Return to Sign In
                                </Link>
                            </p>
                        </Grid>
                    </Grid>
                </form>

                <div className="shape-img">
                    <i className="fi flaticon-honeycomb"></i>
                </div>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
