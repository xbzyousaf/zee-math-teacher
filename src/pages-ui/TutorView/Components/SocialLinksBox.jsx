import React from 'react';
import {Instagram, LinkedIn, Facebook, Language, Visibility} from '@mui/icons-material';

import Twitter  from '../../../../public/assets/images/twitter.svg';
import Image from 'next/image';
import {IconButton, Tooltip} from "@mui/material";
import {useSelector} from "react-redux";
import { useRouter } from 'next/navigation'

const SocialLinksBox = (props) => {
  const { links: socialLinks } = props.tutor
  const count = socialLinks ? Object.keys(socialLinks).filter(key => socialLinks[key]).length : 0
  const router = useRouter()
  const {
    userId, status, isGuest
  } = useSelector((state) => state.main);

  return (
    <div className="box links bd-grey">
      <div  style={{ margin: '0 0 0.5rem 0rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: '0px' }}>My social links</h3>
        {
          !userId && <Tooltip title="Login to access social profiles" placement="top-start"
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
      {count > 0 ? (<>{ socialLinks?.facebook ? (userId && !isGuest ?
          <a href={'//' + socialLinks.facebook} target='_blank' rel='noreferrer' className='social-link no-underline'>
            <Facebook
                style={{marginRight: '0.75rem', color: '#29adff'}}/> Facebook</a> : userId && isGuest && status === 1 ?
              <a href={'//' + socialLinks.facebook} target='_blank' rel='noreferrer'
                 className='social-link no-underline'> <Facebook
                  style={{marginRight: '0.75rem', color: '#29adff'}}/> Facebook</a> :
              <div className='social-link'><Facebook style={{marginRight: '0.75rem', color: '#29adff'}}/> Facebook
              </div>) : ''}
        {socialLinks?.instagram ? (userId && !isGuest ?
            <a href={'//' + socialLinks.instagram} target='_blank' rel='noreferrer'
               className='social-link no-underline'> <Instagram
                style={{marginRight: '0.75rem', color: '#DD2A7B'}}/> Instagram</a> : userId && isGuest && status === 1 ?
                <a href={'//' + socialLinks.instagram} target='_blank' rel='noreferrer'
                   className='social-link no-underline'> <Instagram
                    style={{marginRight: '0.75rem', color: '#DD2A7B'}}/> Instagram</a> :
                <div className='social-link'><Instagram style={{marginRight: '0.75rem', color: '#DD2A7B'}}/> Instagram
                </div>) : ''}
        {socialLinks?.x ? (userId && !isGuest ?
                <a href={'//' + socialLinks.x} target='_blank' rel='noreferrer' className='social-link no-underline'>
                  <Twitter style={{marginRight: '0.75rem', color: '#000000'}}/> X</a>
            : userId && isGuest && status === 1 ?
                <a href={'//' + socialLinks.x} target='_blank' rel='noreferrer' className='social-link no-underline'>
                  <Twitter style={{marginRight: '0.75rem', color: '#000000'}}/> X</a>
                :
            <div className='social-link'><Twitter style={{marginRight: '0.75rem', color: '#000000'}}/> X </div> ) : ''}
        {socialLinks?.linkedin ? (userId && !isGuest ?
            <a href={'//' + socialLinks.linkedin} target='_blank' rel='noreferrer' className='social-link no-underline'>
              <LinkedIn style={{marginRight: '0.75rem', color: '#0d4c94' }} /> Linkedin</a>
            : userId && isGuest && status === 1 ? <a href={'//' + socialLinks.linkedin} target='_blank' rel='noreferrer'
                                                     className='social-link no-underline'>
                  <LinkedIn style={{marginRight: '0.75rem', color: '#0d4c94'}}/> Linkedin</a>
                : <div className='social-link'><LinkedIn style={{marginRight: '0.75rem', color: '#0d4c94'}}/> LinkedIn
                </div>) : ''}
        {socialLinks?.website ? (userId && !isGuest ?
            <a href={'//' + socialLinks.website} target='_blank' rel='noreferrer' className='social-link no-underline'>
              <Language style={{marginRight: '0.75rem', color: '#1e0656' }} /> Website</a>
            : userId && isGuest && status === 1 ?
                <a href={'//' + socialLinks.website} target='_blank' rel='noreferrer'
                   className='social-link no-underline'>
                  <Language style={{marginRight: '0.75rem', color: '#1e0656'}}/> Website</a>
                : <div className='social-link'><Language style={{marginRight: '0.75rem', color: '#1e0656'}}/> Website
                </div>) : ''}</>) : <p style={{textAlign: 'center', color: 'darkgray'}}><i>No Link</i></p>}
    </div>

  );
};

export default SocialLinksBox;
