import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_URL, createAxiosInstance } from '../../../../api';
import { showErrorMessage } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/main';
import { initProfile, setStatus } from '../../../../store/setProfile';

export default function Confirm(props) {
  const dispatch = useDispatch()
  const { deactivate } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    if (deactivate) {
      try {
        await createAxiosInstance().post(`${API_URL}/api/auth/deactivate`)
        dispatch(setStatus(0))
        handleClose()
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response?.data?.message || 'Deactivating account failed')
      }
    } else {
      try {
        await createAxiosInstance().post(`${API_URL}/api/auth/disable`)
        dispatch(logout())
        dispatch(initProfile())
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response?.data?.message || 'Deleting account failed')
      }
    }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="error" onClick={handleClickOpen} fullWidth={props.isMobile}>
        {deactivate ? "Disable account" : "Delete account"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {deactivate ? "Deactivate your account?" : "Delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deactivate
              ? "Deactivating your account will allow you to log in at any time, but your profile will not be visible to students."
              : "Deleting your account is irreversible. Once deleted, you will be unable to log in or recover your account."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}