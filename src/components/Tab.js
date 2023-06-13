import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Button from "@mui/material/Button";

export default function TabComponent() {
  const [value, setValue] = useState("1");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "300px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              centered
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="User" value="1" />
              <Tab label="Employee" value="2" />
            </TabList>
          </Box>

          <Button variant="contained">Add a user</Button>

          <TabPanel value="1">Admin User List</TabPanel>
          <TabPanel value="2">Employee User List</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}