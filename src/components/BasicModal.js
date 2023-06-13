import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Container, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

const GET_DIVISIONS_API_URL = "http://59.152.62.177:8085/api/Employee/Division";
const GET_DISTRICTS_API_URL =
  "http://59.152.62.177:8085/api/Employee/District/";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [type, setType] = useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Division Field Handling Logic
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState(0);
  const getDivisions = async () => {
    const response = await fetch(`${GET_DIVISIONS_API_URL}`);
    const data = await response.json();

    setDivisions(data.readDivisionData);
  };
  const handleDivisionChange = (event) => {
    setDivision(event.target.value);

    // console.log(division);
  };

  // District Field Handling Logic
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(0);
  const getDistricts = async (distID) => {
    const response = await fetch(`${GET_DISTRICTS_API_URL}` + distID);
    const data = await response.json();
    console.log(data);

    setDistricts(data.readDistrictData);
  };
  const handleDistrictChange = (event) => {
    // getDistricts(division);
    setDistrict(event.target.value);
  };

  useEffect(() => {
    getDivisions();
  }, []);

  useEffect(() => {
    getDistricts(division);
  }, [handleDivisionChange]);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open modal
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a user
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <br />

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              //   onChange={(e) => setFirstName(e.target.value)}
              //   value={firstName}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              //   onChange={(e) => setLastName(e.target.value)}
              //   value={lastName}
              fullWidth
              required
            />
          </Stack>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={100}>Admin</MenuItem>
                <MenuItem value={200}>Employee</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* {console.log(type == "200")} */}
          {type == "200" ? (
            <>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Division
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={division ?? division.divID}
                    label="Division"
                    onChange={handleDivisionChange}
                  >
                    {divisions.map((division) => {
                      //   console.log(division.divisionName);
                      return (
                        <MenuItem key={division.divID} value={division.divID}>
                          {division.divisionName}
                          {/* --
                          {division.divID} */}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </>
          ) : null}

          {division > 0 ? (
            <>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    District
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district ?? district.districtID}
                    label="District"
                    onChange={handleDistrictChange}
                  >
                    {districts.map((district) => {
                      console.log(district);

                      return (
                        <MenuItem
                          key={district.districtID}
                          value={district.districtName}
                        >
                          {district.districtName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
