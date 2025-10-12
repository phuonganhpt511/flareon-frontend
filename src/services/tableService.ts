import axios from "axios";

const API_URL = "https://api-datn-orderfood-backend.onrender.com"; 

export const getTables = (token: string) =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTable = (data: any, token: string) =>
  axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTable = (id: string, data: any, token: string) =>
  axios.patch(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTable = (id: string, token: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateTableStatus = (id: string, data: any, token: string) =>
  axios.patch(`${API_URL}/${id}/status`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
