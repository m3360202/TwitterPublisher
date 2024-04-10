import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

import { useActions } from '../store/uiActions';
import { useBasicSettings ,useThank} from '../store/paperSettings';

import { handleGeneralThank }  from '../utils/generalThank';

export default function CreateThank() {

    const { loadingCreateThank } = useActions((store) => store);

    const { student,teacher,school } = useBasicSettings((store) => store);

    const { content,prompt } = useThank((store) => store);
    
    const createThank = async() => {
        if(student.length > 0 && school.length > 0 && teacher.length > 0 ){
            useActions.setState({loadingCreateThank:true});
            await handleGeneralThank([], 'glm4v', 0.1);
            useActions.setState({loadingCreateThank:false});

        }
        else{
            alert('请先填写学生姓名，指导老师和学校名称.如果需要再次生成请填写重新润色要求');
        }
    }

    const saveThank = () => {
        useThank.setState({content});
        useActions.setState({showThankPopup:false});
    }

    return (
        <Box sx={{width:'500px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}>

            <TextField
                id="item-4"
                label="感谢内容"
                rows={6}
                multiline
                style={{minWidth:'500px',marginBottom:'10px'}}
                value={content}
            />

            <TextField
                id="item-6"
                label="重新润色要求"
                rows={4}
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={prompt}
                onChange={(e)=>{
                    useThank.setState({prompt:e.target.value});
                }}
            />
            <Box style={{display:'flex'}}>
                <LoadingButton loading={loadingCreateThank}  onClick={createThank} variant="contained" style={{marginTop:'16px',marginRight:'8px'}}>生成感谢</LoadingButton>
                <Button onClick={saveThank} variant="contained" style={{marginTop:'16px'}}>保存感谢</Button>
            </Box>
            
        </Box>

    );
}