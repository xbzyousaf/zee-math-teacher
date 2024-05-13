import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setExam } from '../../../store/setProfile'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormGroup, Checkbox, CircularProgress, Grid } from '@mui/material'
import ToDashboardButton from '../../Dashboard/Components/ToDashboardButton'

const Step1 = (props) => {
  const {goBack, save, loading} = props
  const { exam } = useSelector(state => state.profile.information)
  const dispatch = useDispatch()
  const next = () => {
    save()
  }

  const back = () => {
    goBack()
  }

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
          <Grid className='back-to-dashboard' sx={{textAlign: 'right', justifyContent: { xs: 'start', md: 'end'}, minHeight:'100%', display: 'flex', alignItems:"center"}} item xs={1} sm={1} md={3}>
            <ToDashboardButton />
          </Grid>
          <Grid item xs={11} sm={10} md={6} style={{textAlign: 'center'}}>
            <p className="step-title blue" style={{lineHeight: '30px'}}>
              <span>What exam board can you teach?</span><br/>
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
        <hr className="dashed-border" style={{marginBottom: '2rem', width: '500px'}}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <FormControl style={{maxWidth: '400px', width: '100%'}}>
            <FormGroup
                aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="-1"
              name="radio-buttons-group"
            >
              <FormControlLabel control={<Checkbox checked={exam['AQA']} onChange={(e) => dispatch(setExam({ 'AQA': e.target.checked }))} size='large'/>} label="AQA" />
              <FormControlLabel control={<Checkbox checked={exam['OCR']} onChange={(e) => dispatch(setExam({ 'OCR': e.target.checked }))}  size='large'/>} label="OCR" />
              <FormControlLabel control={<Checkbox checked={exam['Edexcel']} onChange={(e) => dispatch(setExam({ 'Edexcel': e.target.checked }))}  size='large'/>} label="Edexcel" />
              <FormControlLabel control={<Checkbox checked={exam['WJEC']} onChange={(e) => dispatch(setExam({ 'WJEC': e.target.checked }))}  size='large'/>} label="WJEC"  size='large'/>
              <FormControlLabel control={<Checkbox checked={exam['CCEA']} onChange={(e) => dispatch(setExam({ 'CCEA': e.target.checked }))}  size='large'/>} label="CCEA" />
              <FormControlLabel control={<Checkbox checked={exam['Other']} onChange={(e) => dispatch(setExam({ 'Other': e.target.checked }))}  size='large'/>} label="Other" />
            </FormGroup>
            <span className='button-box'>
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
                  size="large"
                  onClick={next}
                  variant="contained"
                  disabled={loading}
                >
                  {loading &&
                      <CircularProgress size="20px" style={{ marginRight: '10px', color: 'white' }} />
                  }
                  Save & Next
                </Button></div>

            </span>
          </FormControl>
          
        </div>
        
      </div>
    </Box>
  );
};

export default Step1;
