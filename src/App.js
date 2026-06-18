import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";

import Home from "./Home";
import AddJob from "./AddJob";
import About from "./About";
import EditJob from "./EditJob";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import JobDetails from "./JobDetails";
import AppliedJobs from "./AppliedJobs";
import AdminDashboard from "./AdminDashboard";
import Profile from "./Profile";
import SavedJobs from "./SavedJobs";
import ForgotPassword from "./ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    pauseOnHover
    draggable
    theme="colored"
/>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/forgot-password";

  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.clear();

    alert("Logged Out Successfully");

    window.location.href = "/login";

  };

  return (
    <>

      {!hideNavbar && (

        <nav className="navbar navbar-expand-lg navbar-dark navbar-glass">
          <div className="container">

            <Link
              className="navbar-brand fw-bold"
              to="/"
            >
              Smart Job Portal
            </Link>

            <div className="d-flex align-items-center flex-wrap justify-content-end">

              <Link className="btn btn-outline-light me-2" to="/">
    <i className="bi bi-house-fill me-1"></i>
    Home
</Link>
              {role === "ADMIN" && (

                <Link className="btn btn-outline-light me-2" to="/add-job">
    <i className="bi bi-plus-circle-fill me-1"></i>
    Add Job
</Link>

              )}

              <Link className="btn btn-outline-light me-2" to="/applied-jobs">
    <i className="bi bi-briefcase-fill me-1"></i>
    Applied Jobs
</Link>

              <Link className="btn btn-outline-light me-2" to="/profile">
    <i className="bi bi-person-circle me-1"></i>
    Profile
</Link>

              {role !== "ADMIN" && (

                <Link className="btn btn-outline-light me-2" to="/saved-jobs">
    <i className="bi bi-bookmark-heart-fill me-1"></i>
    Saved Jobs
</Link>

              )}

              {role === "ADMIN" && (

               <Link className="btn btn-outline-light me-2" to="/dashboard">
    <i className="bi bi-speedometer2 me-1"></i>
    Dashboard
</Link>

              )}

              <Link className="btn btn-outline-light me-2" to="/about">
    <i className="bi bi-info-circle-fill me-1"></i>
    About
</Link>
              <span className="text-white fw-bold me-3">
                Welcome, {userName} 👋
              </span>

              <button className="btn btn-danger" onClick={logout}>
    <i className="bi bi-box-arrow-right me-1"></i>
    Logout
</button>

            </div>

          </div>

        </nav>

      )}
      

           <Routes>

        <Route
          path="/"
          element={
            token
              ? <Home />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/" />
              : <Login />
          }
        />

        <Route
          path="/forgot-password"
          element={
            token
              ? <Navigate to="/" />
              : <ForgotPassword />
          }
        />

        <Route
          path="/add-job"
          element={
            role === "ADMIN"
              ? <AddJob />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            role === "ADMIN"
              ? <EditJob />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applied-jobs"
          element={
            <ProtectedRoute>
              <AppliedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </>
  );
}

export default App;