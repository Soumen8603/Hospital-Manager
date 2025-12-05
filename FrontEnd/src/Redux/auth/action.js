import * as types from "./types";
import axios from "axios";

// Backend URL (from CRA env). Optional fallback for local dev.
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

// A small helper to extract a safe error message
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Error"
  );
};

// ================== LOGIN THUNKS ================== //

// Nurse login
export const NurseLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_NURSE_REQUEST });

    const res = await axios.post(`${API_URL}/nurses/login`, data);

    dispatch({
      type: types.LOGIN_NURSE_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data; // { message, user, token }
  } catch (error) {
    const message = getErrorMessage(error);

    dispatch({
      type: types.LOGIN_NURSE_ERROR,
      payload: { message },
    });

    // IMPORTANT: always return an object so DLogin can handle it
    return { message: "Error" };
  }
};

// Doctor login
export const DoctorLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_DOCTOR_REQUEST });

    const res = await axios.post(`${API_URL}/doctors/login`, data);

    dispatch({
      type: types.LOGIN_DOCTOR_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data;
  } catch (error) {
    const message = getErrorMessage(error);

    dispatch({
      type: types.LOGIN_DOCTOR_ERROR,
      payload: { message },
    });

    return { message: "Error" };
  }
};

// Admin login
export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });

    const res = await axios.post(`${API_URL}/admin/login`, data);

    console.log("Admin login response:", res.data);

    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data;
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("Admin login error:", error);

    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: { message },
    });

    return { message: "Error" };
  }
};

// ================== REGISTER THUNKS ================== //

export const DoctorRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_DOCTOR_REQUEST });
    const res = await axios.post(`${API_URL}/doctors/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_DOCTOR_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

export const NurseRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_NURSE_REQUEST });
    const res = await axios.post(`${API_URL}/nurses/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_NURSE_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

export const AdminRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_ADMIN_REQUEST });
    const res = await axios.post(`${API_URL}/admin/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_ADMIN_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// ================== OTHER ACTIONS ================== //

export const AmbulanceRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_AMBULANCE_REQUEST });
    const res = await axios.post(`${API_URL}/ambulances/add`, data);
    console.log(res);
  } catch (error) {
    dispatch({
      type: types.REGISTER_AMBULANCE_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// logout user
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOGOUT });
  } catch (error) {
    console.error(error);
  }
};

// update nurse
export const UpdateNurse = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_NURSE_REQUEST });
    const res = await axios.patch(`${API_URL}/nurses/${id}`, data);
    console.log(res);
    dispatch({ type: types.EDIT_NURSE_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.error(error);
  }
};

// update doctor
export const UpdateDoctor = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DOCTOR_REQUEST });
    const res = await axios.patch(`${API_URL}/doctors/${id}`, data);
    console.log(res);
    dispatch({ type: types.EDIT_DOCTOR_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.error(error);
  }
};

// send password mail (manual)
export const SendPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DOCTOR_REQUEST });
    const res = await axios.post(`${API_URL}/admin/password`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return { message: "Error" };
  }
};

// forgot password
export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.FORGET_PASSWORD_REQUEST });
    const res = await axios.post(`${API_URL}/admin/forgot`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return { message: "Error" };
  }
};
