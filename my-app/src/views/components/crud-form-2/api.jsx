// api.js

import axios from "axios";

export const API_URL_TWO =
  // "https://65f6713541d90c1c5e0ad28f.mockapi.io/api/epmloyeedata";
  "http://localhost:8080/users";

// Function to fetch data from the API
export const fetchData = () => {
  return axios
    .get(API_URL_TWO)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

// Function to add new data
export const addData = (data) => {
  return axios
    .post(API_URL_TWO, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding data:", error);
      throw error;
    });
};

// Function to delete data by ID
export const deleteData = (id) => {
  return axios
    .delete(`${API_URL_TWO}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting data:", error);
      throw error;
    });
};

// Function to update data by ID
export const updateDataAPI = (id, data) => {
  return axios
    .put(`${API_URL_TWO}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
};
