import React, {useEffect, useState} from 'react';
import './SignIn.css';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import SweetAlert from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { initLogin, login } from '../../store/main';
import { TextField } from '@mui/material';
import { useRouter,useSearchParams } from 'next/navigation'
import Link from 'next/link'
const SigninPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter()

  const queryParams = new URLSearchParams(searchParams);
  const isAuth = useSelector(state => !!state.main.userId)

  // Access individual query parameters by name
  const redirect = queryParams.get('redirect');
 
  const guest = queryParams.get('guest');

  const [user, setUser] = useState({
    email: '',
    password: '',
    isGuest: false
  });

  useEffect(() => {
    if(isAuth) router.push(redirect ?? '/')
  }, [isAuth, redirect, router])
  useEffect(() => {
    if (guest !== null) setUser({ ...user, isGuest: true });
  }, [guest, user]);

  const createUser = (user) => {
    if (waiting) return;

    const showErrorAlert = (text) => {
      SweetAlert.fire({
        imageUrl: '/assets/error-icon.png',
        imageHeight: '100px',
        title: 'Oops...',
        text: text,
        confirmButtonColor: '#0099FF',
      });
    };

    const { email, password } = user;

    if (email.trim() === '') {
      showErrorAlert('Please enter your email');
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      showErrorAlert('Please enter a valid email address');
      return;
    }

    if (password === '') {
      showErrorAlert('Please enter a password');
      return;
    }

    if (password.length < 6) {
      showErrorAlert('Password should be at least 6 characters long');
      return;
    }

    dispatch(login(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user);
  };

  const { waiting, success, message } = useSelector(state => state.main.login)

  useEffect(() => {
    if (success > 0) {
      router.push('/');
    }
    if (success < 0) {
      SweetAlert.fire({
        imageUrl:
          '/assets/error-icon.png',
        imageHeight: '100px',
        title: 'Oops...',
        // text: 'Your message could not be sent!',
        text: message || 'Can\'t connect with server. Please try again.',
        confirmButtonColor: '#0099FF',
      });
    }
    dispatch(initLogin());
  }, [success, router, dispatch, message])



  return (
    <div className='sign-up-container'>
      <div className="child-profile bd-grey">
        <div className="child-profile-container">
          <h1>Sign In</h1>
          <Box
            component="form"
            className="box"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
              '& .captcha': { m: 1, mt: 2 },
              '& .heading': { m: 1, textAlign: 'center' },
            }}
            noValidate
          >
            <div className="form">
              <hr />
              <br />
              <div style={{ width: '100%' }} className='name-box'>
                <TextField
                  id="email-input"
                  label="Email"
                  type="email"
                  style={{ flex: 1 }}
                  value={user?.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div style={{ width: '100%' }} className='name-box'>
                <TextField
                  id="password-input"
                  label="Password"
                  type='password'
                  style={{ flex: 1 }}
                  className="text-field"
                  value={user?.password}
                  inputProps={{
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              {/* <div style={{ width: "100%" }} className="name-box">
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
                    <MenuItem value="guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              <p style={{ width: '100%', padding: '0.5rem', textAlign: 'left', margin: '0' }}>
                <Link href="/forgot_password" className='blue link'> Forgot Password </Link>
              </p>
              <span style={{ width: '100%', padding: '0.5rem' }} className='name-box'>
                <LoadingButton
                  type='submit'
                  loading={waiting}
                  variant="contained"
                  size="large"
                  style={{ flex: 1 }}
                >
                  <span>Submit</span>
                </LoadingButton>
              </span>
              <p style={{ width: '100%', padding: '0.5rem', textAlign: 'center', margin: '0' }}>
                New user?  <Link href={"/signup" + searchParams.toString()} className='blue link'> Create an account </Link>
              </p>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
