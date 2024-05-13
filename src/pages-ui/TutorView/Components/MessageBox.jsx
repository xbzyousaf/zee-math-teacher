import React, {useState} from 'react';
import Textarea from '../../../Components/TextArea';
import { Button, CircularProgress } from '@mui/material'
import {createAxiosInstance} from '../../../api';
import SweetAlert from 'sweetalert2'
import {useSelector} from 'react-redux';
import { useRouter,useParams } from 'next/navigation'
const MessageBox = (props) => {
  const { tutor } = props
  const params = useParams(); // const tutorId = router.query.tutorId;
  const tutorId = params.tutorId;
  const {
    _id: tutorProfileId
  } = useSelector((state) => state.profile.information);
  const router = useRouter()
  const [message, setMessage] = useState('')
  const {userId} = useSelector(state => state.main)
  const [sendStatus, setSendStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendMessage = (e) => {
    e.stopPropagation()
    if (message.trim().length === 0) {
      SweetAlert.fire({
        icon: 'error',
        imageHeight: '100px',
        title: 'Oops...',
        text: 'Your message is empty, please input your message.',
        confirmButtonColor: '#0099FF',
      });
      return
    }
    if(!userId) {
      SweetAlert.fire({
        // position: 'top-end',
        icon: 'info',
        iconColor: '#1976d2',
        imageHeight: '100px',
        title: 'Confirm',
        html: "You need to <a href='/signin'>sign in</a> or <a href='/signup?guest'>sign up</a> to send a message.",
        width: 600,
        confirmButtonColor: '#1976d2',
        cancelButtonColor: 'rgb(255 0 0 / 76%)',
        showCancelButton: true,
        confirmButtonText: 'Sign Up',
        customClass: {
          icon: 'no-before-icon',
        },
      }).then((result) => {
        if(result.isConfirmed){
          router.push('/signup?guest')
        }
      });
      return
    }
    setLoading(true)
    createAxiosInstance().post(`/api/messages`, {userId: tutor.user._id, content: message}).then((response) => {
      setMessage('')
      setSendStatus(true)
      setTimeout(() => setSendStatus(false), 1000);
    }).catch(err => {
      console.log(err);
      SweetAlert.fire({
        imageUrl: '/assets/error-icon.png',
        imageHeight: '100px',
        title: 'Oops...',
        text: err?.response?.message || 'Message send failed, please try again.',
        confirmButtonColor: '#0099FF',
      });
    }).finally(() => setLoading(false))
  }
  return (
    <div className="box message bd-grey " style={{ pointerEvents: tutorId === tutorProfileId ? 'none' : '', opacity: tutorId === tutorProfileId ? '0.6' : '' }} aria-disabled={tutorId === tutorProfileId}>
      <h3 style={{ margin: '0 0 0.5rem 0rem' }}>Message {tutor.user.firstName}</h3>
      {
          !sendStatus &&
          <Textarea minRows={5} style={{ width: '100%', resize: "vertical" , fontSize: "17px"}} placeholder='Type your message here' onChange={(e) => setMessage(e.target.value)} value={message} className='grey' />
      }

      {
          sendStatus &&
          <div style={{height: "148px", width: '100%', backgroundColor: "white", display: "flex" , justifyContent: "center", alignItems: "center" , fontSize: "22px" , color: '#00AB55'}}>
            Message sent!
          </div>
      }

      <div className="message-button-box">
        <Button
          disabled={loading || tutorId === tutorProfileId}
          type="button"
          variant="contained"
          className={loading || tutorId === tutorProfileId ? '' : 'bg-blue'}
          onClick={sendMessage}
        >
          {loading && (<CircularProgress size="24px" style={{ color: "white", marginRight: '0.75rem' }} />)}
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageBox;
