import React from 'react';
import './Setting.css';
import {Stack, useMediaQuery} from '@mui/material';
import Confirm from './Confirm';
import {useSelector} from 'react-redux';
import ChangePassword from './ChangePassword';

const Setting = () => {
  const isMobile = useMediaQuery("(max-width: 1020px)");
  const { status } = useSelector((state) => state.profile.user);
  return (
    <div className="settings bd-grey">
      <h3>Account Setting</h3>
      <Stack spacing={2} direction={isMobile ? "column" : "row"} style={{ flexWrap: 'wrap', gap: '10px' }}>
        <Confirm isMobile={isMobile}/>
        {/*{(status === 0 || status === 1) && <Confirm deactivate isMobile={isMobile}/>}*/}
        {/*<ConfirmType isMobile={isMobile} />*/}
        <ChangePassword isMobile={isMobile} />
      </Stack>
    </div>
  );
};

export default Setting;
