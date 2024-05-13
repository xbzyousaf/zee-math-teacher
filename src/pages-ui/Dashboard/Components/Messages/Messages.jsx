import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Tabs,
  Tab,
  Box,
  Badge,
  CircularProgress,
  Drawer, useMediaQuery, MenuItem, Menu, ListItemIcon, ListItemText, Avatar, Tooltip
} from '@mui/material'
import PropTypes from 'prop-types'
// import Message from './Message'
import {API_URL, createAxiosInstance} from '../../../../api'
import { getMyMessages, seenMessages, setSelectedMessageId } from '../../../../store/setProfile'
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Messages.css'
import ChatUI from './Chat'
import { socket } from '../../../../socket'
import {DeleteOutline} from "@mui/icons-material";
import WarningDialog from "../../../../Components/Dialog/Warning";
import {toast} from "react-toastify";

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const Messages = () => {
  const drawerWidth = 240
  const dispatch = useDispatch()
  const { messages } = useSelector((state) => state.profile)
  const [selectedUser, setSelectedUser] = React.useState({})
  const [value, setValue] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const smallScreen = useMediaQuery('(max-width: 899px)')
  const selectedMessageId = React.useRef(null);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMessageIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseIconMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseWarningDialog = () => {
    setOpenWarningDialog(false)
  }
  const handleOpenWarningDialog = () => {
    handleCloseIconMenu()
    setOpenWarningDialog(true)
  }

  useEffect(() => {
    if(socket) {
      socket.on('message', handleSocket)
    }
  },[])

  const handleSocket = (message) => {
    if(message?.messageId && message.messageId === selectedMessageId.current) {
      createAxiosInstance().get(`/api/messages/${selectedMessageId.current}`).then(res => {
        dispatch(seenMessages(message.messageId))
        setSelectedUser(res.data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
      })
    }
  }

  const handleChange = (event, newValue) => {
    setLoading(true)
    setValue(newValue)
    selectedMessageId.current = messages[newValue]._id
    createAxiosInstance().get(`/api/messages/${messages[newValue]._id}`).then(res => {
      dispatch(seenMessages(messages[newValue]._id))
      setSelectedUser(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const sendMessageHandler = (userId, content, setMessageContent, setSending) => {
    setSending(true)
    createAxiosInstance().post(`/api/messages`, { userId, content }).then(({ data }) => {
      setSelectedUser(data)
      setMessageContent('')
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setSending(false)
    })
  }

  useEffect(() => {
    if (messages.length && !value && value !== 0 && !selectedMessageId.current) {
      handleChange(null, 0)
    }
  }, [messages.length])

  useEffect(() => {
    dispatch(getMyMessages())
  }, []);

  const handleDeleteConversation = () => {
    setIsDeleting(true)
    createAxiosInstance().delete(`/api/messages/delete-conversation/${selectedMessageId.current}`).then(() => {
      selectedMessageId.current = null
      setValue(null)
      toast.success('Conversation deleted successfully!')
      handleCloseWarningDialog()
      dispatch(getMyMessages())
    }).catch(err => {
      toast.error(err?.response?.data ?? 'Something went wrong!')
      console.log(err)
    }).finally(() => {
      setIsDeleting(false)
    })
  }

  return (
    <div>
      {messages.length ?
        <>
          <Box className="chatbox-container">
            <Drawer
              sx={{
                width: { xl: drawerWidth, md: '200px', xs: '100%'},
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  overflow: 'hidden',
                  width: { xl: drawerWidth, md: '200px', xs: '100%' },
                  flexDirection: { xs: 'row', md: 'column' },
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '1px solid #adadad',
                  position: 'static',
                  // boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 2px'
                },
              }}
              variant="permanent"
            >
              <Tabs
                textColor="primary"
                indicatorColor="primary"
                orientation={!smallScreen ? 'vertical' : 'horizontal'}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                aria-label="Vertical tabs example"
                sx={{
                  width: { xl: drawerWidth, md: '200px', xs: '100%' },
                  '& .MuiTab-root.Mui-selected': {
                    color: 'white',
                    fontWeight: 'bold',
                    background: '#5FBDFF'
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#5FBDFF'
                  }
                }}
              >
                {messages.length ? messages.map((msg, index) => (
                  msg.isRead ? (
                    <Tab className="active" key={msg._id}
                     label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Avatar sx={{ width: 34, height: 34, bgcolor: '#7c7c7cde', mr: 0.7 }} alt="user avatar"
                                src={  msg.user.avatar ? `${API_URL}${msg.user.avatar}` : ''} />
                        <span style={{
                          maxWidth: '120px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}>{msg.user.firstName} {msg.user.lastName}</span>
                      </Box>
                    }
                     icon={value === index && (
                      <MoreVertIcon
                        fontSize={'small'}
                         aria-controls={open ? 'basic-menu' : undefined}
                         aria-haspopup="true"
                         aria-expanded={open ? 'true' : undefined}
                         onClick={handleMessageIconClick} />)}
                     iconPosition="end"
                     sx={{
                       padding: '12px 7px',
                       textTransform: 'none',
                       justifyContent: 'space-between',
                       flexDirection: 'row',
                     }}/>
                  ) : (
                    <Tab key={msg._id}
                       label={
                          <Badge style={{ marginRight: '10px', width: '90%', display: 'flex', alignItems: 'center' }} variant="dot" color="error">
                           <Avatar sx={{ width: 30, height: 30, bgcolor: '#7c7c7cde', mr: 0.7 }}
                                   src={  msg.user.avatar ? `${API_URL}${msg.user.avatar}` : ''} />
                             <span
                             style={{
                               maxWidth: '120px',
                               overflow: 'hidden',
                               whiteSpace: 'nowrap',
                               textOverflow: 'ellipsis',
                             }}
                             > {msg.user.firstName} {msg.user.lastName} </span>
                           </Badge>
                       }
                       icon={value === index && (<MoreVertIcon
                         aria-controls={open ? 'basic-menu' : undefined}
                         aria-haspopup="true"
                         fontSize={'small'}
                         aria-expanded={open ? 'true' : undefined}
                         onClick={handleMessageIconClick} />)
                       }
                       iconPosition="end"
                       sx={{
                         padding: '12px 7px',
                         textTransform: 'none',
                         justifyContent: 'space-between',
                         flexDirection: 'row',
                       }}
                    />
                  )
                )) : <p style={{ padding: '30px' }}>No active chats found</p>}
              </Tabs>
            </Drawer>
            {messages.map((msg, index) => (
              <TabPanel key={msg._id} value={value} index={index}
                        className="tab-panel-container">
                {loading ? <div className={'message-box'} style={{ textAlign: 'center', padding: '100px' }}>
                  <CircularProgress/>
                </div> : <ChatUI sender={msg.user} message={selectedUser} onSendMessage={sendMessageHandler}/>}
              </TabPanel>
            ))}
          </Box>
        </> : <>
          <div className={'no-chat-found'} style={{ textAlign: 'center', padding: '50px', border: '1px solid #adadad', borderRadius: '12px', width:'30%' }}>
            <SmsFailedOutlinedIcon fontSize={'large'} /><p style={{textAlign: 'center'}}>No active chats found</p>
          </div>
        </>
      }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseIconMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Tooltip title="Delete" placement="right-start"
           slotProps={{
             popper: {
               modifiers: [
                 {
                   name: 'offset',
                   options: {
                     offset: [6, -5],
                   },
                 },
               ],
             },
           }}
           arrow
        >
          <MenuItem onClick={handleOpenWarningDialog}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <DeleteOutline fontSize="small" color="error" />
            </ListItemIcon>
          </MenuItem>
        </Tooltip>
      </Menu>
      <WarningDialog open={openWarningDialog} handleSubmit={handleDeleteConversation} isLoading={isDeleting} handleClose={handleCloseWarningDialog} title="Delete Conversation" content="This action won't be reversable. Are you sure you want to delete this conversation?" />
    </div>

  )
}

export default Messages




