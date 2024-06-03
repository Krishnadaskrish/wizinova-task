import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Axios } from "../App";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [reset, setReset] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await Axios.post("/api/sendOtp", { email: email });
      if (response.status === 201) {
        setOtp(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const response = await Axios.post("/api/submitOtp", {
        otp: otpValue,
        email: email,
        newPassword: reset,
      });
      if (response.status === 201) {
        toast.error(response.data.message);
      }
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setReset(e.target.value);
  };

  return (
    <>
      <img
        className="float-left mt-16 ml-14 animate-up"
        style={{ width: "650px", height: "650px" }}
        src="welcome.png"
        alt="logimg"
      />
      <div className="float-left w-1/2 h-screen ">
        <div className="ml-48 pt-44">
          <h1 className="text-3xl font-medium mt-14">Welcome.</h1>
          {!otp ? (
            <>
              <form onSubmit={handleSubmit} key="emailForm">
                <div className="w-80 mt-9">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      key="email"
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Email
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className=" w-80 mt-7 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Submit
                </button>

                <br></br>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmitOtp} key="otpForm">
                <div className="w-80 mt-9">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      key="otp"
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      onChange={handleOtpChange}
                      required
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Otp
                    </label>
                  </div>
                  <br></br>
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      key="email"
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      value={reset}
                      onChange={handlePasswordChange}
                      required
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Password
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className=" w-80 mt-7 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Submit Otp
                </button>

                <br></br>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
