import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import "../assets/css/main.css";

import { useActions } from "../store/uiActions";
import { useLinks, useRequest } from "../store/paperSettings";

import { handleGeneralLinks } from "../utils/generalLinks";

export default function CreateLinks() {
    const { loadingCreateLinks } = useActions((store) => store);

    const { links, keyword, year,type } = useLinks((store) => store);
    const createLinks = async () => {
        if (keyword.length > 0) {
            useActions.setState({ loadingCreateLinks: true });
            await handleGeneralLinks([], "glm4v", 0.1);
            useActions.setState({ loadingCreateLinks: false });
        } else {
            alert("请先填写在知网需要检索的关键词");
        }
    };

    const saveLinks = () => {
        useLinks.setState({ links });
        useActions.setState({ showLinksPopup: false });
    };

    const handleChangeYear = (value) => {
        useLinks.setState({ year: value.target.value, page: 1 });
    };

    const removeItem = (item) => {
        const newLinks = links.filter((link) => link !== item);
        useLinks.setState({ links: newLinks });
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
                required
                label="知网检索关键词"
                style={{ minWidth: "500px", marginBottom: "10px" }}
                value={keyword}
                onChange={(e) => {
                    useLinks.setState({ keyword: e.target.value });
                }}
            />
            <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                    labelId="year"
                    id="year"
                    value={year}
                    onChange={handleChangeYear}
                >
                    <MenuItem value="2"> 5年内 </MenuItem>
                    <MenuItem value="1"> 10年内 </MenuItem>
                    <MenuItem value="3"> 3年内 </MenuItem>
                </Select>
            </FormControl>

            {links.map((item, index) => {
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
                                onClick={() => removeItem(item)}
                            >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                            </svg>
                        </Box>
                        <Typography
                            style={{
                                marginRight: "6px",
                                fontSize: "12px",
                                color: "#999",
                                marginBottom: "6px",
                            }}
                        >
                            匹配摘要： {item.summary}
                        </Typography>
                        <Divider />
                    </Box>
                );
            })}
            <Box style={{ display: "flex" }}>
                <LoadingButton
                    loading={loadingCreateLinks}
                    onClick={createLinks}
                    variant="contained"
                    style={{ marginTop: "16px", marginRight: "8px" }}
                >
                    检索文献
                </LoadingButton>
                <Button
                    onClick={saveLinks}
                    variant="contained"
                    style={{ marginTop: "16px" }}
                >
                    保存文献列表
                </Button>
            </Box>
        </Box>
    );
}
