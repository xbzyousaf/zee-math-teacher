import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_URL, createAxiosInstance } from "../../../../api";
import { setToken, showErrorMessage } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../store/main";
import { initProfile } from "../../../../store/setProfile";

export default function ConfirmType(props) {
  const dispatch = useDispatch();
  const { isGuest } = useSelector((state) => state.main);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    try {
      const response = await createAxiosInstance().patch(
        `${API_URL}/api/auth/changeType`
      );
      if (response.data.isGuest) dispatch(initProfile());
      dispatch(setUser({ isGuest: response.data.isGuest }));
      setToken(response.data.token);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
      showErrorMessage(
        error.response?.data?.message ||
          "Changing account type failed, please try again"
      );
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
        fullWidth={props.isMobile}
      >
        change account as {isGuest ? "tutor" : " parent/student"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Change your account to {isGuest ? "tutor" : " parent/student"}{" "}
          account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isGuest
              ? "Your account will be tutor account that will have a profile and will be searched by students and parents."
              : "Changing your account to parent/student account will delete your profile. Once deleted, your profile will be unable to be recovered."}
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
