import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { subjects } from "../utils/subjects";

import { useBasicSettings } from '../store/paperSettings';

export default function SelectCourse() {
  const [course, setCourse] = useState([]);
  const [subject, setSubject] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");

  const handleChangeCourse = (value) => {
    setCurrentCourse(value.target.value);
    setSubject(value.target.value.children);
    setCurrentSubject(value.target.value.children[0]);
    useBasicSettings.setState({
      course:value.target.value.name,
      subject:value.target.value.children[0].name
    });
  };

  const handleChangeSubject = (value) => {
    setCurrentSubject(value);
    useBasicSettings.setState({
      course:currentCourse.name,
      subject:value.name
    });
  };

  useEffect(() => {
    setCourse(subjects);
    setCurrentCourse(subjects[0]);
    setSubject(subjects[0].children);
    setCurrentSubject(subjects[0].children[0]);

  }, []);
  return (
    <Box>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Select
          labelId="course"
          id="course"
          value={currentCourse}
          onChange={handleChangeCourse}
        >
          {course.map((v) => (
            <MenuItem key={v.id} value={v}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Select
          labelId="subject"
          id="subject"
          value={currentSubject}
          onChange={(e) => {
            handleChangeSubject(e.target.value);
          }}
        >
          {subject.map((v) => (
            <MenuItem key={v.id} value={v}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
