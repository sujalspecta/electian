import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CheckWrap = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        password: '123456',
        card_holder: 'Jhon Doe',
        card_number: '589622144',
        cvv: '856226',
        expire_date: '',
        remember: false,
    });

    const [errors, setErrors] = useState({});

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

        if (!value.card_holder.trim()) {
            newErrors.card_holder = 'Card holder name is required';
        }

        if (!value.card_number.trim()) {
            newErrors.card_number = 'Card number is required';
        } else if (!/^\d{9,19}$/.test(value.card_number)) {
            newErrors.card_number = 'Enter a valid card number';
        }

        if (!value.cvv.trim()) {
            newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3,4}$/.test(value.cvv)) {
            newErrors.cvv = 'CVV must be 3 or 4 digits';
        }

        if (!value.expire_date) {
            newErrors.expire_date = 'Expire date is required';
        } else {
            const selectedDate = new Date(value.expire_date);
            const today = new Date();

            selectedDate.setHours(23, 59, 59, 999);

            if (selectedDate < today) {
                newErrors.expire_date = 'Card has expired';
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill all required fields correctly.');
            return;
        }

        const userRegex = /^user+.*/gm;
        const email = value.email;

        if (email.match(userRegex)) {
            toast.success('Order Received successfully!');

            setValue({
                email: '',
                password: '',
                card_holder: '',
                card_number: '',
                cvv: '',
                expire_date: '',
                remember: false,
            });

            setErrors({});

            navigate('/order_received');
        } else {
            toast.info('User does not exist!');
            alert(
                'User does not exist! credential is : user@*****.com | vendor@*****.com | admin@*****.com'
            );
        }
    };

    return (
        <div className="cardbp mt-20">
            <div>
                <form onSubmit={submitForm}>
                    <div className="row g-3">
                        <div className="col-sm-6 col-12">
                            <TextField
                                fullWidth
                                label="Card holder Name"
                                name="card_holder"
                                value={value.card_holder}
                                onChange={changeHandler}
                                type="text"
                                error={Boolean(errors.card_holder)}
                                helperText={errors.card_holder || ''}
                                className="formInput radiusNone"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </div>

                        <div className="col-sm-6 col-12">
                            <TextField
                                fullWidth
                                label="Card Number"
                                name="card_number"
                                value={value.card_number}
                                onChange={changeHandler}
                                type="text"
                                error={Boolean(errors.card_number)}
                                helperText={errors.card_number || ''}
                                className="formInput radiusNone"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </div>

                        <div className="col-sm-6 col-12">
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={value.cvv}
                                onChange={changeHandler}
                                type="text"
                                error={Boolean(errors.cvv)}
                                helperText={errors.cvv || ''}
                                className="formInput radiusNone"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </div>

                        <div className="col-sm-6 col-12">
                            <TextField
                                fullWidth
                                label="Expire Date"
                                name="expire_date"
                                value={value.expire_date}
                                onChange={changeHandler}
                                type="date"
                                error={Boolean(errors.expire_date)}
                                helperText={errors.expire_date || ''}
                                className="formInput radiusNone"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </div>

                        <div className="col-12">
                            <div className="formFooter mt-20">
                                <Button
                                    fullWidth
                                    className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                                    type="submit"
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckWrap;
