import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SelectCourse from './SelectCourse';
import { useActions } from '../store/uiActions';
import '../assets/css/main.css';
import Button from "@mui/material/Button";

export default function CreateSubject() {

    return (
        <Box sx={{
            width: "500px",
            m: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 40px",
        }}>
                        <SelectCourse />

                        <Button
                    onClick={(e) => {
                        useActions.setState({ showSubjectPopup: false });
                    }}
                    variant="contained"
                    style={{ marginTop: "16px" }}
                >
                    保存学科
                </Button>
                    </Box>

    );
}