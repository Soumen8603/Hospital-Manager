import * as types from "./types";
import axios from "axios";

// Use the same backend URL as in auth/actions
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Error";

// ================== REPORTS ================== //

// CreateReport
export const CreateReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REPORT_REQUEST });
    const res = await axios.post(`${API_URL}/reports/create`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_REPORT_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// GET DOCTOR DETAILS
export const GetDoctorDetails = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_REQUEST });
    const res = await axios.get(`${API_URL}/doctors`);
    console.log(res);
    // If needed later you can dispatch success with payload
    // dispatch({ type: types.GET_DOCTOR_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_DOCTOR_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// ================== PATIENTS ================== //

// ADD PATIENTS
export const AddPatients = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_PATIENT_REQUEST });
    const res = await axios.post(`${API_URL}/patients/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_PATIENT_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// GET ALL PATIENT
export const GetPatients = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PATIENT_REQUEST });
    const res = await axios.get(`${API_URL}/patients`);
    console.log(res.data);
    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    // optionally dispatch an error action
    // dispatch({ type: types.GET_PATIENT_ERROR, payload: getErrorMessage(error) });
  }
};

// ================== BEDS ================== //

// ADD BEDS (create new bed document)
export const CreateBeds = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_BED_REQUEST });
    const res = await axios.post(`${API_URL}/beds/add`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_BED_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// GET BEDS (list)
export const GetBeds = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_BED_REQUEST });
    const res = await axios.get(`${API_URL}/beds`);
    console.log(res);
    dispatch({
      type: types.GET_BED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BED_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// ADD_SINGLE_BED (same endpoint as CreateBeds, used from admin page)
export const AddBed = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_BEDS_REQUEST });
    const res = await axios.post(`${API_URL}/beds/add`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_BEDS_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// GET SINGLE BED
export const GetSingleBed = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_BEDS_REQUEST });
    const res = await axios.post(`${API_URL}/beds/single`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// EDIT SINGLE BED
export const EditSingleBed = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_BEDS_REQUEST });
    const res = await axios.patch(`${API_URL}/beds/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// DISCHARGE PATIENT
export const dischargePatient = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.DISCHARGE_PATIENT_REQUEST });
    const res = await axios.put(`${API_URL}/beds/discharge`, data);
    console.log(res);
    dispatch({
      type: types.DISCHARGE_PATIENT_SUCCESS,
      payload: { bed: res.data.bed },
    });
  } catch (error) {
    console.log(error);
  }
};

// ================== PAYMENTS ================== //

export const CreatePayment = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_PAYMENT_REQUEST });
    const res = await axios.post(`${API_URL}/payments/add`, data);
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.CREATE_PAYMENT_ERROR,
      payload: { message: getErrorMessage(error) },
    });
  }
};

// ================== APPOINTMENTS ================== //

// CREATE BOOKING
export const CreateBooking = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BOOKING_REQUEST });
    const res = await axios.post(`${API_URL}/appointments/create`, data);
    console.log(res);
    // dispatch({ type: types.CREATE_BOOKING_SUCCESS, payload: res.data.postData });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL APPOINTMENT DETAILS
export const GetAllAppointment = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_APPOINTMENT_DETAILS_REQUEST });
    const res = await axios.get(`${API_URL}/appointments`);
    dispatch({
      type: types.GET_APPOINTMENT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE APPOINTMENTS
export const DeleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_APPOINTMENT_REQUEST });
    const res = await axios.delete(`${API_URL}/appointments/${id}`);
    console.log(res.data);
    dispatch({
      type: types.DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// ================== DASHBOARD DATA ================== //

// GET ALL DATA (counts for doctor, nurse, patient, beds, etc.)
export const GetAllData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALLDATA_REQUEST });
    const res = await axios.get(`${API_URL}/hospitals`);
    console.log(res.data);
    dispatch({
      type: types.GET_ALLDATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL REPORTS
export const GetAllReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_REPORTS_REQUEST });
    const res = await axios.get(`${API_URL}/reports`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
