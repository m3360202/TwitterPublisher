import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import "../assets/css/main.css";

import { useActions } from "../store/uiActions";
import { useKt, useRequest, useLinks } from "../store/paperSettings";

import { handleGeneralKt } from "../utils/generalKt";

export default function CreateKt() {

    const { loadingCreateKt } = useActions((store) => store);

    const { titleResult } = useRequest((store) => store);

    const { content, linkGroup, link } = useKt((store) => store);

    const { links } = useLinks((store) => store);

    const executeHandleGeneralKt = async () => {
        for (let i = 0; i < 9; i++) {
            // 等待前一个handleGeneralKt执行完毕
            await handleGeneralKt([], "gpt-3", 0.1);
            // if (i === 5 && linkGroup.length > 0) {
            //     await handleGeneralKtResult();
            // }
        }


    };

    const createKt = async () => {
        if (titleResult.length > 0) {
            useActions.setState({ loadingCreateKt: true });
            await executeHandleGeneralKt();

            useActions.setState({ loadingCreateKt: false });
        } else {
            alert(
                "请先填写专业学科及论文选题要素.如果需要再次生成请填写重新润色要求"
            );
        }
    };

    const saveKt = () => {
        useKt.setState({ content, process: 1 });
        useActions.setState({ showKtPopup: false });
    };
    const removeItem = (item) => {
        const newLinks = linkGroup.filter((link) => link !== item);
        useKt.setState({ linkGroup: newLinks });
    };

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
                id="item-4"
                label="开题报告内容"

                rows={8}
                multiline
                style={{ minWidth: "500px", marginBottom: "10px" }}
                value={content}
                onChange={(e) => {
                    useKt.setState({ content: e.target.value });
                }}
            />
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>选择引用文献：</Typography>
                {links && (<FormControl sx={{ m: 1 }} variant="standard">
                    <Select
                        labelId="year"
                        id="year"
                        value={link}
                        style={{ maxWidth: '200px' }}
                        onChange={(e) => {
                            if (e.target.value) {
                                useKt.setState({ link: e.target.value, linkGroup: [...useKt.getState().linkGroup, e.target.value] });
                            }
                        }}
                    >
                        <MenuItem value="">不做任何引用</MenuItem>
                        {links.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>{item.title} - {item.author} 《{item.articleSource}》</MenuItem>
                            );
                        }
                        )}
                    </Select>
                </FormControl>)}
            </Box>
            {linkGroup.map((item, index) => {
                return (
                    <Box style={{ color: "#000", marginTop: "6px" }} key={index}>
                        <Box
                            key={index}
                            className="item"
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Box
                                className="item"
                                style={{ display: "flex", justifyContent: "flex-start" }}
                            >
                                <Typography style={{ marginRight: "6px", fontSize: "14px" }}>
                                    {item.title}
                                </Typography>
                                <Typography
                                    style={{
                                        marginRight: "6px",
                                        fontSize: "14px",
                                        color: "#71a7fb",
                                    }}
                                >
                                    {item.author}
                                </Typography>
                                <Typography
                                    style={{
                                        marginRight: "6px",
                                        fontSize: "14px",
                                        color: "#71a7fb",
                                    }}
                                >
                                    {item.articleSource}
                                </Typography>
                            </Box>
                            <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="delete"
                                width="1em"
                                height="1em"
                                fill="#f30"
                                aria-hidden="true"
                                style={{ cursor: "pointer" }}
                                onClick={removeItem.bind(this, item)}
                            >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                            </svg>
                        </Box>

                        <Divider />
                    </Box>
                );
            })}
            {/* <TextField
                id="item-6"
                label="重新润色要求"
                rows={4}
                style={{ minWidth: "500px", marginBottom: "10px" }}
                multiline
                value={prompt}
                onChange={(e) => {
                    useKt.setState({ prompt: e.target.value });
                }}
            /> */}
            <Box style={{ display: "flex" }}>
                <LoadingButton
                    loading={loadingCreateKt}
                    onClick={createKt}
                    variant="contained"
                    style={{ marginTop: "16px", marginRight: "8px" }}
                >
                    生成开题报告
                </LoadingButton>
                <Button
                    onClick={saveKt}
                    variant="contained"
                    style={{ marginTop: "16px" }}
                >
                    保存开题报告
                </Button>
            </Box>
        </Box>
    );
}
