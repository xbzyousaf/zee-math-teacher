import React, { useCallback, useEffect, useState } from 'react'
import './home.css'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, useMediaQuery, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/search'
// import { getPositionFromPostcode } from '../../utils'
import SweetAlert from 'sweetalert2'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import AcrossCard from './Components/AcrossCard'
import { createAxiosInstance } from '../../api'
import { syncDatabaseUser } from '../../store/main'
import  UnderCurve  from '../../../public/assets/images/undercurve.svg'
import School from "../../../public/assets/images/Emanuel-School.jpg"
import { showErrorMessage } from '../../utils'
import dynamic from 'next/dynamic'
const Tour = dynamic(() => import("reactour"), { ssr: false });
// import Tour from 'reactour'
import ContentCards from './Components/ContentCards'
import Image from 'next/image';
import { useRouter , useSearchParams} from 'next/navigation'


const Root = () => {
  const searchParams = useSearchParams();
  const isGuest = useSelector(state => state.main.isGuest)
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  const router = useRouter()
  const smallScreen = useMediaQuery('(max-width: 950px)')
  const homeStepsForTutor = [
    {
      selector: '.search-box',
      content: <div style={{marginTop: '8px'}}>Use the search bar to filter down the type of maths tutor you are looking for.</div>,
    },
    {
      selector: smallScreen ? '.explore-more-mobile' : '.explore-more',
      content: <div style={{marginTop: '8px'}}>To create your profile, navigate to the <strong>Dashboard</strong>, select the <strong>Create profile</strong> button.</div>,
    },
  ];
  const homeStepsForGuest = [
    {
      selector: '.search-box',
      content: <div style={{marginTop: '8px'}}>Use the search bar to filter down the type of maths tutor you are looking for.</div>,
    },
  ];
  const dispatch = useDispatch()
  const [level, setLevel] = useState(null);
  const [isTourOpen, setIsTourOpen] = React.useState(false)
  const mainUser = useSelector(state => state.main)

  // const [location, setLocation] = useState(-1);
  // const [postcode, setPostcode] = useState('');
  // const [postcodeError, setPostcodeError] = useState(false)
  const handleLevelChange = (e) => {
    setLevel(e.target.value)
  }
  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value)
  // }
 
  const search = async () => {
    const defaultFilters = {
      level: null,
      distance: 7,
      gender: -1,
      isOnline: -1,
      price: [15, 100],
      latitude: -1,
      longitude: -1,
      load: 1
    }
    if (level) defaultFilters['level'] = level
    // if (location > -1) {
    //   if (location === 0) {
    //     defaultFilters['isOnline'] = 1
    //   } else {
    //     defaultFilters['isOnline'] = 0
    //     defaultFilters['distance'] = 10 * (location - 1)
    //     if (postcode.trim() === '') {
    //       setPostcodeError(true)
    //       return
    //     } else {
    //       setPostcodeError(false)
    //       defaultFilters["postcode"] = postcode.trim()
    //       const isPostcodeValid = await getPositionFromPostcode(defaultFilters["postcode"])
    //       if (isPostcodeValid.ok < 1) {
    //         setPostcodeError(true)
    //         SweetAlert.fire({
    //           imageUrl: '/assets/error-icon.png',
    //           imageHeight: '100px',
    //           title: 'Oops...',
    //           text: 'Your postcode is not valid, please input valid postcode.',
    //           confirmButtonColor: '#0099FF',
    //         });
    //         return
    //       } else {
    //         defaultFilters['latitude'] = isPostcodeValid.position.latitude
    //         defaultFilters['longitude'] = isPostcodeValid.position.longitude
    //       }
    //     }
    //   }
    // }
    dispatch(setFilters(defaultFilters))
    let filterParams = {};
    if (defaultFilters.level) filterParams.level = level;
    // if (defaultFilters.isOnline > -1) filterParams.option = defaultFilters.isOnline;
    // if (defaultFilters.isOnline === 0) {
    //   filterParams.distance = defaultFilters.distance;
    // }
    dispatch(setFilters(defaultFilters))
    router.push('/search');
  };

  const verify = useCallback(async (token) => {
    createAxiosInstance().post(`/api/auth/verify`, { token }).then((response) => {
      SweetAlert.fire({
        // position: 'top-end',
        imageUrl: '/assets/success-icon.png',
        imageHeight: '100px',
        title: 'Success!',
        html: 'Your email has been verified.',
        // text: ' I will respond to you as soon as I can.   ---Meera Vasudeva---',
        width: 600,
        confirmButtonColor: '#0099FF',
        customClass: {
          icon: 'no-before-icon',
        },
      });
      // dispatch(setUser(response.data.userInfo))
      // setToken(response.data.token)
    }).catch(err => {
      console.log(err);
      showErrorMessage(err.response?.data?.message || 'Internal server error.')
    }).finally(() => router.push('/signin'))
  }, [dispatch, router])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    
    console.log("params"+params)
    const verifyToken = params.get('verify')
    if (verifyToken) {
      verify(verifyToken)
    }
  }, [ verify])


  const closeTour = () => {
    setIsTourOpen(false)
    createAxiosInstance().post('/api/auth/tour-completed', { page: 'home' }).then(({ data }) => {
      dispatch(syncDatabaseUser())
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (mainUser.userId) {
      const isTourDone = mainUser.pagesVisited.includes('home')
      if (!isTourDone) {
        setIsTourOpen(true)
      }
    }
  }, [mainUser])


  return (
    <div className='home-container'>
      <div className='main-card'>
        <div className='search-card'>
          <div className='main-title'>Looking for a Maths Tutor?</div>
          <div>
            <div className='sub-title'>Search for a Specialist Maths Tutor</div>
            <Image src={UnderCurve} alt="" />
          
          </div>
          <div className='search-box'>
            <FormControl className='select'>
              <InputLabel id="demo-simple-select-label">Maths Level</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level || ' '}
                  label="Maths Level"
                  onChange={handleLevelChange}
              >
                <MenuItem value=' '>Maths ( All )</MenuItem>
                <MenuItem value="7+/11+">Maths ( 7+/11+ )</MenuItem>
                <MenuItem value="Primary">Maths ( Primary )</MenuItem>
                <MenuItem value="Secondary">Maths ( Secondary )</MenuItem>
                <MenuItem value="GCSE">Maths ( GCSE )</MenuItem>
                <MenuItem value="A-level">Maths ( A-level )</MenuItem>
                <MenuItem value="Degree/Adult">Maths ( Degree/Adult )</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControl className='select'>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location < 0 ? '' : location}
                label="Location"
                onChange={handleLocationChange}
              >
                <MenuItem value={0}>Online</MenuItem>
                <MenuItem value={1}>Current Location</MenuItem>
                <MenuItem value={2}>Within 10 miles</MenuItem>
                <MenuItem value={3}>Within 20 miles</MenuItem>
                <MenuItem value={4}>Within 30 miles</MenuItem>
              </Select>
            </FormControl>
            {parseInt(location) > 0 && <FormControl className='select'>
              <TextField label="Postcode" variant="outlined" placeholder='Your postcode' value={postcode} onChange={(e) => setPostcode(e.target.value)} error={postcodeError} />
            </FormControl>} */}
            <Button variant="contained" className='button' onClick={search}>Search
            </Button>
          </div>
          <div className='levels-box'>
            <pre>11+     Primary     Secondary     GCSE     A Level     University</pre>
          </div>
        </div>
          <div className="containerr">
            <div className="image-box">
              <Image src={School} className="students-img" alt="students" />
            </div>
        </div>
      </div>
      <div className='description-card'>
        <div className='center'>
          <div className='title'>Welcome to the Maths Directory!</div>
          <div className='content'>
            If you're in search of a specialist maths
            tutor to support your child's learning
            journey, you've come to the right place. Our
            directory hosts a curated list of highly
            experienced tutors, each with a proven
            track record of exam success. Whether your
            child needs assistance with mastering
            timetables, preparing for the 11+, boosting
            confidence in primary maths, or tackling
            GCSE and A-level maths, you'll find the
            perfect match right here. Browse our
            directory to connect with tutors who are
            dedicated to helping your child excel in
            mathematics.
          </div>
        </div>
      </div>
      <Box component="section" sx={{ padding: '20px 40px 70px 20px' }}>
        <ContentCards />
      </Box>
      <AcrossCard />
      <Tour
        startAt={0}
        steps={isGuest ? homeStepsForGuest : homeStepsForTutor}
        showNavigation={true}
        onRequestClose={closeTour}
        rounded={15}
        isOpen={isTourOpen}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        lastStepNextButton={<Button size={'small'}>Finish</Button>}
        showNumber={false}
      />
    </div>
  )
}

export default Root;