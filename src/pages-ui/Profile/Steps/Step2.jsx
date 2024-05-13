import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  setOnline,
  setFaceToFace,
  setPrice,
  setDistance,
  setPosition,
} from '../../../store/setProfile'
import {
  FormLabel,
  Slider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox, CircularProgress, Grid,
} from '@mui/material'
import { showErrorMessage } from '../../../utils'
import PlaceSelect from '../../../Components/PlaceSelect/PlaceSelect'
import ToDashboardButton from '../../Dashboard/Components/ToDashboardButton'

const Step2 = (props) => {
  const { goBack, save, loading } = props
  const {
    price,
    online,
    faceToFace,
    distance,
    postcode,
  } = useSelector((state) => state.profile.information)
  const [postcodeError, setPostcodeError] = useState(null)
  const dispatch = useDispatch()
  //----------- price -------------
  const minDistance = 0
  const priceMarks = [
    {
      value: 15,
      label: '\u00A315',
    },
    {
      value: 100,
      label: '\u00A3100+',
    },
  ]
  // const priceMarks = [
  //   {
  //     value: 15,
  //     label: '\u00A315',
  //   },
  //   {
  //     value: price[0],
  //     label: '\u00A3' + price[0],
  //   },
  //   {
  //     value: price[1],
  //     label: '\u00A3' + price[1] + `${price[1] === 100 ? '+' : ''}`,
  //   },
  //   {
  //     value: 100,
  //     label: '\u00A3100+',
  //   },
  // ]

  const setNewPrice = (event, newPrice, activeThumb) => {
    if (!Array.isArray(newPrice)) {
      return
    }

    if (activeThumb === 0) {
      dispatch(
        setPrice([Math.min(newPrice[0], price[1] - minDistance), price[1]])
      )
    } else {
      dispatch(
        setPrice([price[0], Math.max(newPrice[1], price[0] + minDistance)])
      )
    }
  }

  const valuetext = (value) => `\u00A3${value}`
  // ----- control ---------
  const next = async () => {
    // if (!online && !faceToFace) {
    //   showErrorMessage('Please select your private tutoring options.')
    //   return
    // }
    // if (faceToFace) {
    //   if (postcode.trim().length === 0) {
    //     showErrorMessage('Please input your location.')
    //     return
    //   }
    //   if (postcodeError) showErrorMessage(postcodeError)
    // }
    save()
  }
  const back = () => {
    goBack()
  }

  // ----------- distance -----------
  const setNewDistance = (_, value) => {
    dispatch(setDistance(value))
  }

  const handlePlaceSelect = (event) => {
    const place = event.target.value
    if (!place) return
    setPostcodeError(place.error)
    dispatch(
      setPosition({
        latitude: place.latitude,
        longitude: place.longitude,
        address: place.address,
        addressDetails: place.addressDetails,
        postcode: place.postcode,
      })
    )
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
          <Grid className="back-to-dashboard" sx={{textAlign: 'right', justifyContent: { xs: 'start', md: 'end'}, minHeight:'100%', display: 'flex', alignItems:"center"}} item xs={1} sm={1} md={3}>
            <ToDashboardButton/>
          </Grid>
          <Grid item xs={11} sm={10} md={6} style={{textAlign: 'center'}}>
            <p className="step-title blue" style={{lineHeight: '30px'}}>
              <span>Select your price and tutoring options</span><br/>
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
          <div style={{maxWidth: '400px', width: '100%'}}>
            <FormControl className="name-box">
              <FormLabel id="price-price">

                Your pricing range: {valuetext(price[0])} - {valuetext((price[1] && price[1] === 100) ? (price[1] + '+') : price[1] )}
              </FormLabel>
              <div style={{
                margin: '0px 10px'
              }}>
                <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={price}
                  onChange={setNewPrice}
                  componentsProps={{
                    markLabel: {
                      style: {
                        fontSize: '14pt',
                      },
                    }
                  }}
                  sx={{
                    '& input[type="range"]': {
                      WebkitAppearance: 'slider-vertical',
                    },
                  }}
                  valueLabelDisplay="auto"
                  size="medium"
                  getAriaValueText={valuetext}
                  marks={priceMarks}
                  min={15}
                  max={100}
                  disableSwap
                  aria-labelledby="price-price"
                />
              </div>
            </FormControl>
            <FormControl style={{ marginTop: '1rem' }} className="name-box">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Your private tutoring options
              </FormLabel>
              <FormGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{ justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={online}
                      onChange={(e) => dispatch(setOnline(e.target.checked))}
                      size="large"
                    />
                  }
                  label="Online"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={faceToFace}
                      onChange={(e) =>
                        dispatch(setFaceToFace(e.target.checked))
                      }
                      size="large"
                    />
                  }
                  label="In Person"
                />
              </FormGroup>
            </FormControl>
            {faceToFace && (
              <>
                <FormControl className="name-box">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    style={{ marginBottom: '0.5rem' }}
                  >
                    Postcode (UK only)
                    {/*{!postcode || postcode === "" ? "" : ` : ${postcode}`}*/}
                  </FormLabel>
                  <PlaceSelect
                    variant="outlined"
                    className="name-box"
                    value={postcode}
                    onChange={handlePlaceSelect}
                  />
                  <FormHelperText error={postcodeError}>
                    {postcodeError ||
                      'Your full address will never be shown. Only area e.g. London, Muswell Hill'}
                  </FormHelperText>
                </FormControl>

                <FormControl className="name-box">
                  <FormLabel id="distance">
                    Distance : Within {distance} Miles
                  </FormLabel>
                  <Slider
                    aria-label="distance"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={30}
                    value={distance}
                    onChange={setNewDistance}
                  />
                  <FormHelperText
                    id="distance"
                    style={{ fontSize: '10pt!important' }}
                  >
                    Select how far you are willing to travel.
                  </FormHelperText>
                </FormControl>
              </>
            )}

            <span className="button-box">
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={back}
                className="blue bd-blue"
              >
                  Back
              </Button>
              <div>

                <Button
                  type="button"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  onClick={async (e) => await next(e)}
                >
                  {loading &&
                    <CircularProgress size="20px" style={{ marginRight: '10px', color: 'white' }}/>
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
