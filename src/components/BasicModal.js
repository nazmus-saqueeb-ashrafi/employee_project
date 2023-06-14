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
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

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

  const [type, setType] = useState(100);
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
  const getDistricts = async (divisionID) => {
    const response = await fetch(`${GET_DISTRICTS_API_URL}` + divisionID);
    const data = await response.json();
    // console.log(data);

    setDistricts(data.readDistrictData);
  };
  const handleDistrictChange = (event) => {
    // getDistricts(division);
    setDistrict(event.target.value);
  };

  // useEffects
  useEffect(() => {
    getDivisions();
  }, []);

  useEffect(() => {
    getDistricts(division);
  }, [handleDivisionChange]);

  //

  const initalValues = {
    firstName: "",
    lastName: "",
  };

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
          <Box textAlign="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create User
            </Typography>
          </Box>
          <br />
          <Formik
            initialValues={initalValues}
            onSubmit={(values, formikHelpers) => {
              // console.log(values);
              // console.log(type);
              // console.log(district);

              // if type is 100 its Admin
              // if type is 200 its Employee

              const post = {
                firstName: values.firstName,
                lastName: values.lastName,
                employeeType: type == 100 ? "Admin" : "Employee",
                districeID: type == 100 ? 0 : district,
              };

              console.log(post);

              fetch(
                "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation/",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(post),
                }
              ).then(() => {
                console.log("new user added");
              });

              formikHelpers.resetForm();

              handleClose();

              // refresh here to show updated info
              window.location.reload();
            }}
            validationSchema={object({
              firstName: string().required("Please enter first name"),
              lastName: string().required("Please enter last name"),
            })}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <Field
                    name="firstName"
                    type="firstName"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="First Name"
                    fullWidth
                    error={
                      Boolean(errors.firstName) && Boolean(touched.firstName)
                    }
                    helperText={Boolean(touched.firstName) && errors.firstName}
                  ></Field>
                  <Field
                    name="lastName"
                    type="lastName"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Last Name"
                    fullWidth
                    error={
                      Boolean(errors.lastName) && Boolean(touched.lastName)
                    }
                    helperText={Boolean(touched.lastName) && errors.lastName}
                  ></Field>
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
                              <MenuItem
                                key={division.divID}
                                value={division.divID}
                              >
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

                {type == "200" && division > 0 ? (
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
                            // console.log(district);

                            return (
                              <MenuItem
                                key={district.districtID}
                                value={district.districtID}
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

                <br />

                <Box textAlign="center">
                  <Button type="submit" variant="contained">
                    Create
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
