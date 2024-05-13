import React, { useEffect, useState } from 'react';
import './Profile.css';
import {
    Avatar,
    Box,
    Button, CardHeader, CircularProgress,
    FormControl,
    FormLabel,
    TextField
} from "@mui/material";
import './Profile.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import UploadAvatar from "./Components/UploadAvatar";
import {updateGuestProfile} from "../../store/setProfile";

const GuestProfile = () => {
    const { firstName, lastName } = useSelector(
        (state) => state.main
    )
    const { phone, avatar, tempAvatar } = useSelector(
        (state) => state.profile.guestInformation
    )
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [showCropper, setShowCropper] = useState(true)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    useEffect(() => {
        resetData()
    }, [firstName, phone,resetData])

    useEffect(() => {
        setUser({ ...user,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
        })
    }, [setUser])

    const resetData = () => {
        setUser({ ...user,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            phone: user.phone,
            avatar: tempAvatar,
            firstName: user.firstName,
            lastName: user.lastName
        }
        dispatch(updateGuestProfile({data, setLoading, setShowCropper}))
    }

    return (
        <Box className={"profile-container" } sx={{ padding: 0,  }}>
            <Card className={"bd-grey"} sx={{ width: '100%', borderRadius: '10px', boxShadow: 'none' }}>
            <CardContent>
                <h3 style={{ marginTop: '0.5rem' }}>Update profile</h3>
                <Box
                    component="form"
                    sx={{textAlign: 'center', maxWidth: '600px', margin: 'auto'}}
                    onSubmit={handleSubmit}
                >
                    <FormControl style={{marginTop: '1rem'}} className="name-box">
                        <FormLabel id="demo-row-radio-buttons-group-label" className="mb-1">Upload a
                            photo</FormLabel>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div className="image-input">
                                <UploadAvatar showCropper={showCropper} />
                            </div>
                        </div>
                    </FormControl>
                    <br />

                    <div style={{width: "100%"}} className="name-box">
                        <TextField
                            id="email-input"
                            className="name bd-blue"
                            label="First Name"
                            type="text"
                            value={user?.firstName}
                            onChange={(e) =>
                              setUser({...user, firstName: e.target.value})
                            }
                        />
                    </div>
                    <div style={{width: "100%"}} className="name-box">
                        <TextField
                            id="email-input"
                            label="Last Name"
                            className="name"
                            type="text"
                            value={user?.lastName}
                            onChange={(e) =>
                              setUser({...user, lastName: e.target.value})
                            }
                        />
                    </div>
                    <div style={{width: "100%"}} className="name-box">
                        <TextField
                            id="custom-css-outlined-input"
                            label="Phone"
                            type="number"
                            style={{flex: 1}}
                            value={user?.phone}
                            onKeyDown={e => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()}
                            onChange={(e) => setUser({...user, phone: e.target.value})}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <Button variant="contained" type="submit"
                                style={{fontFamily: 'Open Sans', minWidth: '90px', margin: '15px 0px'}}>
                            {loading && (<CircularProgress size="24px" style={{ color: "white", marginRight: '0.50rem' }} />) }
                            Update
                        </Button>
                    </div>
                </Box>
            </CardContent>
        </Card>
        </Box>
    );
};

export default GuestProfile;
