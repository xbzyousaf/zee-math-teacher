import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SweetAlert from 'sweetalert2';
import {setLevel} from '../../../store/setProfile'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormGroup, Checkbox, CircularProgress, Grid } from '@mui/material'
import ToDashboardButton  from '../../Dashboard/Components/ToDashboardButton'

const Step0 = (props) => {
  const { save, loading } = props
  const {level} = useSelector(state => state.profile.information)
  const dispatch = useDispatch()
  const next = () => {
    // const levelCount = Object.values(level).filter(value => value).length;
    // if (levelCount === 0) {
    //   SweetAlert.fire({
    //     imageUrl: '/assets/error-icon.png',
    //     imageHeight: '100px',
    //     title: 'Oops...',
    //     text: 'You should select at least one level of math that you can teach.',
    //     confirmButtonColor: '#0099FF',
    //   });
    //   return;
    // }
    save()
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
              <span>What level of maths can you teach?</span><br/>
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
          <FormControl style={{maxWidth: '400px', width: '100%'}}>
            <FormGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="-1"
              name="radio-buttons-group"
            >
              <FormControlLabel control={<Checkbox checked={level['7+/11+']} onChange={(e) => dispatch(setLevel({ '7+/11+': e.target.checked }))} size='large'/>} label="Maths ( 7+/11+ )" />
              <FormControlLabel control={<Checkbox checked={level['Primary']} onChange={(e) => dispatch(setLevel({ 'Primary': e.target.checked }))}  size='large'/>} label="Maths ( Primary )" />
              <FormControlLabel control={<Checkbox checked={level['Secondary']} onChange={(e) => dispatch(setLevel({ 'Secondary': e.target.checked }))}  size='large'/>} label="Maths ( Secondary )" />
              <FormControlLabel control={<Checkbox checked={level['GCSE']} onChange={(e) => dispatch(setLevel({ 'GCSE': e.target.checked }))}  size='large'/>} label="Maths ( GCSE )"  size='large'/>
              <FormControlLabel control={<Checkbox checked={level['A-level']} onChange={(e) => dispatch(setLevel({ 'A-level': e.target.checked }))}  size='large'/>} label="Maths ( A-level )" />
              <FormControlLabel control={<Checkbox checked={level['Degree/Adult']} onChange={(e) => dispatch(setLevel({ 'Degree/Adult': e.target.checked }))}  size='large'/>} label="Maths ( Degree/Adult )" />
            </FormGroup>
            <span className='button-box' style={{ justifyContent: 'end' }}>
              <div style={{ textAlign: 'end' }}>
                <Button
                  type="button"
                  onClick={next}
                  size="large"
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

export default Step0;
