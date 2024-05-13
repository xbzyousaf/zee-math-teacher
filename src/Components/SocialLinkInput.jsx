import React, { useState } from 'react'
import { IconButton } from "@mui/material";
import {Delete, Facebook, LinkedIn, Instagram, Language } from "@mui/icons-material"
import { useDispatch } from "react-redux";
import { setLinks } from "../store/setProfile";
import  Twitter1  from '../../public/assets/images/twitter.svg';
import Image from 'next/image';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const icons = {
  'facebook' : <Facebook style={{ marginRight: '0.75rem', color: '#29adff'  }}/> ,
  'instagram' :<Instagram style={{ marginRight: '0.75rem', color: '#DD2A7B' }} /> ,
  'website' : <Language style={{ marginRight: '0.75rem', color: '#1e0656' }} />,
  'linkedin' :<LinkedIn style={{ marginRight: '0.75rem', color: '#0d4c94' }} /> ,
  'x' : <Twitter1 style={{ marginRight: '0.75rem', color: '#000000', width: "22px" }} />
}

const SocialLinkInput = (props) => {
  const [showOutlineLinkDeleteIcon, setShowOutlineLinkDeleteIcon] = useState(true)
  const { linkName, linkValue} = props;
  const dispatch = useDispatch()
  return (<div style={{width:'100%', display:'flex', alignItems:'center'}}>
    {icons[linkName]}<span style={{flex: 1, color: '#6a6a6a'}}>{linkValue}</span>
    <IconButton onMouseEnter={() => setShowOutlineLinkDeleteIcon(false)} onMouseLeave={() => setShowOutlineLinkDeleteIcon(true)} aria-label="delete" style={{ overflow:"clip" }} onClick={e => dispatch(setLinks({[linkName]:null}))} color="error">
      {showOutlineLinkDeleteIcon ? <CancelOutlinedIcon fontSize="medium" /> : <CancelRoundedIcon fontSize="medium" />}
    </IconButton></div>)
}

export default SocialLinkInput;