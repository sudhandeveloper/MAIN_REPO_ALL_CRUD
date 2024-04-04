import { React, useState } from "react";
import Box from "@mui/material/Box";
import {
  styled,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  IconButton,
  Modal,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../curd-form/crud.css";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// ----------------------------------------------

import { useEffect } from "react";
import dayjs from "dayjs";

// ---------------------------------------
import validation from "./validation";
import { fetchData, addData , updateDataAPI , deleteData } from "./api";
const CrudformTwo = () => {
  // ==================== Post data ================================
  const [uploaddata, setUploaddata] = useState({
    name: "",
    gender: "",
    dob: null,
    profession: "",
    phonenubmer: "",
    resume: "",
  });

  const [dispdata, setDispdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState({
    name: "",
    gender: "",
    dob: "",
    profession: "",
    phonenubmer: "",
    resume: "",
  });
// ---------------------------------------------
  const handleOnchange = (e) => {
    if (e.target.name === "resume") {
      const file = e.target.files[0]; // Get the selected file
      const reader = new FileReader(); // Create a new file reader
      reader.onload = () => {
        setUploaddata({ ...uploaddata, resume: reader.result }); // Update the state with the base64 data URL of the selected image
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    } else {
      setUploaddata({ ...uploaddata, [e.target.name]: e.target.value });
    }
  };
  const handleOnchanges = (value, name) => {
    setUploaddata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setUploaddata({ ...uploaddata, dob: date });
  };

 // -------------------------------------
 const handleOpen = (id) => {
  setOpen(true);
  setEditingId(id);
  const item = dispdata.find((row) => row.id === id);
  const dob = dayjs(item.dob);
  setUploaddata({ ...item, dob: dob });
};

const handleClose = () => {
  setOpen(false);
  setEditingId(null);
  setUploaddata({
    name: "",
    gender: "",
    dob: null,
    profession: "",
    phonenubmer: "",
    resume: "",
  });
};
// -------------------------------------- Crud operation
// ----------POST
  const handleSubmitebuttom = (e) => {
    e.preventDefault();

    let isValid = validation(uploaddata, setFormError);

    if (isValid) {
      addData(uploaddata)
        .then(() => {
          alert("Submitted");
          setUploaddata({
            name: "",
            gender: "",
            dob: null,
            profession: "",
            phonenubmer: "",
            resume: "",
          });
          setTimeout(fetchAndUpdateData, 500);
        })
        .catch((error) => {
          console.error("Error adding data:", error);
          alert("Failed to submit. Please try again.");
        });
    } else {
      alert("Invalid Form");
    }
  };
// ----------GET
  const fetchAndUpdateData = () => {
    fetchData()
      .then((data) => {
        setDispdata(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAndUpdateData();
  }, []);


  const handleDelete = (id) => {
    deleteData(id)
      .then(() => {
        fetchAndUpdateData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Failed to delete data. Please try again.");
      });
  };
 
  const handleUpdateData = () => {
    updateDataAPI(editingId, uploaddata)
      .then(() => {
        handleClose();
        fetchAndUpdateData();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Failed to update data. Please try again.");
      });
  };

  return (
    <Box
      component="section"
      mx={2}
      my={4}
      p={2}
      sx={{ p: 2, border: "1px dashed grey" }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 5, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12} lg={4} sm={6}>
            <Item>
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                sx={{ width: "100%" }}
                placeholder="Enter Your Name"
                name="name"
                value={uploaddata.name}
                onChange={handleOnchange}
                error={!!formError.name}
                helperText={formError.name}
              />
              <span className="non-valid"></span>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sm={6}>
            <Item>
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    error={!!formError.profession}
                    helperText={
                      formError.profession && "profession is required"
                    }
                    {...params}
                    label="Movie"
                  />
                )}
                name="profession"
                value={uploaddata.profession}
                onChange={(event, newValue) =>
                  handleOnchange({
                    target: {
                      name: "profession",
                      value: newValue ? newValue.label : "",
                    },
                  })
                }
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sm={6}>
            <Item>
              {" "}
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={uploaddata.gender}
                onChange={handleOnchange}
                error={!!formError.gender}
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
              {<span className="text-red-400">{formError.gender}</span>}
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sm={6}>
            <Item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    name="dob"
                    defaultValue={uploaddata.dob} // Change defaultValue to uploaddata.dob
                    value={uploaddata.dob}
                    onChange={handleDateChange}
                    error={!!formError.dob} // Set error based on the presence of dob error
                    helperText={formError.dob && "Date of birth is required"} // Display helper text if dob error exists
                    label="Birthdate"
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className="text-red-400">
                {formError.dob && "profession is required"}
              </span>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sm={6}>
            <Item>
              {" "}
              <div className=" col-span-full sm:col-span-2">
                <label className=""> Phone Number</label>

                <PhoneInput
                  country={"in"}
                  error={!!formError.phonenubmer}
                  name="phonenubmer"
                  value={uploaddata.phonenubmer}
                  onChange={(value) => handleOnchanges(value, "phonenubmer")}
                  inputProps={{
                    required: true,
                  }}
                />
                <span className="text-red-400">
                  {formError.phonenubmer && "phonenubmer is required"}
                </span>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sm={6}>
            <Item>
              <FormLabel id="demo-row-radio-buttons-group-label">
                file Upload
              </FormLabel>
              <Button
                sx={{ width: "100%" }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  name="resume"
                  error={!!formError.resume}
                  onChange={handleOnchange}
                  accept="image/*"
                  sx={{ width: "100%" }}
                  type="file"
                />
              </Button>
              {uploaddata.resume || formError.resume ? (
                uploaddata.resume ? (
                  <span className="text-blue-700">
                    File uploaded successfully
                  </span>
                ) : (
                  <span className="text-red-400">Resume is required</span>
                )
              ) : (
                <span className="text-red-400"></span>
              )}
            </Item>
          </Grid>
        </Grid>
        <center>
          {" "}
          <Button
            variant="contained"
            onClick={handleSubmitebuttom}
            sx={{ mt: 4, width: 200 }}
          >
            Submite
          </Button>
        </center>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 5, sm: 2, md: 3 }}
          >
            <Grid item md={6} xs={12} lg={4} sm={6}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  placeholder="Enter Your Name"
                  name="name"
                  value={uploaddata.name}
                  onChange={handleOnchange}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Item>
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                  name="profession"
                  value={uploaddata.profession}
                  onChange={(event, newValue) =>
                    handleOnchange({
                      target: {
                        name: "profession",
                        value: newValue ? newValue.label : "",
                      },
                    })
                  }
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Item>
                {" "}
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={uploaddata.gender}
                  onChange={handleOnchange}
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
              </Item>
            </Grid>

            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="dob"
                      defaultValue={dayjs("2022-04-17")}
                      // adapter={AdapterDayjs}
                      value={dayjs(uploaddata.dob)}
                      onChange={handleDateChange}
                      // error={formError.dob}
                      // helperText={formError.dob && "profession is required"}
                      label="Birthdate"
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Item>
            </Grid>

            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Item>
                <div className=" col-span-full sm:col-span-2">
                  <label className=""> Phone Number</label>

                  <PhoneInput
                    err
                    country={"in"}
                    name="phonenubmer"
                    value={uploaddata.phonenubmer}
                    onChange={(value) => handleOnchange(value, "phonenubmer")}
                    inputProps={{
                      required: true,
                    }}
                  />
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sm={6}>
              <Item>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  file Upload
                </FormLabel>
                {/* <Button
                  sx={{ width: "100%" }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    name="resume"
                    // value={uploaddata.resume}
                    onChange={handleOnchange}
                    accept=".pdf, .jpg, .jpeg, .png, .gif, .doc, .docx"
                    sx={{ width: "100%" }}
                    type="file"
                  />
                </Button> */}

                <Button
                  sx={{ width: "100%" }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    name="resume"
                    error={!!formError.resume}
                    onChange={handleOnchange}
                    accept="image/*"
                    sx={{ width: "100%" }}
                    type="file"
                  />
                </Button>
              </Item>
            </Grid>
          </Grid>
          <center>
            <Button
              variant="contained"
              onClick={handleUpdateData}
              sx={{ mt: 4, width: 200 }}
            >
              Submite
            </Button>
          </center>
        </Box>
      </Modal>
      {/* ------------------------------------------------ */}
      <div className="w-full p-5 mt-5 mb-5 text-3xl font-bold text-white bg-blue-400">
        <center>Table Data</center>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell> date of birth</StyledTableCell>
              <StyledTableCell>Profession</StyledTableCell>
              <StyledTableCell>phone number</StyledTableCell>
              <StyledTableCell>Resume</StyledTableCell>
              <StyledTableCell>Action </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispdata.map((row, Index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{Index + 1}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.gender}</StyledTableCell>
                <StyledTableCell>{row.dob}</StyledTableCell>
                <StyledTableCell>{row.profession}</StyledTableCell>
                <StyledTableCell>{row.phonenubmer}</StyledTableCell>
                <StyledTableCell>
                  <img className="h-10" src={row.resume} alt="loading" />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleOpen(row.id)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CrudformTwo;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// --------------------------------------------
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
// -------------------------------------------

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
// ----------------------------------------------
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
