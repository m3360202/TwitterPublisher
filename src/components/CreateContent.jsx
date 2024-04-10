import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../assets/css/main.css";

import { useActions } from "../store/uiActions";
import { useRequest, useContent, useLinks } from "../store/paperSettings";

import { handleGeneralContents } from "../utils/generalContent";
import { Typography } from "@mui/material";

export default function CreateContent() {
    const { loadingCreateContent } = useActions((store) => store);

    const { titleResult } = useRequest((store) => store);

    const { content, prompt, studyContent, link, linkGroup, step } = useContent((store) => store);

    const { links } = useLinks((store) => store);

    const executeGeneralContent = async () => {
        for (let i = 0; i < 4; i++) {
            await handleGeneralContents();
        }

    };

    const createContent = async () => {
        if (titleResult.length > 0) {
            useActions.setState({ loadingCreateContent: true });
            await executeGeneralContent();

            useActions.setState({ loadingCreateContent: false });
        } else {
            alert(
                "请先填写专业学科及论文选题要素,如果需要再次生成请填写重新润色要求"
            );
        }
    };

    const saveContent = () => {
        useContent.setState({ content, process: 1, step: 1, prompt: "" });
        useActions.setState({ showContentPopup: false });
    };

    const removeItem = (item) => {
        const newLinks = linkGroup.filter((link) => link !== item);
        useContent.setState({ linkGroup: newLinks });
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
            {/* {Array.from({ length: num }, (_, index) => (
                <>
                <TextField
                    key={`item-${index}`} // 使用 key 是一个好的实践，以帮助 React 识别哪些项改变了
                    id={`item-${index}`}
                    label={`章节 ${index + 1}`} // 假设 label 是根据索引生成的
                    rows={8}
                    multiline
                    style={{ minWidth: "500px", marginBottom: "10px" }}
                    value={content[index]} // 确保 content 是一个响应式的状态
                    placeholder="为了生成质量，请第一次粘贴范文对应章节"
                    onChange={(e) => {
                            const newContent = [...content];
                            newContent[index] = e.target.value;
                            console.log('aaaa',newContent)
                            useContent.setState({ content: newContent });
                    }}
                />
                
            <TextField
                id="item-6"
                label="重新润色要求"
                rows={4}
                style={{ minWidth: "500px", marginBottom: "10px" }}
                multiline
                value={prompt}
                onChange={(e) => {
                    // 更新 prompt 状态
                    useContent.setState({ prompt: e.target.value });
                }}
            />
            
            <LoadingButton
                loading={loadingCreateContent}
                onClick={createContent.bind(this,index)}
                variant="contained"
                style={{ marginTop: "16px", marginRight: "8px",marginBottom: "16px"}}
            >
                生成章节
            </LoadingButton>
        </>
    ))
} */}
            <TextField
                required
                key='item1' // 使用 key 是一个好的实践，以帮助 React 识别哪些项改变了
                id='item1'
                label='范文 ' // 假设 label 是根据索引生成的
                rows={8}
                multiline
                style={{ minWidth: "500px", marginBottom: "10px" }}
                value={studyContent} // 确保 content 是一个响应式的状态
                placeholder="请将范文章节粘贴到此处，最多1000字"
                onChange={(e) => {
                    console.log('aaaa', e.target.value)
                    useContent.setState({ studyContent: e.target.value });
                }}
            />


            <TextField
                id="item-6"
                label="额外要求"
                rows={2}
                style={{ minWidth: "500px", marginBottom: "10px" }}
                multiline
                value={prompt}
                onChange={(e) => {
                    // 更新 prompt 状态
                    useContent.setState({ prompt: e.target.value });
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
                            useContent.setState({ link: e.target.value, linkGroup: [...useContent.getState().linkGroup, e.target.value] });

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
            <TextField
                key='item2' // 使用 key 是一个好的实践，以帮助 React 识别哪些项改变了
                id='item2'
                label='生成的内容' // 假设 label 是根据索引生成的
                rows={8}
                multiline
                style={{ minWidth: "500px", marginBottom: "10px" }}
                value={content} // 确保 content 是一个响应式的状态
                placeholder="请将范文章节粘贴到此处，最多1000字"
                onChange={(e) => {
                    useContent.setState({ content: e.target.value });
                }}
            />

            <LoadingButton
                loading={loadingCreateContent}
                onClick={createContent}
                variant="contained"
                style={{ marginTop: "16px", marginRight: "8px", marginBottom: "16px" }}
            >
                生成章节
            </LoadingButton>
        </Box>
    );
}
