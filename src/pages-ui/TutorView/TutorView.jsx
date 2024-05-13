import React, { useEffect, useState } from 'react';
import './TutorView.css';
import MainBox from './Components/MainBox';
import AboutBox from './Components/AboutBox';
import MessageBox from './Components/MessageBox';
import SocialLinksBox from './Components/SocialLinksBox';
import ControlBar from './Components/ControlBar';
import { useRouter } from 'next/navigation'

import SweetAlert from 'sweetalert2'
import axios from 'axios';
import { API_URL } from '../../api';
import {useSelector} from "react-redux";

const TutorView = ({tutorId}) => {
 
const router = useRouter()
console.log("tutorId11",tutorId);

  const [tutor, setTutor] = useState(null)
  const {
    _id: tutorProfileId
  } = useSelector((state) => state.profile.information);

  useEffect(() => {
    axios.get(`${API_URL}/api/teachers/${tutorId}`).then((res) => {
      if(!res.data) {
        router.push('/search')
        return showErrorMessage('Fetch tutor profile failed.')
      }
      setTutor(res.data)
    }).catch((err) => {
      console.log(err);
      router.push('/search')
      showErrorMessage(err.response?.data?.message || 'Fetch tutor profile failed.')
    })
  }, [router, setTutor, tutorId])

  const showErrorMessage = (message) => {
    SweetAlert.fire({
      imageUrl: '/assets/error-icon.png',
      imageHeight: '100px',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#0099FF',
    });
  }

  return (<>
    {tutor && <div className='tutor-view-container'>

      <ControlBar tutor={tutor}/>
      <div className='tutor-view-box'>
        <div className="left-container">
          <MainBox tutor={tutor} />
          <AboutBox tutor={tutor} />
        </div>
        <div className="right-container">
          <MessageBox tutor={tutor}  />
          <SocialLinksBox tutor={tutor} />
        </div>
      </div>
    </div>}
  </>
  );
};

export default TutorView;
