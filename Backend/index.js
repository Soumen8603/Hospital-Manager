const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

const adminRouter = require("./routes/Admins.Route");
const ambulanceRouter = require("./routes/Ambulances.Route");
const appointmentRouter = require("./routes/Appointments.Route");
const bedRouter = require("./routes/Beds.Route");
const doctorRouter = require("./routes/Doctors.Route");
const hospitalRouter = require("./routes/Hospitals.Route");
const nurseRouter = require("./routes/Nurses.Route");
const patientRouter = require("./routes/Patients.Route");
const paymentRouter = require("./routes/Payments.route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");

const app = express();

app.use(express.json());

// --- CORRECTED CORS CONFIGURATION ---
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
// --- END OF CORRECTED SECTION ---

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/admin", adminRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/appointments", appointmentRouter);
app.use("/beds", bedRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/nurses", nurseRouter);
app.use("/patients", patientRouter);
app.use("/payments", paymentRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);

// --- START OF DIAGNOSTIC TEST ROUTE ---
// This route is for testing purposes only. It bypasses the database and JWT logic.
app.post("/test-login", (req, res) => {
  console.log("--- SERVER RECEIVED TEST LOGIN REQUEST ---");
  res.status(200).send({ message: "Successful", user: {name: "Test User"}, token: "test-token" });
});
// --- END OF DIAGNOSTIC TEST ROUTE ---

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
    console.log(error);
  }
  console.log(`Listening at port ${PORT}`);
});

