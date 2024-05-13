import React, {useState} from 'react';
import './ForgotPassword.css';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link'
import SweetAlert from 'sweetalert2';
import CssTextField from '../../Components/CssTextField';
import { API_URL } from '../../api';
import axios from 'axios';
import { showErrorMessage } from '../../utils';
import { useRouter ,useSearchParams} from 'next/navigation'

const ForgotPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const queryParams = new URLSearchParams(searchParams);

  // Access individual query parameters by name
  const token = queryParams.get('token');

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [waiting, setWaiting] = useState(false)

  const handleSubmit = async (e) => {
    const showErrorAlert = (text) => {
      SweetAlert.fire({
        imageUrl: '/assets/error-icon.png',
        imageHeight: '100px',
        title: 'Oops...',
        text: text,
        confirmButtonColor: '#0099FF',
      });
    };
    e.preventDefault();
    if (waiting) return;
    if(token) {
      const { password } = user;

      if (password === '') {
        showErrorAlert('Please enter a password');
        return;
      }
  
      if (password.length < 6) {
        showErrorAlert('Password should be at least 6 characters long');
        return;
      }

      setWaiting(true)

      try {
        await axios.post(`${API_URL}/api/auth/forgot_password/confirm`, {password, token})
        SweetAlert.fire({
          // position: 'top-end',
          imageUrl: '/assets/success-icon.png',
          imageHeight: '100px',
          title: 'Your password have been reset successfully.',
          html: 'You can use new password',
          width: 600,
          confirmButtonColor: '#0099FF',
          customClass: {
            icon: 'no-before-icon',
          }
        });
        router.push('/signin')
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response?.data?.message || "Reset Process confirm failed, please try again!")
      }
      setWaiting(false)

    } else {
      const { email } = user;

      if (email.trim() === '') {
        showErrorAlert('Please enter your email');
        return;
      }

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
        showErrorAlert('Please enter a valid email address');
        return;
      }

      setWaiting(true)

      try {
        await axios.post(`${API_URL}/api/auth/forgot_password/create`, {email})
        SweetAlert.fire({
          // position: 'top-end',
          imageUrl: '/assets/success-icon.png',
          imageHeight: '100px',
          title: 'The reset password process have been created successfully.',
          html: 'You should receive an email for verification',
          width: 600,
          confirmButtonColor: '#0099FF',
          customClass: {
            icon: 'no-before-icon',
          },
        });
        router.push('/')
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response?.data?.message || "Reset Process create failed, please try again!")
      }
      setWaiting(false)
    }
  };


  return (
    <div className='sign-up-container'>
      <div className="child-profile bd-grey">
        <div className="child-profile-container">
          <h1>Forgot Password</h1>
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
            autoComplete="off"
          >
            <div className="form">
              <hr />
              <br />
              {token ? <div style={{ width: '100%' }} className='name-box'>
                <CssTextField
                  id="password-input"
                  label="Password"
                  type='password'
                  style={{ flex: 1 }}
                  className="text-field"
                  value={user?.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div> : <div style={{ width: '100%' }} className='name-box'>
                <CssTextField
                  required
                  id="email-input"
                  label="Email"
                  type="email"
                  style={{ flex: 1 }}
                  value={user?.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>}
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
              Remembered your password?  <Link href='/signin' className='blue link'> Sign in </Link>
              </p>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
