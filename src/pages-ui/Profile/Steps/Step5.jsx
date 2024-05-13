import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { setEmail, setPhone } from '../../../store/setProfile'
import { FormLabel, FormControl, TextField, Typography, CircularProgress, Grid } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import  ToDashboardButton  from '../../Dashboard/Components/ToDashboardButton'

const countries = ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TA', 'TC', 'TD', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

const Step2 = (props) => {
  const { goBack, save, loading } = props
  const { email, phone } = useSelector(state => state.profile.information)
  const dispatch = useDispatch()
  const [mailerror, setMailError] = useState(false)
  const [phoneerror, setPhoneError] = useState(false)

  const validate = (name, value) => {
    let isvalid = false
    switch (name) {
      case 'email':
        isvalid = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true
        break
      case 'phone':
        isvalid = !value.match(/^(?:(?:\+|00)44|0)7(?:[1345789]\d{2}|624)\d{6}$/i) ? false : true
        break
      default:
        break
    }
    return isvalid
  }
  // const handlePhoneChange = (e) => {
  //
  //   if (e.target.value) {
  //     const isValid = validate('phone', e.target.value)
  //     if (!isValid) {
  //       setPhoneError(true)
  //       dispatch(setPhone(e.target.value))
  //     } else {
  //       setPhoneError(false)
  //       dispatch(setPhone(e.target.value))
  //     }
  //   } else {
  //     setPhoneError(false)
  //     dispatch(setPhone(e.target.value))
  //   }
  //   // if (value) {
  //   // }
  //   //   if(isValidPhoneNumber(value) || isPossiblePhoneNumber(value)) {
  //   //     setPhoneError(false)
  //   //   } else if (phone?.length <= 5 && phoneerror){
  //   //     removeNumber()
  //   //   } else {
  //   //     setPhoneError(true)
  //   //   }
  //   // } else {
  //   //   setPhoneError(false)
  //   // }
  // }

  const handleEmailChange = (e) => {
    if (e.target.value) {
      const isValid = validate('email', e.target.value)
      if (!isValid) {
        setMailError(true)
        dispatch(setEmail(e.target.value))
      } else {
        setMailError(false)
        dispatch(setEmail(e.target.value))
      }
    } else {
      setMailError(false)
      dispatch(setEmail(e.target.value))
    }
  }

  const back = () => {
    goBack()
  }

  const handleNext = () => {
    save()
  }

  // const removeNumber = () => {
  //   dispatch(setPhone(''))
  //   setPhoneError(false)
  // }
  return (
    <Box
      component="form"
      className="box"
      onSubmit={null}
      sx={{
        '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
        '& .captcha': { m: 1, mt: 2 },
        '& .heading': { m: 1, textAlign: 'center' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="form">
        <Grid container spacing={2}>
          <Grid className="back-to-dashboard" sx={{textAlign: 'right', justifyContent: { xs: 'start', md: 'end'}, minHeight:'100%', display: 'flex', alignItems:"center"}} item xs={1} sm={1} md={3}>
            <ToDashboardButton/>
          </Grid>
          <Grid item xs={11} sm={10} md={6} style={{textAlign: 'center'}}>
            <p className="step-title blue" style={{lineHeight: '30px'}}>
              <span>How do clients get in touch with you?</span><br/>
              <span style={{
                color: '#929292',
                fontSize: '16px',
                fontWeight: '400'
              }}>(This section is optional)</span>
            </p>
          </Grid>
          <Grid item xs={0} sm={1} md={0}>
          </Grid>
        </Grid>
        <hr className="dashed-border" style={{marginBottom: '2rem', width: '550px'}}/>
        <p style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{maxWidth: '800px', textAlign: 'center' }}>You will receive emails from potential clients via our
            message system and will be notified by email; the one you use to sign up with. In addition to this, you can
            have your email / telephone number show on your profile for others to see. Of course, this is optional!
          </div>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <FormControl className="name-box">
              <FormLabel id="price-price" className="mb-1">Your Email</FormLabel>
              <TextField variant="outlined" placeholder="Enter your email" hiddenLabel style={{ margin: '0' }}
                value={email} onChange={handleEmailChange} error={mailerror}/>
              <p style={{
                marginTop: '0px',
                marginBottom: '0px',
                color: 'grey',
                fontSize: '15px'
              }}>Your email will be shown in your profile</p>
            </FormControl>
            <FormControl className="name-box" style={{ marginTop: '1rem', position: 'relative' }}>
              <FormLabel id="price-price" className="mb-1">Your Telephone</FormLabel>
              <TextField variant="outlined" placeholder="Enter your phone" type="number" hiddenLabel style={{ margin: '0' }}
                 onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                 value={phone} onChange={(e) => dispatch(setPhone(e.target.value))} />
              {/*<PhoneInput*/}
              {/*    placeholder="Enter phone number"*/}
              {/*    focusInputOnCountrySelection={true}*/}
              {/*    countries={countries}*/}
              {/*    defaultCountry="GB"*/}
              {/*    limitMaxLength={true}*/}
              {/*    value={formatPhoneNumberIntl(phone)}*/}
              {/*    onChange={handlePhoneChange}*/}
              {/*/>*/}
              {/*<span style={{ position: 'absolute', cursor: 'pointer', right: '10px', top: '54px' }} onClick={removeNumber}>*/}
              {/*  <CancelIcon fontSize="small" />*/}
              {/*</span>*/}
              {/*{phoneerror && <Typography variant="caption" color={'error'}>Phone Number is incorrect</Typography>}*/}
              <p style={{
                marginTop: '0px',
                marginBottom: '0px',
                color: 'grey',
                fontSize: '15px'
              }}>Your telephone number will be shown on your profile</p>

            </FormControl>
            <span className="button-box" style={{ maxWidth: '800px' }}>
              <Button
                type="button"
                variant="outlined"
                size="large"
                className="blue bd-blue"
                onClick={back}
              >
                Back
              </Button>
              <div>
                  <Button
                    type="button"
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    disabled={mailerror || phoneerror || loading}
                  >
                    {loading &&
                      <CircularProgress size="20px" style={{ marginRight: '10px', color: 'white' }} />
                    }
                  Save & Next
                </Button>
              </div>

            </span>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Step2
