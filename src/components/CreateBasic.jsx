import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

;
import { useActions } from '../store/uiActions';
import { useBasicSettings } from '../store/paperSettings';

import { generateRandomId,getRandomId } from '../utils/utils';
import axios from 'axios';

export default function CreateBasic() {
    const { teacher,student,school } = useBasicSettings((store) => store);


    const saveItem = () => {
        if(teacher.length > 0 &&  student.length>0 && school.length > 0){
            useBasicSettings.setState({
                teacher,
                student,
                school
            });
            useActions.setState({showBasicPopup:false});
        }
        else{
            alert('请填写完整的学校，学生姓名，指导老师姓名');
        }
    }

    return (
        <Box sx={{width:'300px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}
        >
            <TextField
                id="item-name"
                label="学生姓名"
                required
                style={{minWidth:'300px',marginBottom:'6px'}}
                value={student}
                onChange={(e)=>{
                    useBasicSettings.setState({student:e.target.value});
                }}
            />
            <TextField
                id="item-teacher"
                label="指导老师"
                required
                style={{minWidth:'300px',marginBottom:'6px'}}
                value={teacher}
                onChange={(e)=>{
                    useBasicSettings.setState({teacher:e.target.value});
                }}
            />
            <TextField
                id="item-school"
                label="所在学校"
                required
                style={{minWidth:'300px'}}
                value={school}
                onChange={(e)=>{
                    useBasicSettings.setState({school:e.target.value});
                }}
            />
            <Button onClick={saveItem} variant="contained" style={{marginTop:'16px'}}>保存基础信息</Button>
        </Box>

    );
}