import React, { useState } from 'react'
import { EmailOutlined, HomeOutlined, IosShare, Laptop, Person, PhoneOutlined, Visibility } from '@mui/icons-material'
import { API_URL } from '../../../api'
import { Avatar, Box, Button, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import ShareProfileDialog from '../../../Components/Dialog/ShareProfile'
// import { LinkedIn, Twitter, Web, Instagram, Facebook } from '@mui/icons-material';

const MainBox = (props) => {
  const { tutor } = props
  const [showNumber, setShowNumber] = useState(false)
  const [openShareProfileDialog, setOpenShareProfileDialog] = useState(false)

  const router = useRouter()
  const {
    userId, isGuest, status
  } = useSelector((state) => state.main);
  const { user, avatar, /*address,*/ price, title, email, phone, level, gender, qualifications, online, faceToFace, address, _id } = tutor
  const { firstName, lastName } = user
  const qualificationsArray = Object.keys(qualifications).filter(qualification => qualifications[qualification] > 0 && qualification !== 'Student')
  const costText = value => `\u00A3${value}`;
  const maleAvatar = '/assets/image/user/male.png'
  const femaleAvatar = '/assets/image/user/female.png'
  const defaultAvatar = gender === 1 ? femaleAvatar : maleAvatar
  const userAvatar = avatar ? `${API_URL}${avatar}` : defaultAvatar
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCloseSharePopup = () => {
    setOpenShareProfileDialog(false)
  }
  const handleShowSharePopup = () => {
    setOpenShareProfileDialog(true)
  }
  return (
    <div className="box main bd-grey">
      <div >
        <Avatar
            alt="user avatar"
            src={userAvatar}
            sx={{ width: 170, height: 'auto', boxShadow: 2 }}
        />
      </div>
      <div className="description">
        <div className="text">
          <div className="text-header">
            <Box sx={{ flexGrow: 2 }}>
              <Box className="names" >
                <div>
                  <span className="name">{firstName}</span>&nbsp;
                  <span className="name">{lastName && lastName[0]}.</span>
                </div>
              </Box>
              <Box className="title blue">{title}</Box>
            </Box>
            <div className='price-option'>
              <div className='price'><span className="blue"> {costText(price[0])} - {price[1]}</span><span
                  className="grey"
                  style={{fontWeight: 'normal', fontSize: '18px'}}>&nbsp;hr</span></div>
              <div className='grey available-box'>
                {online && <span className="info-item grey"><Laptop fontSize="small" /> Online</span>}
                {faceToFace && <span className="info-item grey"><Person fontSize="small" /> In-person</span>}
              </div>
            </div>
          </div>
          <div className="info">
            {/* {address && <div className="info-item grey"><LocationOnOutlined /> {address}</div>} */}
            {email && email.length > 0 && <div className="info-item  semi-bold"><EmailOutlined /> { userId && !isGuest ? email : userId && isGuest && status === 1 ? email : '******@gmail.com' }</div>}
            {phone && phone.length > 0 &&  <div className="info-item semi-bold">
              <PhoneOutlined />
              <span>{userId && !isGuest ? phone : userId && isGuest && status === 1 ? phone : '*******000'}</span>
              {/*{showNumber ? <span>{phone} <span className='click' onClick={() => setShowNumber(false)}>Hide number</span></span> : <span className='click' onClick={() => setShowNumber(true)}>Show number</span>}*/}
            </div>}
            {userId && false && <div className="info-item semi-bold">
              <HomeOutlined />
              <span>{ address}</span>
              {/*{showNumber ? <span>{phone} <span className='click' onClick={() => setShowNumber(false)}>Hide number</span></span> : <span className='click' onClick={() => setShowNumber(true)}>Show number</span>}*/}
            </div>}
            {
                (email || phone) && !userId && <Tooltip title="Login to see Email & Phone" placement="right-start"
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
          <div className="info">
            {level && <div className="info-item"><span>Tutoring</span>: {Object.keys(level).filter(levelKey => level[levelKey]).map((levelKey, index, array) => {
              return <strong key={index}>{levelKey}{index < array.length - 1 && ',   '}</strong>
            })}</div>}
          </div>
          <div className="qualifications">
            {qualificationsArray.map((qualification, index) => (<span key={index} className="qualification blue bd-blue">{qualification}</span>))}
          </div>
        </div>
      <Box sx={{ textAlign: 'end' }}>
        <Tooltip title="Share Profile" placement="top"
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
            <Box
                sx={{ float: 'inline-end' }}
            >
              <Box
                  sx={{
                    mx: { md: 2 },
                    p: '7px 10px',
                    width: '120px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
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
                <IosShare fontSize='medium' color="primary" sx={{
                  ml: 0.7,
                  opacity: hovered ? 0.9 : 1, // Adjust opacity based on hover state
                }} width={24} />
              </Box>
            </Box>

        </Tooltip>
      </Box>
      {openShareProfileDialog && <ShareProfileDialog open={openShareProfileDialog} handleClose={handleCloseSharePopup} tutorId={_id} />}
      </div>
    </div>

  );
};

export default MainBox;
