import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)(() => ({
    '& label.Mui-focused': {
        color: '#0262C2',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#0262C2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#0262C2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0262C2',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        '& fieldset': {
            borderColor: '#5A5A5A',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#5A5A5A',
        },
    },
}));

export default CssTextField;