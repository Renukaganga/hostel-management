'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';

const ComplaintForm: React.FC = () => {
  const [userData, setUserData] = useState({
    student_name: '',
    student_id: '',
    hostel: '',
    floor: '',
    room_number: '',
    email: '',
    phone_number: '',
  });
  const [complaint, setComplaint] = useState('');
  const [department, setDepartment] = useState('CHOOSE DEPARTMENT');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user data based on student ID (mock implementation)
    const fetchUserData = async (studentId: string) => {
      try {
        const response = await axios.get(`/api/users/${studentId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const studentId = '12345'; // Replace with dynamic student ID
    fetchUserData(studentId);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('student_name', userData.student_name);
    formData.append('student_id', userData.student_id);
    formData.append('hostel', userData.hostel);
    formData.append('floor', userData.floor);
    formData.append('room_number', userData.room_number);
    formData.append('email', userData.email);
    formData.append('phone_number', userData.phone_number);
    formData.append('complaint', complaint);
    formData.append('department', department);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('/api/complaints', formData);
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4">Student Complaint Form</Typography>
      <TextField label="Student Name" value={userData.student_name} fullWidth margin="normal" disabled />
      <TextField label="Student ID" value={userData.student_id} fullWidth margin="normal" disabled />
      <TextField label="Hostel" value={userData.hostel} fullWidth margin="normal" disabled />
      <TextField label="Floor" value={userData.floor} fullWidth margin="normal" disabled />
      <TextField label="Room Number" value={userData.room_number} fullWidth margin="normal" disabled />
      <TextField label="Email" value={userData.email} fullWidth margin="normal" disabled />
      <TextField label="Phone Number" value={userData.phone_number} fullWidth margin="normal" disabled />
      <TextField
        label="Complaint"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <MenuItem value="CHOOSE DEPARTMENT">CHOOSE DEPARTMENT</MenuItem>
          <MenuItem value="ELECTRICIAN">ELECTRICIAN</MenuItem>
          <MenuItem value="PLUMBER">PLUMBER</MenuItem>
          <MenuItem value="HOUSEKEEPING">HOUSEKEEPING</MenuItem>
          <MenuItem value="TECHSUPPORT">TECHSUPPORT</MenuItem>
          <MenuItem value="AC REPAIR">AC REPAIR</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ComplaintForm;
