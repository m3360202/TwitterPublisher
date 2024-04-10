import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

import { useActions } from '../store/uiActions';
import { useSummary,useRequest, useDirectory } from '../store/paperSettings';

import { handleGeneralDirectory }  from '../utils/generalDirectory';

export default function CreateDirectory() {

    const { loadingCreateDirectory } = useActions((store) => store);

    const { titleResult } = useRequest((store) => store);

    const { industry, info, summary,summaryEn} = useSummary((store) => store);

    const { directory,prompt,num  } = useDirectory((store) => store);

    
    const createDirectory = async() => {
        if(summary.length > 0 && titleResult.length > 0 && industry.length > 0 && info.length > 0){
            useActions.setState({loadingCreateDirectory:true});
            await handleGeneralDirectory([], 'glm4v', 0.1);
            useActions.setState({loadingCreateDirectory:false});

        }
        else{
            alert('请先填写选题，所属的专业、行业或领域.如果需要再次生成请填写重新润色要求');
        }
    }

    const saveDirectory = () => {
        useRequest.setState({directory});
        useActions.setState({showDirectoryPopup:false});
    }

    return (
        <Box sx={{width:'500px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}
        >
            <TextField
                id="item-1"
                required
                label="生成章节数量"
                style={{minWidth:'500px',marginBottom:'10px'}}
                value={num}
                onChange={(e)=>{
                    useDirectory.setState({num:e.target.value});
                }}
            />
            <TextField
                id="item-2"
                label="提纲"
                rows={8}
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={directory}
                onChange={(e)=>{
                    useDirectory.setState({directory:e.target.value});
                }}
            />
            <TextField
                id="item-6"
                label="重新润色要求"
                rows={4}
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={prompt}
                onChange={(e)=>{
                    useDirectory.setState({prompt:e.target.value});
                }}
            />
            <Box style={{display:'flex'}}>
                <LoadingButton loading={loadingCreateDirectory}  onClick={createDirectory} variant="contained" style={{marginTop:'16px',marginRight:'8px'}}>生成目录</LoadingButton>
                <Button onClick={saveDirectory} variant="contained" style={{marginTop:'16px'}}>保存目录</Button>
            </Box>
        </Box>

    );
}