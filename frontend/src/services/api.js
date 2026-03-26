const API = "/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getAppointments = async (token) => {
  const res = await fetch(`${API}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const createAppointment = async (data, token) => {
  const res = await fetch(`${API}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteAppointment = async (id, token) => {
  const res = await fetch(`${API}/appointments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};