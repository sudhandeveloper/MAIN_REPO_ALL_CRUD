import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../components/curd-form/constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const PageOne = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [check, setCheck] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [apidata, setApi] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(API_URL);
      setApi(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postData = async () => {
    try {
      await axios.post(API_URL, { name, check });
      setName("");
      setCheck(false);
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setEditingId(id);
    const item = apidata.find((row) => row.id === id);
    setName(item.name);
    setCheck(item.check);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setName("");
    setCheck(false);
  };

  const updateData = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, { name, check });
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <center>
      <div className="mb-3 col-span-full sm:col-span-3 w-[40%]">
        <label htmlFor="firstname" className="text-sm ">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="First name"
          className="w-full   border-[1px] rounded-sm  px-1 py-1 outline-none "
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <Checkbox
          checked={check}
          onChange={(e) => setCheck(e.target.checked)}
        />
      </div>
      <div className="mt-10 col-span-full sm:col-span-2">
        <Button
          size="large"
          variant="contained"
          type="submit"
          onClick={postData}
        >
          Submit
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apidata.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.check ? "checked" : "not checked"}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteUser(row.id)}>Delete</Button>
                  <Button onClick={() => handleOpen(row.id)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="mb-3 col-span-full sm:col-span-3 w-[40%]">
            <label htmlFor="firstname" className="text-sm ">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="First name"
              className="w-full   border-[1px] rounded-sm  px-1 py-1 outline-none "
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <Checkbox
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
          </div>
          <div className="mt-10 col-span-full sm:col-span-2">
            <Button
              size="large"
              variant="contained"
              type="submit"
              onClick={updateData}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </center>
  );
};

export default PageOne;
