import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setQualifications } from '../../../store/setProfile'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress, Grid
} from '@mui/material'
import { showErrorMessage } from '../../../utils';
import ToDashboardButton  from '../../Dashboard/Components/ToDashboardButton'
import {WarningAmberOutlined} from "@mui/icons-material";

const Step2 = (props) => {
  const {goBack, save, loading} = props
  const dispatch = useDispatch()
  const { qualifications } = useSelector(state => state.profile.information)
  let answersCount = Object.keys(qualifications).filter(qualification => qualifications[qualification] > -1).length
  if (qualifications['Student'] > 0) {
    answersCount -= 1
  }
  const next = () => {
    // if (answersCount < 5) return showErrorMessage('Please answer all questions')
    // if (!term) return showErrorMessage('Please confirm the "Terms and Conditions"')
    save()
  }

  const back = () => {
    goBack()
  }

  const handleStudentQualification = (e) => {
    if (e.target.value === '0' || e.target.value === 0) {
      dispatch(setQualifications({'A-level Student': -1}))
    }
    dispatch(setQualifications({'Student': parseInt(e.target.value)}))
  }


  return (
    <Box
      component="form"
      className="box "
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
              <span>Tell us about your qualifications</span><br/>
              <span style={{
                color: '#929292',
                fontSize: '16px',
                fontWeight: '400'
              }}>(This section requires completion)</span>
            </p>
          </Grid>
          <Grid item xs={0} sm={1} md={0}>
          </Grid>
        </Grid>
        <hr className="dashed-border" style={{marginBottom: '2rem', width: '550px'}}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{maxWidth: '800px', width: '100%'}}>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center'}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">Do you have degree?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['Degree']}
                onChange={(e) => dispatch(setQualifications({'Degree': parseInt(e.target.value)}))}
                className='answer-box'
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center'}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">Are you a qualified teacher (e.g. teaching certificate)?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['Qualified Teacher']}
                onChange={(e) => dispatch(setQualifications({'Qualified Teacher': parseInt(e.target.value)}))}
                className='answer-box'
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center'}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">Have you been an examiner last five years?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['Examiner']}
                onChange={(e) => dispatch(setQualifications({'Examiner': parseInt(e.target.value)}))}
                className='answer-box'
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center'}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">Do you have an enhanced DBS? (not a basic DBS).</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['Enhanced DBS']}
                onChange={(e) => dispatch(setQualifications({'Enhanced DBS': parseInt(e.target.value)}))}
                className='answer-box'
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center'}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">Are currently study for your A-level or Degree?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['Student']}
                onChange={(e) => handleStudentQualification(e)}
                className='answer-box'
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: '1rem', flexDirection: 'row', alignItems:'center', display:(qualifications['Student'] > 0 ? 'flex' : 'none')}}  className='name-box qualification'>
              <FormLabel id="demo-row-radio-buttons-group-label">A-level student or University student</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue='-1'
                value={qualifications['A-level Student']}
                onChange={(e) => dispatch(setQualifications({'A-level Student': parseInt(e.target.value)}))}
                className='study-answer-box'
              >
                <FormControlLabel value="1" control={<Radio />} label="A-level" />
                <FormControlLabel value="0" control={<Radio />} label="University" />
              </RadioGroup>
            </FormControl>
            <br />
            <p style={{ margin: '0px',  letterSpacing: '0.3px', width: '70%', color: '#d32f2f', display: 'flex' }}>
              <WarningAmberOutlined fontSize="small" style={{ marginTop: '2px' }} />&nbsp;&nbsp;<span style={{ fontSize: '16px' }}>
              Providing false or misleading information, such
              as claiming to be an examiner, will result in
              your profile being suspended. </span>
            </p>

            <span className='button-box'  style={{ maxWidth: '800px' }}>
              <Button
                type="button"
                variant="outlined"
                size="large"
                className='blue bd-blue'
                onClick={back}
              >
                Back
              </Button>
              <div>
                <Button
                  type="button"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  onClick={next}
                >
                  {loading &&
                    <CircularProgress size="20px" style={{ marginRight: '10px', color: 'white' }} />
                  }
                  Save & Next
                </Button></div>

            </span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Step2;
