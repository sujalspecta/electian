import React, { Fragment } from "react";
import Collapse from "@mui/material/Collapse";
import FontAwesome from "../UiStyle/FontAwesome";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import { totalPrice } from "../../utils";

import "./style.scss";

import visa from "../../images/icon/visa.png";
import mastercard from "../../images/icon/mastercard.png";
import skrill from "../../images/icon/skrill.png";
import paypal from "../../images/icon/paypal.png";

import CheckWrap from "../CheckWrap";

const cardType = [
  { title: "visa", img: visa },
  { title: "mastercard", img: mastercard },
  { title: "skrill", img: skrill },
  { title: "paypal", img: paypal },
];

const initialForms = {
  cupon_key: "",
  fname: "",
  lname: "",
  country: "",
  dristrict: "",
  address: "",
  post_code: "",
  email: "",
  phone: "",
  note: "",

  payment_method: "card",
  card_type: "",

  fname2: "",
  lname2: "",
  country2: "",
  dristrict2: "",
  address2: "",
  post_code2: "",
  email2: "",
  phone2: "",

  card_holder: "",
  card_number: "",
  cvv: "",
  expire_date: "",
};

const CheckoutSection = ({ cartList = [] }) => {
  const [tabs, setExpanded] = React.useState({
    cupon: false,
    billing_adress: false,
    payment: true,
  });

  const [forms, setForms] = React.useState(initialForms);
  const [errors, setErrors] = React.useState({});
  const [dif_ship, setDif_ship] = React.useState(false);

  const faqHandler = (name) => {
    setExpanded((prev) => ({
      cupon: false,
      billing_adress: false,
      payment: true,
      [name]: !prev[name],
    }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!forms.fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!forms.lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    if (!forms.country) {
      newErrors.country = "Country is required";
    }

    if (!forms.dristrict.trim()) {
      newErrors.dristrict = "District is required";
    }

    if (!forms.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!forms.post_code.trim()) {
      newErrors.post_code = "Post code is required";
    }

    if (!forms.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(forms.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!forms.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (dif_ship) {
      if (!forms.fname2.trim()) {
        newErrors.fname2 = "First name is required";
      }

      if (!forms.lname2.trim()) {
        newErrors.lname2 = "Last name is required";
      }

      if (!forms.country2) {
        newErrors.country2 = "Country is required";
      }

      if (!forms.dristrict2.trim()) {
        newErrors.dristrict2 = "District is required";
      }

      if (!forms.address2.trim()) {
        newErrors.address2 = "Address is required";
      }

      if (!forms.post_code2.trim()) {
        newErrors.post_code2 = "Post code is required";
      }

      if (!forms.email2.trim()) {
        newErrors.email2 = "Email is required";
      } else if (!validateEmail(forms.email2)) {
        newErrors.email2 = "Enter a valid email address";
      }

      if (!forms.phone2.trim()) {
        newErrors.phone2 = "Phone number is required";
      }
    }

    if (forms.payment_method === "card" && !forms.card_type) {
      newErrors.card_type = "Please select a card type";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setExpanded((prev) => ({
        ...prev,
        billing_adress: true,
        payment: true,
      }));

      return false;
    }

    return true;
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  };

  const fieldProps = (name) => ({
    error: Boolean(errors[name]),
    helperText: errors[name] || "",
    slotProps: {
      inputLabel: {
        shrink: true,
      },
    },
  });

  return (
    <Fragment>
      <div className="checkoutWrapper section-padding">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-7 col-12">
              <div className="check-form-area">
                <div className="cuponWrap checkoutCard">
                  <Button
                    className="collapseBtn"
                    fullWidth
                    onClick={() => faqHandler("cupon")}
                  >
                    Have a coupon ? Click here to enter your code.
                    <FontAwesome name={tabs.cupon ? "minus" : "plus"} />
                  </Button>

                  <Collapse in={tabs.cupon} timeout="auto" unmountOnExit>
                    <div className="chCardBody">
                      <p>If you have coupon code,please apply it</p>

                      <form className="cuponForm">
                        <TextField
                          fullWidth
                          type="text"
                          className="formInput radiusNone"
                          value={forms.cupon_key}
                          name="cupon_key"
                          onChange={changeHandler}
                          {...fieldProps("cupon_key")}
                        />

                        <Button className="cBtn cBtnBlack">Apply</Button>
                      </form>
                    </div>
                  </Collapse>
                </div>

                <div className="cuponWrap checkoutCard">
                  <Button
                    className="collapseBtn"
                    fullWidth
                    onClick={() => faqHandler("billing_adress")}
                  >
                    Billing Address
                    <FontAwesome
                      name={tabs.billing_adress ? "minus" : "plus"}
                    />
                  </Button>

                  <Collapse
                    in={tabs.billing_adress}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="chCardBody">
                      <form className="cuponForm" onSubmit={handleCheckout}>
                        <div className="row g-3">
                          <div className="col-sm-6 col-12">
                            <TextField
                              fullWidth
                              label="First Name"
                              name="fname"
                              value={forms.fname}
                              onChange={changeHandler}
                              type="text"
                              className="formInput radiusNone"
                              {...fieldProps("fname")}
                            />
                          </div>

                          <div className="col-sm-6 col-12">
                            <TextField
                              fullWidth
                              label="Last Name"
                              name="lname"
                              value={forms.lname}
                              onChange={changeHandler}
                              type="text"
                              className="formInput radiusNone"
                              {...fieldProps("lname")}
                            />
                          </div>

                          <div className="col-sm-6 col-12">
                            <FormControl
                              className="formSelect"
                              fullWidth
                              variant="filled"
                              error={Boolean(errors.country)}
                            >
                              <InputLabel id="country-label">
                                Country
                              </InputLabel>

                              <Select
                                labelId="country-label"
                                value={forms.country}
                                name="country"
                                onChange={changeHandler}
                              >
                                <MenuItem value="">
                                  <em>Select Country</em>
                                </MenuItem>
                                <MenuItem value="india">India</MenuItem>
                                <MenuItem value="usa">United States</MenuItem>
                                <MenuItem value="uk">United Kingdom</MenuItem>
                                <MenuItem value="canada">Canada</MenuItem>
                              </Select>

                              {errors.country && (
                                <span
                                  style={{
                                    color: "#d32f2f",
                                    fontSize: "0.75rem",
                                    margin: "3px 14px 0",
                                  }}
                                >
                                  {errors.country}
                                </span>
                              )}
                            </FormControl>
                          </div>

                          <div className="col-sm-6 col-12">
                            <TextField
                              fullWidth
                              label="District"
                              name="dristrict"
                              value={forms.dristrict}
                              onChange={changeHandler}
                              type="text"
                              className="formInput radiusNone"
                              {...fieldProps("dristrict")}
                            />
                          </div>

                          <div className="col-12">
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              label="Address"
                              name="address"
                              value={forms.address}
                              onChange={changeHandler}
                              className="formInput radiusNone"
                              {...fieldProps("address")}
                            />
                          </div>

                          <div className="col-sm-6 col-12">
                            <TextField
                              fullWidth
                              label="Post Code"
                              name="post_code"
                              value={forms.post_code}
                              onChange={changeHandler}
                              type="text"
                              className="formInput radiusNone"
                              {...fieldProps("post_code")}
                            />
                          </div>

                          <div className="col-sm-6 col-12">
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              value={forms.email}
                              onChange={changeHandler}
                              type="email"
                              className="formInput radiusNone"
                              {...fieldProps("email")}
                            />
                          </div>

                          <div className="col-12">
                            <TextField
                              fullWidth
                              label="Phone No"
                              name="phone"
                              value={forms.phone}
                              onChange={changeHandler}
                              type="tel"
                              className="formInput radiusNone"
                              {...fieldProps("phone")}
                            />
                          </div>

                          <div className="col-12">
                            <FormControlLabel
                              className="checkBox"
                              control={
                                <Checkbox
                                  checked={dif_ship}
                                  onChange={(e) =>
                                    setDif_ship(e.target.checked)
                                  }
                                  color="primary"
                                />
                              }
                              label="Ship to a different address?"
                            />
                          </div>

                          <div className="col-12">
                            <Collapse
                              in={dif_ship}
                              timeout="auto"
                              unmountOnExit
                            >
                              <div className="row g-3">
                                <div className="col-sm-6 col-12">
                                  <TextField
                                    fullWidth
                                    label="First Name"
                                    name="fname2"
                                    value={forms.fname2}
                                    onChange={changeHandler}
                                    type="text"
                                    className="formInput radiusNone"
                                    {...fieldProps("fname2")}
                                  />
                                </div>

                                <div className="col-sm-6 col-12">
                                  <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lname2"
                                    value={forms.lname2}
                                    onChange={changeHandler}
                                    type="text"
                                    className="formInput radiusNone"
                                    {...fieldProps("lname2")}
                                  />
                                </div>

                                <div className="col-sm-6 col-12">
                                  <FormControl
                                    className="formSelect"
                                    fullWidth
                                    variant="filled"
                                    error={Boolean(errors.country2)}
                                  >
                                    <InputLabel id="country2-label">
                                      Country
                                    </InputLabel>

                                    <Select
                                      labelId="country2-label"
                                      value={forms.country2}
                                      name="country2"
                                      onChange={changeHandler}
                                    >
                                      <MenuItem value="">
                                        <em>Select Country</em>
                                      </MenuItem>
                                      <MenuItem value="india">India</MenuItem>
                                      <MenuItem value="usa">
                                        United States
                                      </MenuItem>
                                      <MenuItem value="uk">
                                        United Kingdom
                                      </MenuItem>
                                      <MenuItem value="canada">Canada</MenuItem>
                                    </Select>

                                    {errors.country2 && (
                                      <span
                                        style={{
                                          color: "#d32f2f",
                                          fontSize: "0.75rem",
                                          margin: "3px 14px 0",
                                        }}
                                      >
                                        {errors.country2}
                                      </span>
                                    )}
                                  </FormControl>
                                </div>

                                <div className="col-sm-6 col-12">
                                  <TextField
                                    fullWidth
                                    label="District"
                                    name="dristrict2"
                                    value={forms.dristrict2}
                                    onChange={changeHandler}
                                    type="text"
                                    className="formInput radiusNone"
                                    {...fieldProps("dristrict2")}
                                  />
                                </div>

                                <div className="col-12">
                                  <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Address"
                                    name="address2"
                                    value={forms.address2}
                                    onChange={changeHandler}
                                    className="formInput radiusNone"
                                    {...fieldProps("address2")}
                                  />
                                </div>

                                <div className="col-sm-6 col-12">
                                  <TextField
                                    fullWidth
                                    label="Post Code"
                                    name="post_code2"
                                    value={forms.post_code2}
                                    onChange={changeHandler}
                                    type="text"
                                    className="formInput radiusNone"
                                    {...fieldProps("post_code2")}
                                  />
                                </div>

                                <div className="col-sm-6 col-12">
                                  <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email2"
                                    value={forms.email2}
                                    onChange={changeHandler}
                                    type="email"
                                    className="formInput radiusNone"
                                    {...fieldProps("email2")}
                                  />
                                </div>

                                <div className="col-12">
                                  <TextField
                                    fullWidth
                                    label="Phone No"
                                    name="phone2"
                                    value={forms.phone2}
                                    onChange={changeHandler}
                                    type="tel"
                                    className="formInput radiusNone"
                                    {...fieldProps("phone2")}
                                  />
                                </div>
                              </div>
                            </Collapse>
                          </div>

                          <div className="col-12">
                            <TextField
                              fullWidth
                              multiline
                              label="Order Notes"
                              placeholder="Note about your order"
                              name="note"
                              value={forms.note}
                              onChange={changeHandler}
                              className="formInput radiusNone note"
                              {...fieldProps("note")}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </Collapse>
                </div>

                <div className="cuponWrap checkoutCard">
                  <Button
                    className="collapseBtn"
                    fullWidth
                    onClick={() => faqHandler("payment")}
                  >
                    Payment Method
                    <FontAwesome name={tabs.payment ? "minus" : "plus"} />
                  </Button>

                  <div className="chCardBody">
                    <Collapse in={tabs.payment} timeout="auto">
                      <RadioGroup
                        className="paymentMethod"
                        aria-label="Payment Method"
                        name="payment_method"
                        value={forms.payment_method}
                        onChange={changeHandler}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio color="primary" />}
                          label="Payment By Card"
                        />

                        <FormControlLabel
                          value="cash"
                          control={<Radio color="primary" />}
                          label="Cash On Delivery"
                        />
                      </RadioGroup>

                      <Collapse
                        in={forms.payment_method === "card"}
                        timeout="auto"
                      >
                        <div className="cardType">
                          {cardType.map((item) => (
                            <div
                              key={item.title}
                              className={`cardItem ${
                                forms.card_type === item.title ? "active" : ""
                              }`}
                              onClick={() =>
                                setForms((prev) => ({
                                  ...prev,
                                  card_type: item.title,
                                }))
                              }
                            >
                              <img src={item.img} alt={item.title} />
                            </div>
                          ))}
                        </div>

                        {errors.card_type && (
                          <div
                            style={{
                              color: "#d32f2f",
                              fontSize: "0.75rem",
                              marginTop: "8px",
                            }}
                          >
                            {errors.card_type}
                          </div>
                        )}

                        <div>
                          <CheckWrap />
                        </div>

                        <Button
                          className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                          type="button"
                          onClick={handleCheckout}
                        >
                          Proceed to Checkout
                        </Button>
                      </Collapse>

                      <Collapse
                        in={forms.payment_method === "cash"}
                        timeout="auto"
                      >
                        <div className="cardType">
                          <Link
                            to="/order_received"
                            className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                            onClick={(e) => {
                              if (!validateForm()) {
                                e.preventDefault();
                              }
                            }}
                          >
                            Proceed to Checkout
                          </Link>
                        </div>
                      </Collapse>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="cartStatus">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="cartTotals">
                      <h4>Cart Total</h4>

                      <Table>
                        <TableBody>
                          {cartList.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                {item.title} ${item.price} x {item.qty}
                              </TableCell>

                              <TableCell align="right">
                                ${item.qty * item.price}
                              </TableCell>
                            </TableRow>
                          ))}

                          <TableRow className="totalProduct">
                            <TableCell>Total product</TableCell>

                            <TableCell align="right">
                              {cartList.length}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Sub Price</TableCell>

                            <TableCell align="right">
                              ${totalPrice(cartList)}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Total Price</TableCell>

                            <TableCell align="right">
                              ${totalPrice(cartList)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutSection;
