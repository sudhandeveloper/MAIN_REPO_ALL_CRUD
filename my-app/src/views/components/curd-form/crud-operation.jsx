import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "@emotion/styled";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "./crud.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
// import EmployeeTable from "../../commponents/dashbord-components/Orders";

const CrudOperation = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  //   --------------------------------------------
  const top100Films = [
    { label: "front end developer" },
    { label: "back end developer" },
    { label: "Full stack developer" },
    { label: "react js developer" },
  ];
  //   ---------------------------------------------
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    position: "",
    gender: "",
    address: "",
    city: "",
    phoneNumber: "",
    state: "",
    zip: "",
    dob: "",
    resume: "",
  });
  const [empdata, setempdata] = useState([]);
  //   ---------------------------------
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  // ----------------------------------------
  const loaddata = async () => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        setempdata(res.data);
      })
      .catch((err) => console.log(alert(err)));
  };
  useEffect(() => {
    loaddata();
  }, []);
  //   ----------------------------------------------
  const subbmitedata = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users",
        employeeData
      );
      console.log("Product created:", response.data);
      setEmployeeData({
        name: "",
        email: "",
        position: "",
        gender: "",
        address: "",
        city: "",
        phoneNumber: "",
        state: "",
        zip: "",
        dob: "",
        photo: "",
      });
      setTimeout(loaddata, 500);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(empdata);
  // ------------------------------------------
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setEmployeeData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  return (
    <>
      <section className="p-6 mt-16">
        <div className="container flex flex-col mx-auto space-y-12">
          <fieldset className="gap-6 p-6 text-black rounded-md shadow-md shadow-gray-600">
            <div className="items-center mb-8 text-center">
              <p className="text-2xl ">Employment Form</p>
            </div>

            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm ">
                  Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="First name"
                  className="w-full   border-[1px] rounded-sm  px-1 py-1 outline-none "
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm ">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="position" className="text-sm ">
                  Position you are applying for
                </label>
                <Autocomplete
                  onChange={handleChange}
                  label="Position"
                  id="combo-box-demo"
                  size="small"
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Position you are applying for"
                    />
                  )}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="address" className="text-sm ">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="address"
                  value={employeeData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="city" className="text-sm ">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="city"
                  value={employeeData.city}
                  onChange={handleChange}
                />
              </div>
              <div className=" col-span-full sm:col-span-2">
                <label className=""> Phone Number: </label>
                <PhoneInput
                  country={"in"}
                  value={employeeData.phoneNumber}
                  onChange={handleChange}
                  inputProps={{
                    required: true,
                  }}
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm ">
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="State / Province"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="state"
                  value={employeeData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="zip" className="text-sm ">
                  ZIP / Postal
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder="ZIP / Postal"
                  className="w-full   border-[1px] rounded-sm px-1 py-1 outline-none "
                  name="zip"
                  value={employeeData.zip}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm ">Date of birth</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "MobileDatePicker",
                      "DesktopDatePicker",
                      "StaticDatePicker",
                    ]}
                  >
                    <DemoItem>
                      <DesktopDatePicker
                        value={employeeData.dob}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="mt-5 col-span-full sm:col-span-3">
                <div>
                  {" "}
                  <label htmlFor="resume" className="pr-3 text-sm ">
                    Resume
                  </label>{" "}
                </div>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    name="photo"
                    value={employeeData.photo}
                    accept="image/*"
                    onChange={handleChange}
                    type="file"
                  />
                </Button>
              </div>
              <div className="mt-10 col-span-full sm:col-span-2">
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  onClick={subbmitedata}
                >
                  Submit
                </Button>
              </div>
            </div>
          </fieldset>
        </div>

        <section>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">email</TableCell>
                  <TableCell align="right">position&nbsp;(g)</TableCell>
                  <TableCell align="right">gender&nbsp;(g)</TableCell>
                  <TableCell align="right">address&nbsp;(g)</TableCell>
                  <TableCell align="right">city&nbsp;(g)</TableCell>
                  <TableCell align="right">phoneNumber&nbsp;(g)</TableCell>
                  <TableCell align="right">state&nbsp;(g)</TableCell>
                  <TableCell align="right">zip&nbsp;(g)</TableCell>
                  <TableCell align="right">dob&nbsp;(g)</TableCell>
                  <TableCell align="right">resume&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empdata.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.position}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                    <TableCell align="right">{row.zip}</TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">{row.photo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
    </>
  );
};

export default CrudOperation;
