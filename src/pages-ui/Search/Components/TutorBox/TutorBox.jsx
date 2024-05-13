import React, { useState} from 'react'
import {
  EmailOutlined,
  IosShare,
  Laptop,
  LocationOnOutlined,
  Person,
  PhoneOutlined,
  Visibility
} from '@mui/icons-material'
import {Avatar, Box, Button, Grow, IconButton, Tooltip} from '@mui/material'
import './TutorBox.css'
import { useRouter,useSearchParams } from 'next/navigation'
import { API_URL } from '../../../../api'
import { useSelector } from 'react-redux'
import ShareProfileDialog from '../../../../Components/Dialog/ShareProfile'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const TutorBox = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { tutor } = props;
  const [openShareProfileDialog, setOpenShareProfileDialog] = useState(false)
  const { _id, user, avatar, realDistance,email,phone, about, price, qualifications, title, online, faceToFace, gender, level, address } = tutor
  const {firstName, lastName} = user || {}
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const {
    userId, isGuest, status
  } = useSelector((state) => state.main);
  const costText = value => value !== undefined ? `\u00A3${value}` : '';
  const maleAvatar = '/assets/image/user/male.png'
  const femaleAvatar = '/assets/image/user/female.png'
  const defaultAvatar = gender === 1 ? femaleAvatar : maleAvatar
  const userAvatar = avatar ? `${API_URL}${avatar}` : defaultAvatar
  const [readMoreAbout, setReadMoreAbout] = useState(false)
  const handleReadMore = (e, value) => {
    e.stopPropagation()
    setReadMoreAbout(value)
  }
  const handleClick = () => {
    router.push(`/tutor/${_id}${searchParams}`)
  }

  const handleCloseSharePopup = () => {
    setOpenShareProfileDialog(false)
  }
  const handleShowSharePopup = () => {
    setOpenShareProfileDialog(true)
  }
  const cutAbout = (inputString, maxLength) => {
    const stringWithoutTags = inputString.replace(/<[^>]+>/g, '');
    const truncatedString = stringWithoutTags.slice(0, maxLength);

    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
    const finalTruncatedString = lastSpaceIndex !== -1 ? truncatedString.slice(0, lastSpaceIndex) : truncatedString;

    const stringWithTags = inputString.slice(0, stringWithoutTags.length - stringWithoutTags.length + finalTruncatedString.length);

    return stringWithTags;
  }

  return (
    <div className="tutor-box bd-grey">
      <div>
        {/*<div className="image" style={{backgroundImage: `url(${userAvatar})`}}></div>*/}
        <Avatar
            alt="user avatar"
            src={userAvatar}
            sx={{ width: 170, height: 'auto', boxShadow: 2 }}
        />
      </div>
      <div className="description">
        <div className="tutor-header">
          <div className="text">
            <div className="main-text">
              <div className="names">
                <span className="name">{firstName}</span>&nbsp;
                <span className="name">{lastName && lastName[0]}.</span>
              </div>
              <div className="title blue">{title}</div>
            </div>
            {email || phone || realDistance ?
              <div className={ userId ? 'auth info' : "info"} style={{ justifyContent: 'normal', gap: '15px' }}>
                {email && <div className="info-item label semi-bold"><EmailOutlined
                  fontSize="small"/> { userId && !isGuest ? email : userId && isGuest && status === 1 ? email : '******@gmail.com' }</div>}
                {phone &&
                  <div className="info-item label semi-bold"><PhoneOutlined fontSize="small"/> {userId && !isGuest ? phone : userId && isGuest && status === 1 ? phone : '*******000'}
                  </div>}
                {realDistance !== undefined &&
                  <div className="info-item label semi-bold green distance"><LocationOnOutlined/>
                    <strong> {realDistance.toFixed(1)} miles </strong></div>
                }
                {
                  !userId && <Tooltip title="Login to see Email & Phone" placement="right-start"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [6, -5],
                            },
                          },
                        ],
                      },
                    }}
                    arrow
                  >
                    <IconButton style={{ overflow:"clip" }} onClick={() => router.push('/signin')}>
                      <Visibility fontSize='medium' color="primary" />
                    </IconButton>
                  </Tooltip>
                }
              </div>
              : ''
            }

          </div>
          <Box className="button" sx={{ mt: { xs: 2, sm: 0 } }}>
            {/*<span style={{ fontSize: '15px' }}>{ userId && address ? address : ''} </span>*/}
            <span style={{ fontSize: '15px' }}></span>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box
                  sx={{
                    m: { xs: 1, md: 0 },
                    mr: { xs: 0, md: 1 },
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadow: 1,
                    cursor: 'pointer',
                    transform: hovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.2s ease', // Apply transition effect
                  }}
                  onClick={handleShowSharePopup}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
              >
                Share
                  <IosShare fontSize='medium'
                  color="primary"
                  sx={{
                    ml: 0.7,
                    opacity: hovered ? 0.9 : 1, // Adjust opacity based on hover state
                  }} width={24} />
              </Box>
              <Button variant="contained" style={{ textWrap: 'nowrap' }}
                onClick={handleClick}
              >
                View Profile
              </Button>
            </Box>
          </Box>
        </div>
        <hr className="dashed-border"/>
        <div className="tutor-body">
          <div className="right-side">
            <div className="price">
              <span className="blue">{costText(price && price[0])} - {price && price[1]}</span><span className="grey"
                                                                                                     style={{
                                                                                                       fontWeight: 'normal',
                                                                                                       fontSize: '18px'
                                                                                                     }}>&nbsp;hr</span>
            </div>
            <div className="available">
              {online && <span className="info-item grey"><Laptop fontSize="small" /> Online</span>}
              {faceToFace && <span className="info-item grey"><Person fontSize="small" /> In-person </span>}
            </div>
          </div>
          <div className="main-side">
            {about && about.length <= 100 && about.split('\n').length < 3 ?
                <pre style={{margin: 0}} className="grey">
                  <span dangerouslySetInnerHTML={{__html: about}}/>
                </pre> :
                about ? (!readMoreAbout ?
                <pre style={{margin: '0'}} className="grey">
                  <span dangerouslySetInnerHTML={{__html: cutAbout(about, 165)}} />
                  <div className="read-more blue" style={{ marginTop: '10px' }}>
                    <div style={{cursor: "pointer", borderBottom: '1px solid #0262C2', fontSize: '14px', fontWeight: 'bold', display: 'flex', width: 'fit-content'}}
                         onClick={(e) => handleReadMore(e, true)}
                    >Read more
                    <ArrowRightAltIcon fontSize="small" color="#0262c2" style={{ marginLeft: '10px' }} /></div>
                    </div>
                </pre> : <pre style={{width: "80%", margin: 0,}} className="grey">
                      <span dangerouslySetInnerHTML={{__html: about}}/>
                      <div className="read-more blue" style={{ marginTop: '10px' }}>
                        <div style={{cursor: "pointer", borderBottom: '1px solid #0262C2', fontSize: '14px', fontWeight: 'bold', display: 'flex', width: 'fit-content'}}
                             onClick={(e) => handleReadMore(e, false)}
                        >Read less
                        <ArrowRightAltIcon fontSize="small" color="#0262c2" style={{marginLeft: '10px', transform: "rotate(360deg) scaleX(-1)" }}/></div>
                      </div>
                    </pre>) : ''

            }
            {level && <pre style={{
              margin: '0.5rem 0',
              textWrap: 'pretty',
              marginTop: '10px'
            }}>Tutoring: {Object.keys(level).filter(levelKey => level[levelKey]).map((levelKey, index, array) => {
              return <strong key={index}>{levelKey}{index < array.length - 1 && ",  "}</strong>
            })}</pre>}
            <div className="qualifications">
            {Object.keys(qualifications)
  .filter(qualification => qualifications[qualification] && qualification !== 'Student' && qualifications[qualification] > 0)
  .map((qualification, index) => (
    <span key={index} className="qualification blue bd-blue">{qualification}</span>
  ))}
            </div>
          </div>
        </div>
      </div>
      {openShareProfileDialog && <ShareProfileDialog open={openShareProfileDialog} handleClose={handleCloseSharePopup} tutorId={_id} />}
    </div>
  )
}

export default TutorBox;