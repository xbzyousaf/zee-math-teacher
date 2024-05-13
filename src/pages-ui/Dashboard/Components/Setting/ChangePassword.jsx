import {Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import React, { useState } from 'react';

import {createAxiosInstance} from "../../../../api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { toast } from 'react-toastify';

function ChangePassword(props) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickOpen = () => {
    setOpen(true);
    handleReset()
  };
  const handleClose = () => {
    setOpen(false);
    handleReset()
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setOldPasswordError(e.target.value.trim() ? '' : 'Old Password is required');
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError(
        e.target.value.trim()
            ? e.target.value.length >= 8
                ? ''
                : 'New Password should be more than 8 characters'
            : 'New Password is required'
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      if (!oldPassword) {
        setOldPasswordError('Old Password is required');
      }
      if (!newPassword) {
        setNewPasswordError('New Password is required');
      }
      return
    }
    if (!oldPasswordError && !newPasswordError && newPassword && oldPassword) {
      updatePassword();
    }
  };
  const handleReset = () => {
    setNewPassword('')
    setOldPassword('')
    setOldPasswordError('')
    setNewPasswordError('')
  }
  const updatePassword = async () => {
    setLoading(true)
    await createAxiosInstance()
        .patch(
            `/api/auth/changePassword`,
            { oldPassword, newPassword }
        )
        .then((res) => {
          handleClose();
          toast.success('Password updated successfully.')
          handleReset()
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message ?? 'Password not updated! Something went wrong.')
          console.log(err);

        }).finally(() =>{
          setLoading(false)
        })
  };
  return (
    <>
      <Button variant="outlined" color="error" onClick={handleClickOpen} fullWidth={props.isMobile}>
        Update Password
      </Button>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Password
        </DialogTitle>
        <DialogContent sx={{ width: '600px' }}>
          <Box
              component="form"
              sx={{ textAlign: 'center' }}
              onSubmit={handleSubmit}
          >
            <Box sx={{ margin: '15px 0px', textAlign: 'start' }}>
            <TextField
              value={oldPassword}
              onChange={handleOldPasswordChange}
              label="Old Password"
              type={showOldPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleOldPasswordVisibility} edge="end">
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                ),
              }}
            />
            {oldPasswordError && <Typography variant="caption" color="error">{oldPasswordError}</Typography>}
            </Box>
            <Box sx={{ margin: '15px 0px', textAlign: 'start' }}>
              <TextField
                value={newPassword}
                onChange={handleNewPasswordChange}
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleNewPasswordVisibility} edge="end">
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
              />
              {newPasswordError && <Typography variant="caption" color="error">{newPasswordError}</Typography>}
            </Box>
            <div style={{display: 'flex', justifyContent:'end'}}>
              <Button onClick={() => {
                handleClose();
              }} variant="default" style={{ fontFamily: 'Open Sans', minWidth: '90px', margin: '15px 0px' }}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={loading} style={{ fontFamily: 'Open Sans', minWidth: '90px', margin: '15px 0px' }}>
                {loading && (<CircularProgress size="24px" style={{ color: "white", marginRight: '0.50rem' }} />) }
                Update
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChangePassword;
