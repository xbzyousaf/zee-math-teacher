import * as React from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

const ChatUI = (props) => {
  const { message, sender, onSendMessage } = props
  const userId = useSelector(state => state.main.userId)
  const bottomEl = useRef(null)
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = () => {
    onSendMessage(sender._id, messageContent, setMessageContent, setSending)
  }

  const handleInputChange = (event) => {
    setMessageContent(event.target.value)
  }

  useEffect(() => {
    const messageContainer = bottomEl.current.parentNode;
    if (message?.messages?.length && messageContainer.scrollTop + messageContainer.clientHeight <= messageContainer.scrollHeight) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [message])

  return (
      <Box
        className="chatbox"
      >
        <Box sx={{
          background: '#5FBDFF',
          width: '100%',
          borderRadius: '9px 9px 0px 0px',
          padding: '15px',
          fontSize: '20px',
          color: 'white',
          letterSpacing: '0.5px',
          fontWeight: 'bolder',
        }}>
          {sender?.firstName} {sender?.lastName}
        </Box>
        <Box sx={{
          flexGrow: 1,
          overflow: 'auto', p: 2,
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
          '-webkit-scrollbar': 'none'
        }}>
          {message?.messages?.map((message) => (
            <Message key={message.id} message={message} userId={userId}/>
          ))}
          <div ref={bottomEl}></div>
        </Box>

        <Box sx={{ p: {
          xs: 1,
          md: 2,
          }, backgroundColor: 'background.default', borderRadius: '0px 0px 10px 10px' }}>
          <Grid spacing={{
            xs: 1,
            md: 2,
          }} container>
            <Grid item xs={12} md={10}>
              <TextField
                size="small"
                fullWidth
                multiline
                maxRows={2}
                placeholder="Type a message"
                variant="outlined"
                value={messageContent}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                disabled={!messageContent || sending}
                onClick={handleSend}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
  )
}

const Message = ({ message, userId }) => {
  const isSender = message.sender._id === userId
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: !isSender ? 'flex-start' : 'flex-end',
          flexShrink: 1,
          flexFlow: 'column nowrap',
          overflow: 'hidden',
          alignItems: !isSender ? 'start' : 'end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            justifyContent: !isSender ? 'start' : 'right',
            flexFlow: 'row nowrap',
            width: '93%',
          }}
        >
          {!isSender ?
            <Avatar sx={{ bgcolor: '#7c7c7cde', mr: !isSender ? 0.7 : 0, mt: 0.6 }}>
              {message?.sender?.firstName[0] ?? message?.sender?.lastName[0] ?? 'A'}
            </Avatar>
            : ''}
          <Box
            sx={{
              textAlign: !isSender ? 'start' : 'right',
              maxWidth: { xs: '80%', xl: '100%' },
              wordWrap: 'break-word',
            }}
          >
            {!isSender && !!(message?.sender?.firstName || message?.sender?.lastName) && <small style={{
              color: '#7c7c7cde',
              fontSize: '14px',
              paddingBottom: '5px'
            }}>{message?.sender?.firstName} {message?.sender?.lastName}</small>}
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                backgroundColor: !isSender ? 'default' : '#EBFAFD',
                borderRadius: !isSender ? '0px 15px 15px 15px' : '15px 0px 15px 15px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
              }}
            >
              <Typography variant="body2">{message.content}</Typography>
            </Paper>

            <small style={{
              color: 'gray',
              fontSize: '11px',
              padding: '0 4px'
            }}>
              {new Date(Date.parse(message.createdAt)).toLocaleDateString()}
            </small>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatUI