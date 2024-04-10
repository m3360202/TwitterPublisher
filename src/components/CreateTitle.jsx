import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

import { useActions } from '../store/uiActions';
import { useBasicSettings,useRequest } from '../store/paperSettings';

import { handleGeneralTitle }  from '../utils/generalTitle';

export default function CreateTitle() {

    const { course,subject,school } = useBasicSettings((store) => store);
    const { loadingCreateTitle } = useActions((store) => store);
    const { userRequest,title,titleResult,request } = useRequest((store) => store);

    const [result,setResult] = useState('');
    
    const createTitle = async() => {
        if(title.length > 0 && request.length > 0 && course.length > 0 && subject.length > 0 && school.length > 0){
            useActions.setState({loadingCreateTitle:true});
            const res = await handleGeneralTitle([], 'glm4v', 0.1);
            setResult(res);
            useActions.setState({loadingCreateTitle:false});

        }
        else{
            alert('请先填写您的专业或选题方向和导师的要求,以及确定所在学科，学校和专业已经设置');
        }
    }

    const reRenderTitle = async() => {
        if(result.length > 0 && userRequest.length > 0 && course.length > 0 && subject.length > 0 && school.length > 0){
            useActions.setState({loadingCreateTitle:true});
            const res = await handleGeneralTitle([], 'glm4v', 0.1);
            setResult(res);
            useActions.setState({loadingCreateTitle:false});
        }
        else{
            alert('请先填写您的专业或选题方向和导师的要求,以及确定所在学科，学校和专业已经设置,并填写重新润色要求');
        }
    }

    const saveTitle = () => {
            useRequest.setState({titleResult,title,request});
            useActions.setState({showTitlePopup:false});
    }

    return (
        <Box sx={{width:'500px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}
        >
            <TextField
                id="item-1"
                label="你的专业或选题方向"
                required
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={title}
                onChange={(e)=>{
                    useRequest.setState({title:e.target.value});
                }}
            />
            <TextField
                id="item-2"
                label="导师的要求"
                required
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={request}
                onChange={(e)=>{
                    useRequest.setState({request:e.target.value});
                }}
            />
            {result.length > 0 && <TextField
                id="item-3"
                label="重新润色要求"
                rows={4}
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={userRequest}
                onChange={(e)=>{
                    useRequest.setState({userRequest:e.target.value});
                }}
            />}
            <Box>
                {result.length === 0 && <LoadingButton loading={loadingCreateTitle}  onClick={createTitle} variant="contained" style={{marginTop:'16px',marginBottom:'10px'}}>生成选题</LoadingButton>}
                {result.length > 0 && <LoadingButton loading={loadingCreateTitle} onClick={reRenderTitle} variant="contained" style={{marginTop:'16px',marginBottom:'10px'}}>重新生成</LoadingButton>}
            </Box>
            <TextField
                id="item-4"
                label="选题结果"
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                rows={6}
                value={result}
                onChange={(e)=>{
                    setResult(e.target.value);
                }}
            />
            <TextField
                id="item-5"
                label="确认选题"
                style={{minWidth:'500px'}}
                value={titleResult}
                onChange={(e)=>{
                    useRequest.setState({titleResult:e.target.value});
                }}
            />
            <Button onClick={saveTitle} variant="contained" style={{marginTop:'16px'}}>保存选题</Button>
        </Box>

    );
}