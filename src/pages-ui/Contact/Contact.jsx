"use client";
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { createAxiosInstance } from '../../api'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import CssTextField from '../../Components/CssTextField'
import  UnderCurve  from '../../../public/assets/images/undercurve.svg'
import  SuccessIcon  from '../../../public/assets/success-icon.png'
import  ErrorIcon  from '../../../public/assets/error-icon.png'
import Image from 'next/image';
import './contact.css'
import { CircularProgress } from '@mui/material'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'




const ContactPage = () => {
  const router = useRouter();
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  const [contact, setContact] = React.useState({
    fullName: '',
    email: '',
    message: ''
  });

  const createContact = (contact,router) => {
    const contactWithToken = {
      ...contact, token: JSON.stringify({
        token,
      })
    };
    createAxiosInstance()
      .post(`/api/contacts`, {contactWithToken})
      .then((res) => {
        Swal.fire({
          // position: 'top-end',
          imageUrl: 'assets/success-icon.png',
          imageHeight: '100px',
          title: 'Thank you for your message.',
          html: 'We will respond to you as soon as possible.',
          width: 600,
          confirmButtonColor: '#0099FF',
          customClass: {
            icon: 'no-before-icon',
          },
        });
        setLoading(false)
        router.push('/');
      })
      .catch((err) => {
        console.log("error: " + err);
        Swal.fire({
          imageUrl: 'assets/error-icon.png',
          imageHeight: '100px',
          title: 'Oops...',
          text: err?.response?.data?.message || 'Your message could not be sent, please try again!',
          confirmButtonColor: '#0099FF',
        });
        setLoading(false)
      });
  };

  const handleSubmit = (e) => {
    let newError = {}
    e.preventDefault();
    if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(contact?.email.trim()))) newError.email = 'Please input a valid email.'
    if(contact.fullName.length > 100) newError.fullName = `Length limit : 100 characters. Current : ${contact.fullName.length}`
    if(contact.message.length > 1000) newError.message = `Length limit : 1000 characters. Current : ${contact.message.length}`
    if(contact.email.trim().length === 0) newError.email = 'Please input your email.'
    if(contact.fullName.trim().length === 0) newError.fullName = 'Please input your full name.'
    if(contact.message.trim().length === 0) newError.message = 'Please input your message.'
    setError(newError)
    if(Object.keys(newError).length > 0) return
    setLoading(true)
    createContact(contact,router);
  };

  return (
    <div className='contact-container'>
      <div className="contact bd-grey">
        <div className="page-heading">
          <h1>We're here to help!</h1>
          <Image src={UnderCurve} alt="" />
        </div>
        <div className="contact-container">
          <Box
            component="form"
            className="boxx"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
              '& .captcha': { m: 1, mt: 2 },
              '& .submitbtn': { m: 1, mt: 4 },
              '& .heading': { m: 1, textAlign: 'center' },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="form">
              <div style={{ flexWrap: 'wrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p
                  className="heading"
                  style={{ maxWidth: '700px', marginBottom: '12px', fontSize: '18px', fontFamily: 'Open Sans' }}
                >
                  If you would like to get in touch, don't hesitate to drop us a message by emailing us at <span className='blue'>hello@mathsdirectory.co.uk</span>. Or alternatively, write your message below:
                </p>
              </div>
              <hr style={{ width: '98%' }} />
              <div style={{ marginTop: '20px' }}>
                <CssTextField
                  required
                  id="custom-css-outlined-input"
                  label="Your Full Name"
                  type="text"
                  value={contact?.fullName}
                  onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                  className='mx-0'
                  style={{ width: '100%' }}
                  error={error.fullName}
                  helperText={error.fullName}
                />
                <CssTextField
                  required
                  id="custom-css-outlined-input"
                  label="Your Email"
                  type="text"
                  value={contact?.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className='mx-0'
                  style={{ width: '100%' }}
                  error={error.email}
                  helperText={error.email}
                />
              </div>

              <div>
                <CssTextField
                  id="custom-css-outlined-input"
                  required
                  label="Your Message"
                  placeholder="Limit: 1000 characters"
                  multiline
                  maxRows={12}
                  minRows={6}
                  className="text-field mx-0"
                  value={contact?.message}
                  style={{ width: '100%' }}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  error={error.message}
                  helperText={error.message}
                />

              </div>

              <GoogleReCaptchaProvider reCaptchaKey="6Led3YQpAAAAAOESbSVoHsLTABDKOrVHUJ9ll-lh">
                <GoogleReCaptcha onVerify={token => {
                  setToken(token);
                }} />
              </GoogleReCaptchaProvider>

              <span className="submit-contact">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  // className='bg-blue'
                >
                  {loading && (<CircularProgress size="24px" style={{ color: "white", marginRight: '0.50rem' }} />) }
                  Submit
                </Button>
              </span>
            </div>
          </Box>
        </div>
      </div>

    </div>

  );
};

export default ContactPage;
