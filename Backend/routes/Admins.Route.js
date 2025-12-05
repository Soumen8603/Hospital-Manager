const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { NurseModel } = require("../models/Nurse.model");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

/**
 * GET all admins
 */
router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    return res.status(200).send(admins);
  } catch (error) {
    console.error("Get admins error:", error);
    return res.status(400).send({ message: "Error" });
  }
});

/**
 * REGISTER admin
 */
router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return res.send({ message: "Admin already exists" });
    }

    const admin = new AdminModel(req.body);
    await admin.save();

    return res.send({ data: admin, message: "Registered" });
  } catch (error) {
    console.error("Admin register error:", error);
    return res.status(500).send({ message: "Error" });
  }
});

/**
 * LOGIN admin
 * Expects: { adminID, password }
 * Returns: { message, user, token }
 */
router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ adminID, password });

    if (!admin) {
      return res.send({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ adminID: admin.adminID }, process.env.key, {
      expiresIn: "24h",
    });

    return res.send({ message: "Successful", user: admin, token });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).send({ message: "Error" });
  }
});

/**
 * UPDATE admin
 */
router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;

  try {
    const admin = await AdminModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!admin) {
      return res.status(404).send({ message: `Admin with id ${id} not found` });
    }

    return res.status(200).send({ message: "Updated", admin });
  } catch (error) {
    console.error("Admin update error:", error);
    return res
      .status(400)
      .send({ message: "Something went wrong, unable to update" });
  }
});

/**
 * DELETE admin
 */
router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;

  try {
    const admin = await AdminModel.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).send({ message: `Admin with id ${id} not found` });
    }

    return res.status(200).send({ message: "Deleted" });
  } catch (error) {
    console.error("Admin delete error:", error);
    return res
      .status(400)
      .send({ message: "Something went wrong, unable to delete" });
  }
});

/**
 * SEND password (manual)
 */
router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg",
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and Password : ${password}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Send password mail error:", error);
      return res.status(500).send({ message: "Error" });
    }
    return res.send({ message: "Password reset email sent" });
  });
});

/**
 * FORGOT password (auto lookup by email + type)
 */
router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  try {
    if (type === "nurse") {
      user = await NurseModel.findOne({ email });
      userId = user?.nurseID;
      password = user?.password;
    } else if (type === "patient") {
      user = await PatientModel.findOne({ email });
      userId = user?.patientID;
      password = user?.password;
    } else if (type === "admin") {
      user = await AdminModel.findOne({ email });
      userId = user?.adminID;
      password = user?.password;
    } else if (type === "doctor") {
      user = await DoctorModel.findOne({ email });
      userId = user?.docID;
      password = user?.password;
    }

    if (!user || !userId || !password) {
      return res.send({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agrawaljoy1@gmail.com",
        pass: "zxkyjqfuhiizmxrg",
      },
    });

    const mailOptions = {
      from: "agrawaljoy1@gmail.com",
      to: email,
      subject: "Account ID and Password",
      text: `This is your User Id : ${userId} and Password : ${password}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Forgot password mail error:", error);
        return res.status(500).send({ message: "Error" });
      }
      return res.send({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).send({ message: "Error" });
  }
});

module.exports = router;
