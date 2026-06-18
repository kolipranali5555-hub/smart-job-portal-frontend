import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    const user = {
      email,
      password
      
    };

    axios
      .post(
        "http://localhost:8083/users/login",
        user
      )
      .then((response) => {

        if (response.data) {

          localStorage.setItem(
            "isLoggedIn",
            "true"
          );

          localStorage.setItem(
            "token",
            response.data.token
          );

          localStorage.setItem(
            "userName",
            response.data.userName
          );

          localStorage.setItem(
            "role",
            response.data.role
          );

          localStorage.setItem(
            "userEmail",
            email
          );

          toast.success("Login Successful");
          setLoading(false);

          window.location.href = "/";

        } else {

          toast.error("Invalid Email or Password");

        }

      })
      .catch((error) => {
        setLoading(false);

        console.log(error);

       toast.error("Login Failed");

      });

  };

  const handleRegister = () => {

    const user = {
      fullName,
      email,
      password
    };

    axios
      .post(
        "http://localhost:8083/users/register",
        user
      )
      .then(() => {

        toast.success("Registration Successful");

        setIsLogin(true);

        setFullName("");
        setEmail("");
        setPassword("");

      })
      .catch((error) => {

        console.log(error);

       toast.error("Registration Failed");
      });

  };

  return (

    <div className="auth-page">

  <div className="auth-card">

    <h2 className="auth-title">
      Smart Job Portal
    </h2>

    <p className="auth-subtitle">
      {isLogin
        ? "Welcome Back 👋"
        : "Create Your Account"}
    </p>

    {!isLogin && (

      <div className="input-group mb-3">

  <span className="input-group-text">
    <i className="bi bi-person-fill"></i>
  </span>

  <input
    type="text"
    className="form-control"
    placeholder="Enter Full Name"
    value={fullName}
    onChange={(e) =>
      setFullName(e.target.value)
    }
  />

</div>

    )}

    <div className="input-group mb-3">

  <span className="input-group-text">
    <i className="bi bi-envelope-fill"></i>
  </span>

  <input
    type="email"
    className="form-control"
    placeholder="Enter Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

</div>

    <div className="input-group mb-3">

  <span className="input-group-text">
    <i className="bi bi-lock-fill"></i>
  </span>

  <input
    type={showPassword ? "text" : "password"}
    className="form-control"
    placeholder="Enter Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <button
    type="button"
    className="btn btn-outline-secondary"
    onClick={() =>
      setShowPassword(!showPassword)
    }
  >

    <i
      className={
        showPassword
          ? "bi bi-eye-slash-fill"
          : "bi bi-eye-fill"
      }
    ></i>

  </button>

</div>

    <button
  className="btn btn-primary w-100 auth-btn"
  onClick={isLogin ? handleLogin : handleRegister}
  disabled={loading}
>
  {loading ? (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
      ></span>

      Logging in...
    </>
  ) : (
    isLogin ? "Login" : "Register"
  )}
</button>

    {isLogin && (

      <div className="text-center mt-3">

        <a
          href="/forgot-password"
          className="auth-link"
        >
          Forgot Password?
        </a>

      </div>

    )}

    <div className="auth-footer">

      <span
        className="auth-link"
        onClick={() =>
          setIsLogin(!isLogin)
        }
      >
        {isLogin
          ? "Create New Account"
          : "Already Have Account? Login"}
      </span>

    </div>

  </div>

</div>

  );
}

export default Login;