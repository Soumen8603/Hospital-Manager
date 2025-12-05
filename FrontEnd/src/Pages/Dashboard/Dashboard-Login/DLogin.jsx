import React, { useState } from "react";
import { Radio, Drawer } from "antd";
import banner from "../../../img/banner.png";
import admin from "../../../img/admin.jpg";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  DoctorLogin,
  forgetPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const DLogin = () => {
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [placement, SetPlacement] = useState("Nurse");
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });

  const [ForgetPassword, setForgetPassword] = useState({
    type: "",
    email: "",
  });
  const [forgetLoading, setforgetLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formvalue.ID === "" || formvalue.password === "") {
      notify("Please fill all fields");
      setLoading(false);
      return;
    }

    if (placement === "Nurse") {
      const data = {
        ...formvalue,
        nurseID: formvalue.ID,
      };

      dispatch(NurseLogin(data)).then((res) => {
        const msg = res?.message;

        if (msg === "Successful") {
          notify("Login Successful");
          setLoading(false);
          return navigate("/dashboard");
        }
        if (msg === "Wrong credentials") {
          notify("Wrong credentials");
        } else if (msg === "Error") {
          notify("Something went Wrong, Please Try Again");
        } else {
          notify("Unexpected error");
        }
        setLoading(false);
      });
    } else if (placement === "Doctor") {
      const data = {
        ...formvalue,
        docID: formvalue.ID,
      };

      dispatch(DoctorLogin(data)).then((res) => {
        const msg = res?.message;

        if (msg === "Successful") {
          notify("Login Successful");
          setLoading(false);
          return navigate("/dashboard");
        }
        if (msg === "Wrong credentials") {
          notify("Wrong credentials");
        } else if (msg === "Error") {
          notify("Something went Wrong, Please Try Again");
        } else {
          notify("Unexpected error");
        }
        setLoading(false);
      });
    } else if (placement === "Admin") {
      const data = {
        ...formvalue,
        adminID: formvalue.ID,
      };

      dispatch(AdminLogin(data)).then((res) => {
        const msg = res?.message;

        if (msg === "Successful") {
          notify("Login Successful");
          setLoading(false);
          return navigate("/dashboard");
        }
        if (msg === "Wrong credentials") {
          notify("Wrong credentials");
        } else if (msg === "Error") {
          notify("Something went Wrong, Please Try Again");
        } else {
          notify("Unexpected error");
        }
        setLoading(false);
      });
    }
  };

  const HandleForgetPassword = (e) => {
    setForgetPassword({ ...ForgetPassword, [e.target.name]: e.target.value });
  };

  const HandleChangePassword = () => {
    if (ForgetPassword.type === "" || ForgetPassword.email === "") {
      return notify("Please Fill all Details");
    }
    setforgetLoading(true);
    dispatch(forgetPassword(ForgetPassword)).then((res) => {
      if (res?.message === "User not found") {
        setforgetLoading(false);
        return notify("User Not Found");
      }
      setForgetPassword({
        type: "",
        email: "",
      });
      onClose();
      setforgetLoading(false);
      return notify("Account Details Send");
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="mainLoginPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Login</h1>

          <div>
            <Radio.Group
              value={placement}
              onChange={placementChange}
              className={"radiogroup"}
            >
              <Radio.Button value="Nurse" className={"radiobutton"}>
                Nurse
              </Radio.Button>
              <Radio.Button value="Doctor" className={"radiobutton"}>
                Doctor
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div>

          <div>
            <form onSubmit={HandleSubmit}>
              <h3>{placement} ID</h3>
              <input
                type="number"
                name="ID"
                value={formvalue.ID}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formvalue.password}
                onChange={Handlechange}
                required
              />
              <button type="submit">
                {Loading ? "Loading..." : "Submit"}
              </button>

              <p style={{ marginTop: "10px" }}>
                Forget Password?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={showDrawer}
                >
                  Get it on Email !
                </span>
              </p>

              {/* ********************************************************* */}
              <Drawer
                title="Forget Password"
                placement="left"
                onClose={onClose}
                open={open}
              >
                <div>
                  <label style={{ fontSize: "18px" }}>Choose Type</label>

                  <select
                    name="type"
                    value={ForgetPassword.type}
                    onChange={HandleForgetPassword}
                    required
                  >
                    <option value="">User Type</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "18px" }}>
                    Enter Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    value={ForgetPassword.email}
                    onChange={HandleForgetPassword}
                    required
                    style={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#bce0fb",
                      fontSize: "18px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  />
                </div>

                <button
                  style={{
                    width: "50%",
                    margin: " 20px auto",
                    display: "flex",
                    padding: "10px",
                    fontSize: "18px",
                    backgroundColor: "#ff9f9f",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                  onClick={HandleChangePassword}
                >
                  {forgetLoading ? "Loading..." : " Send Mail"}
                </button>
              </Drawer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
