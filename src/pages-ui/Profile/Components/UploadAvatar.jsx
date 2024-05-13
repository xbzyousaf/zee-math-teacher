import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setAvatar, setTempGuestAvatar } from "../../../store/setProfile";
import { API_URL, createAxiosInstance } from "../../../api";
import { AddCircle, Crop, Delete, Upload } from '@mui/icons-material'
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Button,
  DialogActions,
  Typography,
  Slider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import getCroppedImg from "./cropFunctions.js";
import "./UploadAvatar.css";
import { toast } from 'react-toastify'

export default function UploadAvatar({ showCropper = true }) {
  const isGuest = useSelector(state => state.main.isGuest)
  const { avatar, gender } = useSelector((state) => state.profile.information);
  const { avatar: guestAvatar, tempAvatar } = useSelector((state) => state.profile.guestInformation);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [wait, setWait] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const theme = useTheme();

  const handleClickOpen = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (typeof window === 'object') {
    const inputEle = document.getElementById('contained-button-file')
    
    if(inputEle) {
      inputEle.value = ''
    }
  }
    setImage(false)
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // const maleAvatar = "/assets/image/user/male.png";
  // const femaleAvatar = "/assets/image/user/female.png";
  // const defaultUserAvatar = "/assets/image/user/User-avatar.svg.png";
  // // const defaultAvatar =
  // //   gender === 1 ? femaleAvatar : gender === 0 ? maleAvatar : defaultUserAvatar;
  const tutorAvatar = avatar && `${API_URL}${avatar}`;
  const guestAvatarUrl = guestAvatar && `${API_URL}${guestAvatar}`;
  const tempGuestAvatar = tempAvatar && `${API_URL}${tempAvatar}`;
  const userAvatar = isGuest  ? tempGuestAvatar : tutorAvatar

  const dispatch = useDispatch();

  useEffect(() => {
   if(isGuest) {
     if(guestAvatar) {
       dispatch(setTempGuestAvatar(guestAvatar))
     }
   }
  }, [guestAvatar])

  const handleDelete = () => {
    if (typeof window === 'object') {
    const inputEle = document.getElementById('contained-button-file')
    if(inputEle) {
      inputEle.value = ''
    }
  }
    setCroppedAreaPixels(null)
    setImage(null)
    if (isGuest) {
      dispatch(setTempGuestAvatar(null))
    } else {
      dispatch(setAvatar(null))
    }
  }
  const handleFileUpload = async (event) => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const logoFile = new File([blob], "logo.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", logoFile);
      formData.append("avatar", avatar);
      setWait(true);
      createAxiosInstance()
        .post(`/api/teachers/upload`, formData)
        .then((response) => {
          if (isGuest) {
            dispatch(setTempGuestAvatar(response.data?.avatar));
          } else {
            dispatch(setAvatar(response.data?.avatar));
          }

          setOpen(false)
        })
        .catch((error) => {
          toast.error('Image not uploaded! Something went wrong.')
          console.error(error);
        })
        .finally(() => {
          setWait(false);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={handleClickOpen}
      />
      <label htmlFor="contained-button-file">
        <div
          className="avatar cropper-image"
          style={{ backgroundImage: `url("${userAvatar}")` }}
        >
          {!userAvatar && <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}> <Upload fontSize="large" /> Upload image</div>}
          <AddCircle className="add-icon" fontSize="large"/>
        </div>
      </label>
      {(userAvatar || image) && (
        <div style={{ width: '200px', display: 'flex', justifyContent: 'space-between' }}>
          {(userAvatar) && <Delete onClick={handleDelete} style={{ color: 'red', cursor: 'pointer' }}/>}
          {image && showCropper && <Crop color='primary' onClick={() => {
            setOpen(true)
          }} style={{ cursor: 'pointer' }}/>}
      </div>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Image Cropping"}</DialogTitle>
        <DialogContent style={{ overflowX: "hidden" }} className="dialog-body">
          <div className="cropper-body">
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <div className="cropper-controller">
            <div className="cropper-control">
              <Typography variant="overline" className="cropper-label">
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                className="cropper-slider"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className="cropper-control">
              <Typography variant="overline" className="cropper-label">
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                className="cropper-slider"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleFileUpload} autoFocus disabled={wait}>
            {wait ? "Uploading..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
