import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import LinkIcon from '@mui/icons-material/Link';
import { WhatsappIcon, WhatsappShareButton, EmailIcon,
    EmailShareButton,
} from 'react-share'
import { IconButton, Tooltip } from '@mui/material'

const ShareProfileDialog = ({ open, handleClose, tutorId }) => {
    const [showChip, setShowChip] = React.useState(false)
    const [hoverIcon, setHoverIcon] = React.useState({
        copyLink: false,
        whatsapp: false,
        email: false
    })
    const whatsappShareRef = React.useRef(null);
    const emailShareRef = React.useRef(null);

    let profileURL = `${window.location.origin}/tutor/${tutorId}`

    const copyProfileLink = () => {
        navigator.clipboard.writeText(profileURL)

        setShowChip(true)
        setTimeout(() => {
            setShowChip(false)
        }, 3000)
    }
    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ fontWeight: 'bold' }}>Share Tutor Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Share this tutor's profile on the following social platforms
                    </DialogContentText>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Box
                              onClick={copyProfileLink}
                              sx={{
                               cursor: 'pointer',
                                p: 2,
                                borderRadius: '10px',
                                my: 2,
                                mr: 2,
                                textAlign: 'center',
                                boxShadow: 2,
                                border: 1,
                                borderColor: 'lightGray',
                                position: 'relative',
                                flexGrow: 1,
                                width: '120px',
                            }}
                            onMouseEnter={ () => setHoverIcon({
                                    ...hoverIcon, copyLink: true
                                })
                            }
                            onMouseLeave={ () => setHoverIcon({
                                  ...hoverIcon, copyLink: false
                                })
                            }
                            >
                                <IconButton size="medium" color="info"
                                    sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        },
                                        transform: hoverIcon.copyLink ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                >
                                    <LinkIcon style={{ fontSize: '32px', backgroundColor:'lightgrey', padding: '5px', borderRadius: '50%', }} color='info' />
                                </IconButton>
                                <br />
                                <span style={{fontSize: '14px', fontWeight: 'bold', color: 'gray'}}> {showChip ? 'Link copied!' : 'Copy Link'} </span>

                            </Box>

                            <Box
                                onClick={() => whatsappShareRef.current.click()}
                                sx={{
                                    cursor: 'pointer',
                                    p: 2,
                                    borderRadius: '10px',
                                    my: 2,
                                    mr: 2,
                                    textAlign: 'center',
                                    boxShadow: 2,
                                    border: 1,
                                    borderColor: 'lightGray',
                                    position: 'relative',
                                    flexGrow: 1,
                                    width: '120px',
                                }}
                                onMouseEnter={ () => setHoverIcon({
                                    ...hoverIcon, whatsapp: true
                                })
                                }
                                onMouseLeave={ () => setHoverIcon({
                                    ...hoverIcon, whatsapp: false
                                })
                                }
                            >
                                <IconButton size="medium"
                                    sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        },
                                        transform: hoverIcon.whatsapp ? 'scale(1.2)' : 'scale(1)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                >
                                    <WhatsappShareButton
                                        url={profileURL}
                                        ref={whatsappShareRef}
                                        title=""
                                        separator=""
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: 'auto'
                                        }}
                                    >
                                        <WhatsappIcon size={32} round/>
                                    </WhatsappShareButton>
                                </IconButton>

                                <br/>
                                <span style={{fontSize: '14px', fontWeight: 'bold', color: 'gray'}}>
                                    Whatsapp
                                </span>
                            </Box>

                          <Box
                              onClick={() => emailShareRef.current.click()}
                              sx={{
                                cursor: 'pointer',
                                p: 2,
                                borderRadius: '10px',
                                my: 2,
                                mr: 2,
                                textAlign: 'center',
                                boxShadow: 2,
                                border: 1,
                                borderColor: 'lightGray',
                                position: 'relative',
                                flexGrow: 1,
                                width: '120px',
                              }}
                              onMouseEnter={ () => setHoverIcon({
                                  ...hoverIcon, email: true
                                })
                              }
                              onMouseLeave={ () => setHoverIcon({
                                  ...hoverIcon, email: false
                                })
                              }
                          >
                             <IconButton size="medium"
                                sx={{
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    },
                                    transform: hoverIcon.email ? 'scale(1.2)' : 'scale(1)',
                                    transition: 'transform 0.2s ease',
                                }}
                             >
                                <EmailShareButton
                                    url={profileURL}
                                    ref={emailShareRef}
                                    subject="Tutor Profile"
                                    body="Here is the link of tutor's profile on Maths directory: "
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 'auto'
                                    }}
                                >
                                    <EmailIcon size={32} round/>
                                </EmailShareButton>
                             </IconButton>
                             <br/>
                             <span style={{fontSize: '14px', fontWeight: 'bold', color: 'gray'}}>
                                Email
                             </span>
                          </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ShareProfileDialog