import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

import { useActions } from '../store/uiActions';
import { useSummary,useRequest } from '../store/paperSettings';

import { handleGeneralSummary,handleGeneralSummaryEn,handleGeneralInfo }  from '../utils/generalSummary';

export default function CreateSummary() {

    const { loadingCreateSummary } = useActions((store) => store);

    const { titleResult } = useRequest((store) => store);

    const { industry, info, summary,summaryEn,prompt } = useSummary((store) => store);
    
    const createSummary = async() => {
        if(industry.length > 0 && titleResult.length > 0 ){
            useActions.setState({loadingCreateSummary:true});
            await handleGeneralInfo([], 'glm4v', 0.1);
            await handleGeneralSummary([], 'glm4v', 0.1);
            await handleGeneralSummaryEn([], 'glm4v', 0.1);
            useActions.setState({loadingCreateSummary:false});

        }
        else{
            alert('请先填写选题，所属的专业、行业或领域.如果需要再次生成请填写重新润色要求');
        }
    }

    const saveSummary = () => {
        useSummary.setState({industry,info,summary,summaryEn});
        useActions.setState({showSummaryPopup:false});
    }

    return (
        <Box sx={{width:'500px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}
        >
            <TextField
                id="item-1"
                label="论文选题"
                required
                style={{minWidth:'500px',marginBottom:'10px'}}
                value={titleResult}
                disabled
            />
            <TextField
                id="item-2"
                label="课题所属的专业、行业或领域"
                required
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={industry}
                onChange={(e)=>{
                    useSummary.setState({industry:e.target.value});
                }}
            />
            <TextField
                id="item-3"
                label="课题的研究背景"
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                rows={6}
                value={info}
                onChange={(e)=>{
                    useSummary.setState({info:e.target.value});
                }}
            />

            <TextField
                id="item-4"
                label="中文摘要"
                rows={6}
                multiline
                style={{minWidth:'500px',marginBottom:'10px'}}
                value={summary}
                onChange={(e)=>{
                    useSummary.setState({summary:e.target.value});
                }
                }
            />
            <TextField
                id="item-5"
                label="英文摘要"
                rows={6}
                multiline
                style={{minWidth:'500px',marginBottom:'10px'}}
                value={summaryEn}
                onChange={(e)=>{
                    useSummary.setState({summaryEn:e.target.value});
                }
                }
            />
            <TextField
                id="item-6"
                label="重新润色要求"
                rows={4}
                style={{minWidth:'500px',marginBottom:'10px'}}
                multiline
                value={prompt}
                onChange={(e)=>{
                    useSummary.setState({prompt:e.target.value});
                }}
            />
            <Box style={{display:'flex'}}>
                <LoadingButton loading={loadingCreateSummary}  onClick={createSummary} variant="contained" style={{marginTop:'16px',marginRight:'8px'}}>生成摘要</LoadingButton>
                <Button onClick={saveSummary} variant="contained" style={{marginTop:'16px'}}>保存摘要</Button>
            </Box>
            
        </Box>

    );
}