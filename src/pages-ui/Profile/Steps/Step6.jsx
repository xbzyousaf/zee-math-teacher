import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel, Grid,
  Radio,
  RadioGroup
} from '@mui/material'
import {isProfileReadyForSubmission, showErrorMessage} from '../../../utils'
import { useRouter,useSearchParams } from 'next/navigation'
import ToDashboardButton from '../../Dashboard/Components/ToDashboardButton'
import {useSelector} from "react-redux";
import './Step0.css'
import ProfileStepInformationStatuses from "../Components/ProfileStepInformationStatuses";

const Step2 = (props) => {
  const [term, setTerm] = useState(false)
  const { goBack, save, submit, loading } = props
  const router = useRouter()
  const [submitApproval, setSubmitApproval] = useState(null)
  const profileUser = useSelector((state) => state.profile.user);

  const Submit = () => {
    const isReadyForSubmission = isProfileReadyForSubmission(profileUser)
    if (submitApproval == null) return showErrorMessage('Please select if you want to submit your profile for approval or not.')
    if (submitApproval == 'true') {
      if (!isReadyForSubmission) return showErrorMessage('Your profile appears to be incomplete. To successfully submit it for approval, please provide the required information across all steps.')
      if (!term) return showErrorMessage('Please confirm the "Terms and Conditions"')
      submit()
    } else {
      save()
      router.push('/dashboard')
    }
  }
  const back = () => {
    goBack()
  }
  return (
      <Box
          component="form"
          className="box "
          onSubmit={null}
          sx={{
            '& .MuiTextField-root': {m: 1, maxWidth: '100%'},
            '& .captcha': {m: 1, mt: 2},
            '& .heading': {m: 1, textAlign: 'center'},
          }}
          noValidate
          autoComplete="off"
      >
        <div className="form">
          <Grid container spacing={2}>
            <Grid className="back-to-dashboard" sx={{
              textAlign: 'right',
              justifyContent: {xs: 'start', md: 'end'},
              minHeight: '100%',
              display: 'flex',
              alignItems: "center"
            }} item xs={1} sm={1} md={3}>
              <ToDashboardButton/>
            </Grid>
            <Grid item xs={11} sm={10} md={6} style={{textAlign: 'center'}}>
              <p className="step-title blue">Submit your profile</p>
            </Grid>
            <Grid item xs={0} sm={1} md={0}>
            </Grid>
          </Grid>
          <hr className="dashed-border" style={{marginBottom: '2rem', width: '550px'}}/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{maxWidth: '800px', width: '100%'}}>
              <FormGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={submitApproval}
                  name="radio-buttons-group"
                  style={{marginTop: '3rem'}}
              >
                <FormControl style={{marginTop: '1rem', flexDirection: 'column'}} className="name-box qualification">
                  <FormLabel id="demo-row-radio-buttons-group-label">Would you like to <b>submit your profile</b> for
                    approval?</FormLabel>
                  <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue="-1"
                      // value={submitApproval}
                      onChange={(e) => setSubmitApproval(e.target.value)}
                      className="answer-box"
                  >
                    <FormControlLabel value="false" control={<Radio/>} label="No"/>
                    <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
                  </RadioGroup>
                </FormControl>

                <p style={{
                  margin: '10px 0px 10px 0px',
                  fontSize: '16px',
                  color: '#d32f2f',
                  letterSpacing: '0.3px',
                  border: '2px solid #d32f2f',
                  padding: '12px 17px 17px 15px'
                }}>

                  <div style={{display: 'flex', alignItems: 'center', marginTop: '-0.5rem',}}>
                    <FormControlLabel
                        sx={{
                          marginRight: 0,
                        }}
                        control={<Checkbox
                        checked={term} onChange={(e) => setTerm(e.target.checked)}/>}
                        className="term-label checkbox-input"
                        label="">
                    </FormControlLabel>
                    <a href="/terms" target="_blank"
                       style={{color: '#0262C2', fontSize: '16px', marginLeft: '5px', textUnderlinePosition: 'under'}}>Terms
                      and Conditions</a>
                  </div>

                  By agreeing to our terms and conditions, you acknowledge that any false or
                  misleading information (e.g. having a teaching qualification) provided will result in your profile
                  being suspended.
                </p>
                <br/>
              </FormGroup>
              {
                  submitApproval === 'true' && <>
                    {
                      !isProfileReadyForSubmission(profileUser) && <>
                        <h3 style={{ margin: '0px' }}>Missing information!</h3>
                        <p style={{ fontSize: '17px', letterSpacing: '0.2px' }}>You profile is not live. The red 'incomplete' indicates, requires information. Please fill in the
                          missing information before submitting to be reviewed. You have the option to save your progress
                          and return later to complete it. The decision is yours!</p>
                      </>

                    }
                    <div style={{ maxWidth: '700px', margin: '20px 0px 0px 0px' }}>
                    <ProfileStepInformationStatuses/>
                  </div>
                  </>
              }


              <span className="button-box" style={{maxWidth: '800px'}}>
                  <Button
                    type="button"
                    variant="outlined"
                    size="large"
                    className="blue bd-blue"
                    onClick={back}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    disabled={loading}
                    size="large"
                    className={submitApproval == 'true' ? 'clear' : ''}
                    onClick={Submit}
                  >
                      {loading &&
                          <CircularProgress size="20px" style={{marginRight: '10px', color: 'white'}}/>
                      }
                    {submitApproval === 'true' ? 'Submit' : 'Save'}
                  </Button>
            </span>
            </div>
          </div>
        </div>

      </Box>
  )
}

export default Step2
