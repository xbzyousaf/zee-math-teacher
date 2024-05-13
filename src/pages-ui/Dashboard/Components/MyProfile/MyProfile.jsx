import React from 'react'
import {
  Laptop,
  EmailOutlined,
  Facebook,
  Instagram, Language,
  LinkedIn,
  Person,
  PhoneOutlined,

} from '@mui/icons-material'
import { Button, Avatar } from '@mui/material'
import './MyProfile.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { API_URL } from '../../../../api'
import  Twitter from '../../../../../public/assets/images/twitter.svg'
import Image from 'next/image';

import {isProfileCompleted} from "../../../../utils";
import ProfileStepInformationStatuses from "../../../Profile/Components/ProfileStepInformationStatuses";

const MyProfile = (props) => {
  const maleAvatar = '/assets/image/user/male.png'
  const femaleAvatar = '/assets/image/user/female.png'
  const defaultUserAvatar = '/assets/image/user/User-avatar.svg.png'

  const socialLinkIcons = {
    facebook: <Facebook style={{ marginRight: '0.2rem', color: '#29adff' }}/>,
    website: <Language style={{ marginRight: '0.2rem', color: '#1e0656' }}/>,
    linkedin: <LinkedIn style={{ marginRight: '0.2rem', color: '#0d4c94' }}/>,
    instagram: <Instagram style={{ marginRight: '0.2rem', color: '#DD2A7B' }}/>,
    x: <Twitter style={{ marginRight: '0.2rem', color: '#000000', width: '22px' }}/>,
  }
  const router = useRouter()
  const profileUser = useSelector((state) => state.profile.user);
  const {
    avatar,
    /*address,*/ about,
    price,
    qualifications,
    title,
    online,
    faceToFace,
    gender,
    isAgency,
    links,
    publish,
    email,
    phone,
    exam,
    level,
    _id,
    status,
  } = useSelector((state) => state.profile.user)
  const { firstName, lastName, status: accountStatus, } = useSelector(
    (state) => state.main
  )
  const qualificationArray = Object.keys(qualifications).filter(
    (key) => qualifications[key] > 0 && key !== 'Student'
  )
  const availableLinkObject = {}
  Object.keys(links)
    .filter((key) => links[key])
    .forEach((key) => (availableLinkObject[key] = links[key]))
  const costText = (value) => `\u00A3${value}`
  const defaultAvatar =
    gender === 1 ? femaleAvatar : gender === 0 ? maleAvatar : defaultUserAvatar
  const userAvatar = avatar ? `${API_URL}${avatar}` : defaultAvatar

  return (
    <div className="my-profile bd-grey">
      {/* <div className="billed" style={{backgroundColor: mark !== 'Expired' ? '#0262C2' : '#e2ad00'}}>{mark}</div> */}
      <div>
        {_id && status >= 0 && accountStatus >= 0 && profileUser?.isSubmitted && (
          <Avatar
            alt="user avatar"
            src={userAvatar}
            sx={{ width: 170, height: 'auto', boxShadow: 2 }}
          />
        )}
      </div>
      <div className="description">
        <div className="tutor-profile-header" >
          <div className="text">
            {_id && status >= 0 && accountStatus >= 0 && profileUser?.isSubmitted ? (
              <>
                <div className="main-text">
                  <div className="names">
                    <span className="name">{firstName}</span>
                    <span className="name">{lastName}</span>
                  </div>
                  <div className="title blue">{title}</div>
                </div>
                <div className="info">
                  <div className="info-items">
                    { email && <strong className="info-item">
                      <EmailOutlined/> {email}
                    </strong>}
                    {phone && <strong className="info-item">
                      <PhoneOutlined/> {phone}
                    </strong>}
                  </div>
                </div>
              </>
            ) : (
              <div className="main-text" style={{ padding: '1rem', paddingLeft: 0 }}>
                <div className="names">
                  <span className="alert">
                    {!_id
                      ? 'You haven\'t created a profile yet.'
                        : accountStatus === 2 ? 'Your profile is deactivated.'
                          : status === 0 && accountStatus === 0 && isProfileCompleted(profileUser) && !profileUser?.isSubmitted
                            ? 'Completed tutoring profile, submit for approval.'
                            : status === 0 && accountStatus === 0 && !profileUser?.isSubmitted ? 'Profile saved as draft, but not submitted.'
                              : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            {
                isProfileCompleted(profileUser) && status === 0 && <Button
                    variant="contained"
                    className='mt-2'
                    color="primary"
                    style={{ textWrap: 'nowrap', marginRight: '10px' }}
                    onClick={() => window.open(`/tutor/${_id}`)}
                >
                  View profile
                </Button>
            }
            <Button
              variant="contained"
              style={{ textWrap: 'nowrap' }}
              onClick={() => isProfileCompleted(profileUser) && status === 0 ? (profileUser.isSubmitted ? router.push('/profile?step=0') : router.push('/profile?step=6')) : router.push('/profile')}
              className={'clear mt-2'}
            >
              { !_id ? 'Create profile' : _id && isProfileCompleted(profileUser) && status === 0 && !profileUser?.isSubmitted ? 'Submit profile for review' : 'Edit profile' }
            </Button>
          </div>
        </div>
        {_id && status === 0 && accountStatus === 0 && !profileUser?.isSubmitted && (
          <div style={{ maxWidth: '700px', margin: '10px 0px' }}>
            <ProfileStepInformationStatuses />
          </div>
        )}
        {_id && status >= 0 && accountStatus >= 0 && profileUser?.isSubmitted && (
          <>
            <hr className="dashed-border" />
            <div className="tutor-body">
              <div className="right-side">
                <div className="price">
                  <span className="blue">
                    {costText(price[0])} - {price[1]}
                  </span>
                  <span className="grey" style={{fontWeight: 'normal', fontSize: '18px'}}>&nbsp;hr</span>
                </div>
                <div className="available">
                  {online && (
                    <span className="info-item grey">
                      <Laptop fontSize="small" /> Online
                    </span>
                  )}
                  {faceToFace && (
                    <span className="info-item grey">
                      <Person fontSize="small" /> In-person
                    </span>
                  )}
                </div>
              </div>
              <div className="about" style={{ width: '85%' }}>
                <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }} className="grey">
                  {about}
                </pre>
              </div>
              {level && (
                <pre style={{ margin: '0.5rem 0', textWrap: 'pretty' }}>
                  <span>Tutoring: </span>
                  {Object.keys(level)
                    .filter((levelKey) => level[levelKey])
                    .map((levelKey, index, array) => {
                      return (
                        <strong key={index}>
                          {levelKey}
                          {index < array.length - 1 && ', '}
                        </strong>
                      )
                    })}
                </pre>
              )}
              {qualificationArray.length > 0 && (
                <>
                  <h3 className="qualification-title">
                    <strong>Qualifications:</strong>
                  </h3>
                  <div className="qualifications">
                    {qualificationArray.map((qualification, index) => (
                        <span key={index} className="qualification blue bd-blue">
                          {qualification}
                        </span>
                    ))}
                  </div>
                </>
              )}
              {Object.keys(availableLinkObject).length > 0 && (
                <h3 className="qualification-title">
                  <strong>Social Links: </strong>
                </h3>
              )}
              <div className="social-links-container">
                {Object.keys(availableLinkObject).map((linkName, index) => (
                  <div key={index}>
                    <Link
                      href={'//'+availableLinkObject[linkName]}
                      className="qualification social-link blue bd-blue no-underline"
                      target="_blank"
                    >
                      {socialLinkIcons[linkName]}
                      <span>{availableLinkObject[linkName]}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyProfile
