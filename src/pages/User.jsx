import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useMemo } from "react";

const GET_USER_API_URL = "http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/"

export default function User() {
    const {id} = useParams()


    const [user, setUser] = useState({});
    const getUser = async () => {
    const response = await fetch(`${GET_USER_API_URL}` + id);
    const data = await response.json();

    console.log(data.readEmployeeData[0]);
    setUser(data.readEmployeeData[0])

  };

  useEffect(() => {
    getUser();
  }, []);


  return (

    <>

    <Box textAlign='center'>
        <Card sx={{ minWidth: 275 }}>
            <Box
                sx={{
                    
                    height: 50,
                    
                }}
            />
            <CardContent>
                <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
                User Name: {user.firstName} {user.lastName}
                </Typography>

                
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                User Division: {user.disvision}
                </Typography>
                
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                User District: {user.district}
                </Typography>
                
                <Typography variant="body2" sx={{ fontSize: 20 }} >
                User Type: {user.employeeType}
                <br />
                </Typography>
            </CardContent>
            
            <Button variant="contained">Edit</Button>
            <Box
                sx={{
                    
                    height: 50,
                    
                }}
            />
        
        </Card>

    </Box>
    
    </>
  )
}
