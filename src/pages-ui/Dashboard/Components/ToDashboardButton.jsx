import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import './ToDashboardButton.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { KeyboardBackspace } from '@mui/icons-material'
import React from 'react'
const  ToDashboardButton = () => {

  const router = useRouter()

  const backToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="back-control">
    <div className="back" onClick={backToDashboard}><KeyboardBackspace/><span
      className="to-dashboard">&nbsp;Back to dashboard</span></div>
    </div>
  // <span onClick={() => {
  //   navigate('/dashboard?tab=profile')
  // }} className="link" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  //     <ArrowBackIosIcon fontSize="small"/>
  //     <span className="back-to-dashboard">Back to dashboard</span>
  //   </span>
  );
}

export default ToDashboardButton;