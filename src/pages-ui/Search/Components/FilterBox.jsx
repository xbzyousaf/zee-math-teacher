import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  List,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTutors,
  setDistance,
  setExam,
  setFilters,
  setGender,
  setIsOnline,
  setLevel,
  setLocation,
  setPrice,
} from '../../../store/search'
import PlaceSelect from '../../../Components/PlaceSelect/PlaceSelect'
import { showErrorMessage } from '../../../utils'

const FilterBox = ({ setLoading }) => {
  const dispatch = useDispatch()
  const { filters } = useSelector((state) => state.search)
  const {
    level,
    gender,
    isOnline,
    price,
    distance,
    postcode,
    exam,
    latitude,
    longitude,
  } = filters
  const [postcodeError, setPostcodeError] = useState(null)

  const searchHandle = () => {
    if (postcodeError) return showErrorMessage(postcodeError)
    let filterParams = {}
    if (level) filterParams.level = level
    if (isOnline > -1) filterParams.isOnline = isOnline
    if (isOnline === 0) {
      filterParams.distance = distance
      filterParams.latitude = latitude
      filterParams.longitude = longitude
    }
    if (gender > -1) filterParams.gender = gender
    filterParams.price = price.join(',')
    if (exam) filterParams.exam = exam
    dispatch(fetchTutors({filterParams, setLoading}))
  }

  const clear = () => {
    const defaultFilters = {
      level: null,
      distance: 7,
      gender: -1,
      isOnline: -1,
      price: [15, 100],
      load: 1,
      latitude: -1,
      longitude: -1,
      exam: null,
      postcode: ''
    }
    dispatch(setFilters(defaultFilters))
    dispatch(fetchTutors({
      filterParams: {
        isOnline: -1,
        price: '15,100',
      }, setLoading
    }))
  }

  //  ------- pricing ---------
  const marks = [
    {
      value: 15,
      label: '\u00A315',
    },
    {
      value: price[0],
      label: '\u00A3' + price[0],
    },
    {
      value: price[1],
      label: '\u00A3' + price[1] + `${price[1] === 100 ? '+' : ''}`,
    },
    {
      value: 100,
      label: '\u00A3100+',
    },
  ]
  if (price[0] < 25) marks.shift()
  if (price[1] > 90) marks.pop()
  const valuetext = (value) => Number(value) > 69 ? `\u00A3${value}+` : `\u00A3${value}`
  const minDistance = 0
  const setNewPrice = (_, newPrice, activeThumb) => {
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
  const setNewDistance = (_, value) => {
    dispatch(setDistance(value))
  }

  // ---------- location -----------
  const handleIsOnlineChange = (e) => {
    dispatch(setIsOnline(parseInt(e.target.value)))
  }

  const handlePostcodeChange = (e) => {
    dispatch(setLocation(e.target.value))
    // setPostcodeError(e.target.value.error);
  }

  return (
    <Paper className="filter-box" elevation={0} sx={{
      maxHeight:{
        md:'75vh',
      },
      overflow: {
        md: 'auto',
      }
    }}>
      <List>
        <div className="box bd-grey">
          <div className="search-box">
            <h2 style={{ marginTop: '0' }}>Filter Options</h2>
            <Box
              component="form"
              onSubmit={null}
              sx={{
                '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
                '& .captcha': { m: 1, mt: 2 },
                '& .heading': { m: 1, textAlign: 'center' },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ width: '100%' }} className="sub-search-box">
                <div style={{ width: '100%' }} className="name-box">
                  <FormControl fullWidth>
                    <FormLabel id="maths-level" className="label">
                      {' '}
                      Maths Level
                    </FormLabel>
                    {/* <InputLabel id="demo-simple-select-label">Math Level</InputLabel> */}
                    <Select
                      aria-labelledby="maths-level"
                      id="demo-simple-select"
                      value={level || ' '}
                      onChange={(e) =>
                        dispatch(
                          setLevel(e.target.value === ' ' ? null : e.target.value)
                        )
                      }
                    >
                      <MenuItem value=" ">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="7+/11+">Maths ( 7+/11+ )</MenuItem>
                      <MenuItem value="Primary">Maths ( Primary )</MenuItem>
                      <MenuItem value="Secondary">Maths ( Secondary )</MenuItem>
                      <MenuItem value="GCSE">Maths ( GCSE )</MenuItem>
                      <MenuItem value="A-level">Maths ( A-level )</MenuItem>
                      <MenuItem value="Degree/Adult">
                        Maths ( Degree/Adult )
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{ m: 0, mt: 0 }}
                    component="fieldset"
                    variant="standard"
                    style={{ width: '100%' }}
                  >
                    <FormLabel id="location" className="label">
                      {' '}
                      Location{' '}
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="location"
                      value={isOnline}
                      onChange={handleIsOnlineChange}
                      defaultValue={1}
                      row
                      className="name-box"
                    >
                      <FormControlLabel
                        control={<Radio value={1}/>}
                        label="Online"
                      />
                      <FormControlLabel
                        control={<Radio value={0}/>}
                        label="In-person"
                      />
                    </RadioGroup>
                  </FormControl>
                  {isOnline === 0 && (
                    <>
                      <FormControl fullWidth>
                        <FormLabel className="label">
                          Postcode (UK only)
                        </FormLabel>
                        <PlaceSelect
                          style={{ width: '100%', margin: 0 }}
                          value={postcode}
                          onChange={handlePostcodeChange}
                          error={postcodeError}
                        />
                        {!!postcodeError && (
                          <FormHelperText error={true}>
                            {postcodeError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <FormLabel>
                          <span className="label">Distance</span> : Within{' '}
                          {distance} Miles
                        </FormLabel>
                        <div style={{ padding: '0 1rem', width: '100%' }}>
                          <Slider
                            disabled={!postcode}
                            aria-label="distance"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={30}
                            value={distance}
                            onChange={setNewDistance}
                          />
                        </div>
                      </FormControl>
                    </>
                  )}
                  <FormControl fullWidth>
                    <FormLabel id="price-price">
                      {' '}
                      <span className="label">Pricing</span> :{' '}
                      {valuetext(price[0])} - {valuetext(price[1])}
                    </FormLabel>
                    <div style={{ padding: '0 1.5rem 0 1rem', width: '100%' }}>
                      <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={price}
                        onChange={setNewPrice}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        marks={marks}
                        min={15}
                        max={100}
                        disableSwap
                        aria-labelledby="price-price"
                      />
                    </div>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel id="exam-board" className="label">
                      {' '}
                      Exam board
                    </FormLabel>
                    <Select
                      id="exam-board"
                      value={exam || ' '}
                      placeholder="Exam Board"
                      onChange={(e) =>
                        dispatch(
                          setExam(e.target.value === ' ' ? null : e.target.value)
                        )
                      }
                    >
                      <MenuItem value={' '}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="AQA">AQA</MenuItem>
                      <MenuItem value="OCR">OCR</MenuItem>
                      <MenuItem value="Edexcel">Edexcel</MenuItem>
                      <MenuItem value="WJEC">WJEC</MenuItem>
                      <MenuItem value="CCEA">CCEA</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel id="demo-simple-select-label" className="label">
                      Gender
                    </FormLabel>
                    <Select
                      id="demo-simple-select"
                      value={gender}
                      onChange={(e) =>
                        dispatch(setGender(parseInt(e.target.value)))
                      }
                    >
                      <MenuItem value={-1}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Male</MenuItem>
                      <MenuItem value={1}>Female</MenuItem>
                      <MenuItem value={2}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <span
                style={{ width: '100%', gap: '0.5rem', marginTop: '0.5rem' }}
                className="name-box"
              >
              <Button
                type="button"
                variant="contained"
                size="large"
                style={{ flex: 1 }}
                onClick={clear}
                className="clear"
              >
                Clear Filters
              </Button>
              <Button
                type="button"
                variant="contained"
                size="large"
                style={{ flex: 1 }}
                onClick={searchHandle}
                className="clear"
              >
                Search
              </Button>
            </span>
            </Box>
          </div>
        </div>
      </List>
    </Paper>
  )
}

export default FilterBox
