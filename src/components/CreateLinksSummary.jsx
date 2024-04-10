import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import "../assets/css/main.css";

import {  useContent  } from "../store/paperSettings";

import { generateLinksContent } from "../utils/generalKt";

export default function CreateLinkSummary() {
    const { links } = useContent((store) => store);
    return (
        <Box
            sx={{
                width: "500px",
                m: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 40px",
            }}
        >
        
        <TextField
                    key='item-99' // 使用 key 是一个好的实践，以帮助 React 识别哪些项改变了
                    id='item-99'
                    label='生成文献引用' // 假设 label 是根据索引生成的
                    rows={8}
                    multiline
                    style={{ minWidth: "500px", marginBottom: "10px" }}
                    value={links} // 确保 content 是一个响应式的状态
                    disabled
                />
                <Button
                    onClick={(e) => {
                        let links = generateLinksContent();
                            useContent.setState({ links });
                    }}
                    variant="contained"
                    style={{ marginTop: "16px" }}
                >
                    整理文献引用
                </Button>
        </Box>
    );
}
