import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";

const GET_USERS_API_URL = "http://59.152.62.177:8085/api/Employee/EmployeeData";

export default function UserListComponent({ type }) {
  const [users, setUsers] = useState([]);

  const getAdminUsers = async () => {
    const response = await fetch(`${GET_USERS_API_URL}`);
    const data = await response.json();

    console.log(data.readEmployeeData);

    if (type == "admin") {
      setUsers(data.readEmployeeData.filter((x) => x.employeeType == "Admin"));
    } else {
      setUsers(
        data.readEmployeeData.filter((x) => x.employeeType == "Employee")
      );
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((value) => (
          <ListItem
            key={value.empID}
            disableGutters
            secondaryAction={<Button variant="contained">Edit</Button>}
          >
            <ListItemText primary={`${value.firstName} ${value.lastName}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
