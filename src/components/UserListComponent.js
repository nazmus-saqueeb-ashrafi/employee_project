import React, { useEffect, useState, useMemo } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const GET_USERS_API_URL = "http://59.152.62.177:8085/api/Employee/EmployeeData";

export default function UserListComponent({ type }) {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const getUsers = async () => {
    const response = await fetch(`${GET_USERS_API_URL}`);
    const data = await response.json();

    // console.log(data.readEmployeeData);

    if (type == "admin") {
      setUsers(data.readEmployeeData.filter((x) => x.employeeType == "Admin"));
    } else {
      setUsers(
        data.readEmployeeData.filter((x) => x.employeeType == "Employee")
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredItems = useMemo(() => {
    return users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [users, query]);

  return (
    <>
      Search :
      <Box sx={{ m: 1 }} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
      />
      <br />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {filteredItems.map((value) => (
          <ListItem
            key={value.empID}
            disableGutters
            secondaryAction={<Button variant="contained">Detail</Button>}
          >
            <ListItemText primary={`${value.firstName} ${value.lastName}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
