import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  setAbout,
  setGender,
  setLinks,
  setPublish,
  setTitle,
} from '../../../store/setProfile';
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import SocialLinkInput from '../../../Components/SocialLinkInput';
import UploadAvatar from '../Components/UploadAvatar';
import {countWords} from '../../../utils/string';
import ToDashboardButton from '../../Dashboard/Components/ToDashboardButton';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Step3 = (props) => {
  const maxWords = 190
  const { goBack, save, loading } = props
  const {
    title,
    about,
    gender,
    links,
    publish,
    isAgency,
  } = useSelector(state => state.profile.information)
  const [newLink, setNewLink] = useState(null)
  const [aboutWordCount, setAboutWordCount] = useState(countWords(about))
  const [error, setError] = useState({})
  const [linkError, setLinkError] = useState(false)
  const [isSocialPlatformSelected, setIsSocialPlatformSelected] = useState(null)
  const [showOutlineDeleteIcon, setShowOutlineDeleteIcon] = useState(true)
  const [showOutlineCheckIcon, setShowOutlineCheckIcon] = useState(true)

  const linkNames = [{ key: 'facebook', value: 'FaceBook' }, { key: 'instagram', value: 'Instagram' }, {
    key: 'x',
    value: 'X'
  }, { key: 'website', value: 'Website' }, { key: 'linkedin', value: 'Linkedin' }]
  const dispatch = useDispatch()

  useEffect(() => {
    setAboutWordCount(countWords(about))
  }, [about])

  const next = () => {
    // let newError = {}
    // if (isAgency < 0) {
    //   // newError['agency'] = true
    // } else {
    //   if (title.trim().length === 0) newError['title'] = true
    //   if (about.trim().length === 0) newError['about'] = true
    //   if (isAgency === 0 && gender < 0) newError['gender'] = true
    //   if (publish < 0) newError['publish'] = true
    // }
    //
    // setError(newError)
    // if (Object.keys(newError).length > 0 || newLink !== null) {
    //   let title = 'Please fill required fields.'
    //   if (newLink !== null) {
    //     title = 'Hey, it seems you are trying to add a social link, please complete that to move to next step.'
    //   }
    //   SweetAlert.fire({
    //     imageUrl: '/assets/error-icon.png',
    //     imageHeight: '100px',
    //     title: 'Oops...',
    //     text: title,
    //     confirmButtonColor: '#0099FF',
    //   })
    //   return
    // }
    save()
  }

  const back = () => {
    goBack()
  }

  const setNewTitle = (newTitle) => {
    dispatch(setTitle(newTitle))
  }

  const setNewAbout = (newAbout) => {
    dispatch(setAbout(newAbout))
  }

  const setNewGender = (newGender) => {
    newGender = parseInt(newGender)
    if (gender === newGender) return
    dispatch(setGender(newGender))
  }

  const addNewLink = () => {
    if (newLink) return
    setLinkError(false)
    setNewLink({
      linkName: '',
      linkValue: ''
    })
  }

  const deleteNewLink = () => {
    setNewLink(null)
    setLinkError(false)
    setIsSocialPlatformSelected(true)
  }

  const validateLink = (linkName, linkValue) => {
    let isValid = false
    switch (linkName) {
      case 'facebook':
        isValid = /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com)\/(?:[^\/?]+\/?|groups\/[^\/?]+\/?|pages\/[^\/?]+\/?)/gm.test(linkValue)
        break
      case 'instagram':
        isValid = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:[^\/?]+\/?|p\/[^\/?]+\/?|tv\/[^\/?]+\/?)/gm.test(linkValue)
        break
      case 'website':
        isValid = /^(?:https?:\/\/)?(?:www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/gm.test(linkValue);
        break
      case 'linkedin':
        isValid = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$.*/i.test(linkValue);
        break
      case 'x':
        const isValidTwitter = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$.*/i.test(linkValue)
        const isValidX = /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_]+\/?$.*/i.test(linkValue)

        isValid = isValidTwitter || isValidX
        break
      default:
        break
    }
    return isValid
  }

  const handleSocialLinkInputChange = (e) => {
    setNewLink({ ...newLink, linkValue: e.target.value })
    setLinkError(false)
  }
  const handleSaveLink = () => {
    if (!newLink.linkName) {
      setIsSocialPlatformSelected(false)
      return
    }
    const isValid = validateLink(newLink.linkName, newLink.linkValue)
    if (!newLink.linkValue || !isValid) {
      setLinkError(true)
      return
    }
    if (isValid && !linkError && isSocialPlatformSelected) {
      dispatch(setLinks({ [newLink.linkName]: newLink.linkValue }))
      setNewLink(null)
    }
  }

  const getSocialPlatformPlaceholder = (linkName) => {
    let placeholder
    switch (linkName) {
      case 'facebook':
        placeholder = 'e.g. www.facebook.com/example.user'
        break
      case 'instagram':
        placeholder = 'e.g. www.instagram.com/example.user'
        break
      case 'website':
        placeholder = 'e.g. www.example.co.uk'
        break
      case 'linkedin':
        placeholder = 'e.g. www.linkedin.com/in/example.user'
        break
      case 'x':
        placeholder = 'e.g. www.twitter.com/example.user'
        break
      default:
        placeholder = "Please add your selected profile url"
        break
    }
    return placeholder
  }

  const modules = {
    toolbar: [
      [{ 'list': 'bullet' }],
    ],
  };

  const formats = [
    'list', 'bullet',
  ];

  const handleChange = (value) => {
    setNewAbout(value);
    //
    // const wordCount = countWords(value);
    // if (wordCount > maxWords) {
    //   const truncatedContent = value.split(/\s+/).slice(0, maxWords).join(' ');
    //   setNewAbout(truncatedContent);
    // } else {
    //   setNewAbout(value);
    // }

    setError({}); // Clear any previous error
  };

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
          <Grid className="back-to-dashboard" style={{
            textAlign: 'right',
            justifyContent: 'end',
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center'
          }} item xs={1} sm={1} md={3}>
            <ToDashboardButton/>
          </Grid>
          <Grid item xs={11} sm={11} md={6} style={{ textAlign: 'center' }}>
            <p className="step-title blue" style={{ lineHeight: '30px' }}>
              <span>Create your tutor profile</span><br />
              <span style={{color: '#929292', fontSize: '16px', fontWeight: '400' }}>(Some sections requires completion)</span>
            </p>
          </Grid>
          <Grid item xs={0} sm={0} md={0}>
          </Grid>
        </Grid>
        <hr className="dashed-border" style={{ marginBottom: '2rem', width: '550px' }}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', width: '100%' }} className="name-box">
            {/*<FormControl className="name-box" style={{ marginTop: '1rem' }}>*/}
            {/*  <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1">Are you a private tutor or do you own*/}
            {/*    a tutoring agency?</FormLabel>*/}
            {/*  <RadioGroup*/}
            {/*    row*/}
            {/*    aria-labelledby="demo-row-radio-buttons-group-label"*/}
            {/*    name="row-radio-buttons-group"*/}
            {/*    defaultValue={-1}*/}
            {/*    value={isAgency}*/}
            {/*    onChange={(e) => dispatch(setIsAgency(e.target.value))} className="gender-select"*/}
            {/*    style={{ border: error['agency'] ? 'solid red 1px' : 0, borderRadius: '5px' }}*/}
            {/*  >*/}
            {/*    <FormControlLabel value={0} control={<Radio/>} label="Private tutor" className="grey"/>*/}
            {/*    <FormControlLabel value={1} control={<Radio/>} label="Own a tutoring agency" className="grey"/>*/}
            {/*  </RadioGroup>*/}
            {/*</FormControl>*/}
            {isAgency > -1 && <>
              <FormControl className="name-box">
                <FormLabel id="price-price"
                  className="mb-1"><span style={{ color: 'red' }}>*</span> {isAgency ? 'Write a title for you tutoring agency' : 'Write a title of your profile'}
                </FormLabel>
                <TextField variant="outlined" hiddenLabel style={{ margin: '0' }}
                 onChange={(e) => {
                   setNewTitle(e.target.value)
                   setError({})
                 }}
                 placeholder="E.g. Experienced and committed maths tutor. Limit: 50 characters"
                 error={error['title']} value={title} />
                {title.length >= 50 &&
                  <p style={{ fontSize: '15px', color: 'red', marginTop: '0px', marginBottom: '0px' }}>You have reached
                    the limit of 50 characters</p>}
              </FormControl>

              <FormControl style={{ marginTop: '1rem' }} className="name-box">
                <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1"><span style={{ color: 'red' }}>*</span> Upload a professional profile of
                  yourself{isAgency > 0 && ' or your company\'s logo'}</FormLabel>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="image-input">
                    <UploadAvatar/>
                  </div>
                </div>
              </FormControl>
              <FormControl className="name-box" style={{ margin: '1rem' }}>
                <FormLabel id="price-price" className="mb-1"><span style={{ color: 'red' }}>*</span> {isAgency ? 'About your agency' : 'About you'}
                </FormLabel>

                <ReactQuill theme="snow" value={about}
                    modules={modules}
                    formats={formats}
                    bounds={'.app-container'}
                    placeholder={isAgency ? 'Tell us about your tutoring agency e.g. experience, how long it has been established, what makes you different from other companies etc. Limit 190 words.' : 'Tell us about yourself e.g. experience as a maths tutor, teaching style or approach. Limit: 190 words.'}
                    onChange={handleChange}
                    style={{ marginBottom: '2.5rem'}}
                 />

                {/*<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>*/}
                {/*  <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>*/}
                {/*    <Typography*/}
                {/*      style={{*/}
                {/*        fontSize: '14px',*/}
                {/*        color: aboutWordCount < maxWords ? 'green' : '#da1e28',*/}
                {/*        marginTop: '0px',*/}
                {/*        marginRight: '10px',*/}
                {/*        marginBottom: '0px',*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      {aboutWordCount < maxWords ? `${maxWords - aboutWordCount} words left.` : 'You have reached your maximum words.'}*/}
                {/*    </Typography>*/}
                {/*    {aboutWordCount < maxWords ? (*/}
                {/*      <CheckCircleOutlineIcon fontSize="inherit" style={{ color: 'green', marginLeft: '2px' }}/>*/}
                {/*    ) : (*/}
                {/*      <CheckCircleIcon fontSize="inherit" style={{ color: '#da1e28', marginLeft: '2px' }}/>*/}
                {/*    )}*/}
                {/*  </div>*/}
                {/*</Box>*/}
              </FormControl>
              {isAgency > 0 || <FormControl className="name-box" style={{ marginTop: '1rem' }}>
                <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1"><span style={{ color: 'red' }}>*</span> Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={-1}
                  value={gender}
                  onChange={(e) => setNewGender(e.target.value)} className="gender-select"
                  style={{ border: error['gender'] ? 'solid red 1px' : 0, borderRadius: '5px' }}
                >
                  <FormControlLabel value="0" control={<Radio/>} label="Male" className="grey"/>
                  <FormControlLabel value="1" control={<Radio/>} label="Female" className="grey"/>
                  <FormControlLabel value="2" control={<Radio/>} label="Other" className="grey"/>
                </RadioGroup>
              </FormControl>}
              <FormControl className="name-box" style={{ marginTop: '1rem' }}>
                <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1">Allow my profile to be published on
                  search engines e.g. google, safari <span style={{ color: '#929292', fontSize: '16px' }}>(Optional)</span></FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={publish}
                  onChange={(e) => dispatch(setPublish(parseInt(e.target.value)))} className="gender-select"
                  style={{ border: error['publish'] ? 'solid red 1px' : 0, borderRadius: '5px' }}
                >
                  <FormControlLabel value="0" control={<Radio/>} label="Yes" className="grey"/>
                  <FormControlLabel value="1" control={<Radio/>} label="No" className="grey"/>
                </RadioGroup>
              </FormControl>
              <FormControl className="name-box" style={{ marginTop: '1rem', gap: '0.5rem' }}>
                <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1">Social Links <span
                    style={{ color: '#929292', fontSize: '16px' }}>(Optional)</span></FormLabel>
                  {Object.keys(links).filter(key => links[key]).map((key, index) => (
                  <SocialLinkInput key={index} linkName={key} linkValue={links[key]}/>
                ))}
                {newLink && (
                  <>
                    <div>
                    <div className="first-control">
                      <div style={{ flex: 3 }}>
                        <FormControl style={{ width: '100%' }}>
                          <InputLabel id="demo-simple-select-helper-label">Social Platform</InputLabel>
                          <Select
                              labelId="demo-simple-select-helper-label"
                          value={newLink['linkName']}
                          onChange={(e) => {
                            setNewLink({
                              linkName: e.target.value,
                              linkValue: '',
                            })
                            setLinkError(false)
                            setIsSocialPlatformSelected(true)
                          }}
                          label="Social Platform"
                          displayEmpty
                          error={isSocialPlatformSelected === false}
                        >
                          {linkNames.filter(linkName => !links[linkName.key]).map((linkName, index) => <MenuItem
                            key={index} value={linkName.key}>{linkName.value}</MenuItem>)}
                          {
                            Object.keys(links)
                          }
                        </Select>
                        </FormControl>
                      </div>
                      <div style={{flex: 7}}>
                        <TextField variant="outlined" hiddenLabel
                           style={{width: '100%', margin: '0'}} value={newLink?.linkValue}
                           placeholder={newLink?.linkName !== '' ? getSocialPlatformPlaceholder(newLink?.linkName) : getSocialPlatformPlaceholder()}
                           onChange={handleSocialLinkInputChange}
                           disabled={!isSocialPlatformSelected}
                           error={!!linkError}/>
                      </div>
                      {newLink.linkValue && (
                        <div>
                          <IconButton
                            onMouseEnter={() => {
                              setShowOutlineCheckIcon(false);
                            }}
                            onMouseLeave={() => {
                              setShowOutlineCheckIcon(true);
                            }}
                            aria-label="delete" style={{ flex: '0' }} onClick={handleSaveLink}
                                      color="success">
                            {showOutlineCheckIcon ? <CheckCircleOutlineIcon fontSize="large"/> : <CheckCircleRoundedIcon fontSize="large"/>}
                          </IconButton>
                          <IconButton
                          onMouseEnter={() => {
                            setShowOutlineDeleteIcon(false);
                          }}
                          onMouseLeave={() => {
                            setShowOutlineDeleteIcon(true);
                          }}
                          aria-label="delete" style={{ flex: '0' }}
                          onClick={() => deleteNewLink(newLink.linkName)} color="error">
                            {showOutlineDeleteIcon ? <CancelOutlinedIcon fontSize="large"/> : <CancelRoundedIcon fontSize="large" />}
                          </IconButton>
                        </div>
                      )}
                    </div>
                      <div className="first-control">
                        <p style={{
                          margin: '0px',
                          flex: 3,
                          fontSize: '14px',
                          marginBottom: '0px',
                          color: 'red'
                        }}> {isSocialPlatformSelected === false && 'Please select the platform!'} </p>
                        <p style={{
                          flex: 7,
                          margin: '0px',
                          marginBottom: '0px',
                        fontSize: '14px',
                        color: 'red'
                      }}> {linkError && newLink?.linkName && newLink?.linkValue !== '' ? `Hey, this seems wrong, please enter the correct URL format for ${newLink.linkName && newLink.linkName[0].charAt(0).toUpperCase() + newLink.linkName.slice(1) }!` : linkError && newLink?.linkName && newLink?.linkValue === '' ? `Please enter your URL for ${newLink.linkName && newLink.linkName[0].charAt(0).toUpperCase() + newLink.linkName.slice(1) }` : ''} </p>
                      <div style={{ flex: 1, }}></div>
                    </div>
                    </div>
                  </>)}
                <div className="name-box"
                     style={{display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem'}}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={addNewLink}
                    disabled={Object.keys(links).filter(key => !links[key]).length === 0 || !!newLink}
                    className={Object.keys(links).filter(key => !links[key]).length === 0 || newLink ? '' : 'bg-blue'}
                  >
                    Add Link
                  </Button>
                </div>
              </FormControl>
            </>}

            <span className="button-box">
              <Button
                type="button"
                variant="outlined"
                size="large"
                className="blue bd-blue"
                // onClick={save}
                onClick={back}
              >
                Back
              </Button>
              <div>
                {/*<Button*/}
                {/*  type="button"*/}
                {/*  variant="contained"*/}
                {/*  size="large"*/}
                {/*  onClick={back}*/}
                {/*  className="bg-blue"*/}
                {/*>*/}
                {/*  Back*/}
                {/*</Button>*/}
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
  )
}

export default Step3
