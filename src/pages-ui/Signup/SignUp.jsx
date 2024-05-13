import React, { useEffect, useState } from "react";
import "./SignUp.css";
import Box from "@mui/material/Box";
import { useRouter,useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SweetAlert from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { signup, initSignup } from "../../store/main";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const guest = queryParams.get("guest");
  const { waiting, success, message } = useSelector(
    (state) => state.main.signup
  );
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    isGuest: false,
  });
  useEffect(() => {
    if (guest !== null) setUser({ ...user, isGuest: true });
  }, [guest, user]);

  useEffect(() => {
    console.log("searchParams",searchParams.toString() );
    if (searchParams.toString() === "?tutor") {
      setUser({ ...user, isGuest: false })
    }
    if (searchParams.toString() === "?parent") {
      setUser({ ...user, isGuest: true })
    }
  }, [user,searchParams]);

  useEffect(() => {
    if (success > 0) {
      SweetAlert.fire({
        // position: 'top-end',
        imageUrl: "/assets/success-icon.png",
        imageHeight: "100px",
        title: "Thank you for your signup.",
        html: message || "You should receive an email for verification",
        width: 600,
        confirmButtonColor: "#0099FF",
        customClass: {
          icon: "no-before-icon",
        },
      });
      router.push("/signin" + searchParams.toString());
    }
    if (success < 0) {
      SweetAlert.fire({
        imageUrl: "/assets/error-icon.png",
        imageHeight: "100px",
        title: "Oops...",
        // text: 'Your message could not be sent!',
        text: message || "Can't connect with server. Please try again.",
        confirmButtonColor: "#0099FF",
      });
    }
    dispatch(initSignup());
  }, [success, router, dispatch, message, user.isGuest,searchParams]);

  const createUser = async (user) => {
    if (waiting) return;

    const showErrorAlert = (text) => {
      SweetAlert.fire({
        imageUrl: "/assets/error-icon.png",
        imageHeight: "100px",
        title: "Oops...",
        text: text,
        confirmButtonColor: "#0099FF",
      });
    };

    const { firstName, lastName, email, password } = user;

    if (firstName.trim().length <= 0) {
      showErrorAlert("Please enter your first name");
      return;
    }

    if (lastName.trim().length <= 0) {
      showErrorAlert("Please enter your last name");
      return;
    }

    if (email.trim() === "") {
      showErrorAlert("Please enter your email");
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      showErrorAlert("Please enter a valid email address");
      return;
    }

    if (password === "") {
      showErrorAlert("Please enter a password");
      return;
    }

    if (password.length < 6) {
      showErrorAlert("Password should be at least 6 characters long");
      return;
    }

    dispatch(signup(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user);
  };

  return (
    <div className="sign-up-container">
      <div>
        <div>
          <h1 style={{ textAlign: "center", fontWeight:'bold' }} className='heading green'>
            Quick registration - only takes a few minutes!
          <p style={{ textTransform: "uppercase", marginTop: 5, letterSpacing: '0px', fontSize: '20px', textAlign: 'center', color: 'red' }}>Free to join!</p>
          </h1>
        </div>
        <div className="child-profile bd-grey">
          <div className="child-profile-container">
            <h1 style={{ textAlign: "center" }}>
              {
                (searchParams.toString() === "?parent" && user.isGuest) || (searchParams.toString() === "?tutor" && user.isGuest) ? "Parent sign up to find tutors" : (searchParams.toString() === "?tutor" && !user.isGuest) || (searchParams.toString() === "?parent" && !user.isGuest) ? "Tutors sign up to advertise" : "Join the Directory of Maths Tutors"
              }
            </h1>
            <Box
              component="form"
              className="box"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1, maxWidth: "100%" },
                "& .captcha": { m: 1, mt: 2 },
                "& .heading": { m: 1, textAlign: "center" },
              }}
              noValidate
            >
              <div className="form">
                <hr/>
                <br/>
                <div style={{ width: "100%" }} className="name-box">
                  <TextField
                    id="email-input"
                    className="name bd-blue"
                    label="First Name"
                    type="text"
                    value={user?.fullName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                  <TextField
                    id="email-input"
                    label="Last Name"
                    className="name"
                    type="text"
                    value={user?.fullName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </div>
                <div style={{ width: "100%" }} className="name-box">
                  <TextField
                    id="custom-css-outlined-input"
                    label="Email"
                    type="email"
                    style={{ flex: 1 }}
                    value={user?.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div style={{ width: "100%" }} className="name-box">
                  <TextField
                    id="custom-css-outlined-input"
                    label="Password"
                    type="password"
                    inputProps={{
                      form: {
                        autocomplete: 'off',
                      },
                    }}
                    style={{ flex: 1 }}
                    className="text-field"
                    value={user?.description}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div style={{ width: "100%" }} className="name-box">
                  <FormControl fullWidth style={{ margin: "8px" }}>
                    <InputLabel id="account-type-label">Account Type</InputLabel>
                    <Select
                      labelId="account-type-label"
                      id="account-type"
                      value={user.isGuest ? "guest" : "tutor"}
                      label="Account Type"
                      style={{ flex: 1 }}
                      onChange={(e) =>
                        setUser({ ...user, isGuest: e.target.value === "guest" })
                      }
                    >
                      <MenuItem value="tutor">Tutor</MenuItem>
                      <MenuItem value="guest">Parent/student</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <span
                  style={{ width: "100%", padding: "0.5rem" }}
                  className="name-box"
                >
                <LoadingButton
                  type="submit"
                  loading={waiting}
                  variant="contained"
                  size="large"
                  style={{ flex: 1 }}
                >
                  <span>Submit</span>
                </LoadingButton>
              </span>
                <p style={{
                  fontSize: "15px",
                  padding: "0.5rem",
                  textAlign: "center",
                  margin: "0",
                }}>
                  By clicking submit, you agree to our <Link target="_blank" href="/terms">Terms and
                  Conditions</Link> and <Link target="_blank" href="/cookies-policy">Cookies Policy</Link>
                </p>
                <p
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  Already have an account? &nbsp;
                  {/* <Link to={"/signin" + searchParams.toString()} className="blue">
                    Sign in
                  </Link> */}
                </p>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
