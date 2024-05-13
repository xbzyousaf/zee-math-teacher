import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CircularProgress} from "@mui/material";

const WarningDialog = ({ title, content, open, handleClose, handleSubmit, isLoading=false }) => {

    const handleConfirmCase = () => {
        handleSubmit()
    }

    const handleNotConfirmCase = () => {
        handleClose()
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNotConfirmCase}>Cancel</Button>
                    <Button onClick={handleConfirmCase} autoFocus color="primary" disabled={isLoading}>
                        {
                            isLoading && <CircularProgress size="16px" sx={{ marginRight: '15px' }} />
                        }
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default WarningDialog