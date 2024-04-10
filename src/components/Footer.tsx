import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import '../assets/css/main.css';

export default function Footer(): React.JSX.Element {

    return (
        <Box style={{position:'fixed',bottom:'30px',width:'100%',textAlign:'center',color:'#666'}}>
            <Typography>Coded by <span style={{color:'#b661ed',textDecoration:'underLine'}}>Justgoodluck</span></Typography>
        </Box>

    );
}