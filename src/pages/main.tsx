import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import '../assets/css/main.css';

import CreateBasic from '../components/CreateBasic';
import CreateContent from '../components/CreateContent';
import CreateTitle from '../components/CreateTitle';
import CreateSummary from '../components/CreateSummary';
import CreateDirectory from '../components/CreateDirectory';
import CreateKt from '../components/CreateKt';
import CreateThank from '../components/CreateThank';
import CreateLinks from '../components/CreateLinks';
import CreateSubject from '../components/CreateSubject';
import Footer from '../components/Footer';
import png from '../assets/img/icon.png';
import { useActions } from '../store/uiActions';
import { reSetAll,reSetContentChat } from '../store/paperSettings';
import CreateLinkSummary from '../components/CreateLinksSummary';
import { Button } from '@mui/material';

export default function App(): React.JSX.Element {
    const { showBasicPopup,showTitlePopup,showSubjectPopup,} = useActions((store) => store);

    const handleOpen = () => {
        useActions.setState({ showBasicPopup: true });
    }

    const handleClose = () => {
        useActions.setState({ showBasicPopup: false });
    }

    const handleOpenTitle = () => {
        useActions.setState({ showTitlePopup: true });
    }

    const handleCloseTitle = () => {
        useActions.setState({ showTitlePopup: false });
    }
    const handleOpenSubject = () => {
        useActions.setState({ showSubjectPopup: true });
    }
    const handleCloseSubject = () => {
        useActions.setState({ showSubjectPopup: false });
    }



    return (
        <Box>
            <Box className="bg"></Box>
            <img src={png} width='85' height='85' style={{position:'fixed',right:'10%',top:'10%',cursor:'pointer'}} onClick={()=>{
                window.open('https://hypergpt.aliensoft.com.cn')
            }} />
            <Button variant="contained" style={{position:'fixed',right:'10%',top:'25%',cursor:'pointer'}} onClick={()=>{
                reSetAll()
            }
            }>重置所有</Button>
             <Button variant="contained" style={{position:'fixed',right:'10%',top:'35%',cursor:'pointer'}} onClick={()=>{
                reSetContentChat()
            }
            }>重置文本chat</Button>
            <Box className="main">
                <Box className="contain">
                    <Box style={{ fontSize: '3rem', fontWeight: '800',color:'#000' }}>Twitter Publisher</Box>
                    <Box style={{ fontSize: '1.5rem', fontWeight: '500',color:'#666',margin:'20px 0' }}>general twitter content tools </Box>
                    <Box style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'}}>
                    <Box className="createItem" id="createItem" style={{marginTop:"30px"}} onClick={handleOpen}>
                        第1步 选择模板账号</Box>
                    <Dialog onClose={handleClose} open={showBasicPopup}>
                        <DialogTitle>基础信息</DialogTitle>
                        <CreateBasic />
                    </Dialog>
    
                    <Box className="createItem" id="createItem" style={{marginTop:"30px"}} onClick={handleOpenSubject}>
                        第2步 选择国家热点模板
                    </Box>
                    <Dialog onClose={handleCloseSubject} open={showSubjectPopup}>
                        <DialogTitle>选择事件模板</DialogTitle>
                        <CreateSubject />
                    </Dialog>
                    <Box className="createItem" id="createItem" style={{marginTop:"30px"}} onClick={handleOpenTitle}>
                        第3步 生成推文
                    </Box>

                    <Dialog onClose={handleCloseTitle} open={showTitlePopup}>
                        <DialogTitle>推文生成</DialogTitle>
                        <CreateTitle />
                    </Dialog>
             
                    </Box>

                </Box>

            </Box>
            <Footer />
        </Box>
    );
}