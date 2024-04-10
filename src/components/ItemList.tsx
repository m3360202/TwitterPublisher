import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import '../assets/css/main.css';


;
import { useActions } from '../store/uiActions';
import { handleTask } from '../utils/utils';

export default function ItemList(): React.JSX.Element {
    const { todoList } = useTodoList((store) => store);
    const {realPlayTimeSum,totalDurationSum,taskState} = useActions((store) => store);

    const getProcess = () => {
        const process = (realPlayTimeSum/totalDurationSum)*100;
        console.log('process',process,realPlayTimeSum,totalDurationSum)
        return process.toFixed(2) + '%';
    }


    return (
        <Box>
            {todoList.length > 0 && (<Box style={{display:'flex',overflowX:'scroll'}}>
                {todoList.map((item,index) => {
                    return (
                        <div style={{color:'#000'}}>
                            <Box key={item.id} className="item" style={{background:'#fff',
                            borderRadius:'10px',display:'flex',flexWrap:'wrap',width:'300px',padding:'10px',marginTop:'10px',marginRight:'10px'}} >

                            {item.todu.map((learn) => (
                                <div key={learn.id} style={{display:'flex',flexDirection:'column',color:'#666',marginRight:'10px',marginBottom:'10px'}}>
                                <Typography>{learn.courseName}:{learn.realPlayTime}/{learn.totalDuration}课时</Typography>
                                </div>
                            )
                                )}

                            </Box>
                            <Typography style={{color:item.state === 1? '#1AAD19' : '#000'}}>当前进度：{getProcess()}</Typography>
                            {item.state === 2 &&(<Typography>刷课任务完成</Typography>)}
                            {item.state === 0 &&(<Button onClick={handleTask.bind(this,index)}>开始刷课</Button>)}
                            {item.state === 1 &&(<Typography style={{color:'#1AAD19'}}>刷课中</Typography>)}
                            <Divider />
                        </div>
                    );
                })
                }
            </Box>)}
        </Box>

    );
}