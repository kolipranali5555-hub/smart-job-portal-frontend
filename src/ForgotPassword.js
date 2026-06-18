import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = () => {

    if (!email) {
  toast.warning("Please Enter Email");
  return;
}

    axios.post(
      `http://localhost:8083/users/send-otp?email=${email}`
    )
    .then((response) => {

      toast.success(response.data);

      setOtpSent(true);

    })
    .catch((error) => {

      console.log(error);

      toast.error("Failed To Send OTP");

    });

  };

  const verifyOtp = () => {

    if (!otp) {
      if (!otp) {
  toast.warning("Please Enter OTP");
  return;
}
      return;
    }

    axios.post(
      `http://localhost:8083/users/verify-otp?email=${email}&otp=${otp}`
    )
    .then((response) => {

      toast.success(response.data);

      setOtpVerified(true);

    })
    .catch((error) => {

      console.log(error);

      toast.error("Invalid Or Expired OTP");

    });

  };

  const resetPassword = () => {

    if (newPassword !== confirmPassword) {

      toast.warning("Passwords Do Not Match");

      return;
    }

    axios.post(
      `http://localhost:8083/users/reset-password?email=${email}&password=${newPassword}`
    )
    .then((response) => {

      toast.success(response.data);

setTimeout(() => {
  navigate("/login");
}, 1500);

    })
    .catch((error) => {

      console.log(error);

      toast.error("Failed To Update Password");

    });

  };

  return (

    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >

        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <div className="mb-3">

          <label>Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Registered Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {!otpSent && (

          <button
            className="btn btn-primary w-100"
            onClick={sendOtp}
          >
            Send OTP
          </button>

        )}

        {otpSent && !otpVerified && (

          <>

            <div className="mt-4">

              <label>OTP</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

          </>

        )}

        {otpVerified && (

          <>

            <div className="alert alert-success mt-3">

              OTP Verified Successfully

            </div>

            <div className="mb-3">

              <label>New Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />

            </div>

            <div className="mb-3">

              <label>Confirm Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>

            <button
              className="btn btn-danger w-100"
              onClick={resetPassword}
            >
              Update Password
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default ForgotPassword;