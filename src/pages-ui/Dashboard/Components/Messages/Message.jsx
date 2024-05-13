import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Chip, CircularProgress, TextField } from '@mui/material'
import { SendOutlined } from '@mui/icons-material'

const Message = (props) => {
  const { message, sender, onSendMessage } = props
  const userId = useSelector(state => state.main.userId)
  const bottomEl = useRef(null)
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)

  const sendMessage = () => {
    onSendMessage(sender._id, messageContent, setMessageContent, setSending)
  }

  useEffect(() => {
    if (message?.messages?.length) {
      bottomEl.current?.scrollIntoView({
        block: 'end',
      })
    }
  }, [message])

  return (
      <>
      <div className="message message-box" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '450px', overflowY: 'scroll', margin: '5px', }}>
          {message?.messages?.length ?
            message.messages.map((msg, index) => {
              return (
                <div key={index}
                     style={{ display: 'flex', gap: '20px', width: '100%', flexDirection: 'column', padding: '5px' }}>
                  <div style={{ alignSelf: msg.sender._id === userId ? 'flex-end' : 'flex-start', }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Chip
                        label={msg.content}
                        variant="filled"
                        sx={{
                          bgcolor: msg && msg.sender._id === userId ? 'grey' : 'default',
                          padding: '10px 2px',
                          borderRadius: '5px',
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                          },
                        }}
                        style={{
                          alignSelf: msg.sender._id === userId ? 'flex-end' : 'flex-start',
                          color: msg.sender._id === userId ? 'white' : '',
                        }}
                      />
                      <small style={{ alignSelf: msg.sender._id === userId ? 'flex-end' : 'flex-start', color:'gray', fontSize:'11px', padding: '0 4px' }}>{new Date(Date.parse(msg.createdAt)).toLocaleDateString()}</small>
                    </div>
                  </div>
                </div>
              )
            }) : <p>No messages to show</p>
          }
          <div ref={bottomEl}></div>
        </div>
        <div>
          <TextField
            fullWidth
            style={{ border: 'none', borderTop: '1px solid lightGray', }}
            placeholder="Type a message"
            multiline
            rows={2}
            variant="filled"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            disabled={!messageContent || sending}
            onClick={sendMessage}
          >
            {sending ? (<CircularProgress size="24px" style={{ color: 'white', marginRight: '0.75rem' }}/>) : (
              <SendOutlined style={{ marginRight: '0.75rem' }}/>)}
            Send
          </Button>
        </div>
      </div>
      </>
  )
}

export default Message