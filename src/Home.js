import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaFileAlt
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [jobs, setJobs] = useState([]);
  
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 6;
const [categoryFilter, setCategoryFilter] = useState("");
const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {

  const token =
    localStorage.getItem("token");

  axios.get(
    "http://localhost:8083/jobs",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )
 .then((response) => {

    console.log("Jobs =", response.data);

    setJobs(response.data);

})
  .catch((error) => {

    console.log(error);

  });

};

  const deleteJob = (id) => {

    if (window.confirm("Are you sure you want to delete this job?")) {

      axios.delete(`http://localhost:8083/jobs/${id}`)
        .then(() => {

          alert("Job Deleted Successfully");

          loadJobs();

        })
        .catch((error) => {

          console.log(error);

        });

    }

  };

  const applyJob = (job) => {

  const userEmail = localStorage.getItem("userEmail");

  axios
    .get(`http://localhost:8083/applications/user/${userEmail}`)
    .then((response) => {

      const alreadyApplied = response.data.some(
        (app) => app.jobTitle === job.title
      );

      if (alreadyApplied) {

        alert("⚠️ You already applied for this job");

        return;
      }

      const application = {

        applicantName:
          localStorage.getItem("userName") || "User",

        applicantEmail: userEmail,

        jobTitle: job.title

      };

      axios
        .post(
          "http://localhost:8083/applications",
          application
        )
        .then(() => {

          alert(
            "✅ Application Submitted Successfully"
          );

        })
        .catch((error) => {

          console.log(error);

          alert("❌ Failed To Apply");

        });

    })
    .catch((error) => {

      console.log(error);

      alert("❌ Error Checking Applications");

    });

};

  const saveJob = (job) => {

  const savedJob = {

    userEmail: localStorage.getItem("userEmail"),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company

  };

  axios.post(
    "http://localhost:8083/saved-jobs",
    savedJob
  )
    .then(() => {

      alert("❤️ Job Saved Successfully");

    })
    .catch((error) => {

      console.log(error);

      alert("❌ Failed To Save Job");

    });

};
 const filteredJobs = jobs.filter((job) => {

  console.log(job);

  return true;

});

 const sortedJobs = [...filteredJobs];

if (sortOrder === "high") {

  sortedJobs.sort((a, b) => b.salary - a.salary);

}

if (sortOrder === "low") {

  sortedJobs.sort((a, b) => a.salary - b.salary);

}

const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const currentJobs = sortedJobs.slice(
  indexOfFirstJob,
  indexOfLastJob
);

console.log("Jobs =", jobs);
console.log("Filtered Jobs =", filteredJobs);
console.log("Sorted Jobs =", sortedJobs);
console.log("Current Jobs =", currentJobs);
const totalPages = Math.ceil(
  sortedJobs.length / jobsPerPage
);
  return (

    <div
  className={`container mt-4 ${
    darkMode ? "bg-dark text-white p-4 rounded" : ""
  }`}
>

      <div className="hero-section">

    <h1 className="hero-title">
        Find Your Dream Job 🚀
    </h1>

    <p className="hero-subtitle">
        Search thousands of jobs from top companies across India.
    </p>

</div>
<div className="container mt-5">

    <div className="row g-4">

        <div className="col-md-3">

            <div className="stats-card">

                <h2>5000+</h2>

                <p>Jobs Available</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="stats-card">

                <h2>1200+</h2>

                <p>Companies</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="stats-card">

                <h2>15000+</h2>

                <p>Candidates</p>

            </div>

        </div>

        <div className="col-md-3">

            <div className="stats-card">

                <h2>300+</h2>

                <p>Recruiters</p>

            </div>

        </div>

    </div>

</div>
      <div className="text-end mb-3">
    <button
      className="btn btn-dark"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  </div>

      <div className="mb-3">

       <div className="search-box">

    <i className="bi bi-search search-icon"></i>

    <div className="search-box">

   

    <input
        type="text"
        className="form-control search-input"
        placeholder="Search Jobs, Companies or Locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>

</div>

      </div>

      <div className="mb-3">

        <select
          className="form-select"
          value={locationFilter}
          onChange={(e) => {
  setLocationFilter(e.target.value);
  setCurrentPage(1);
}}
        >

          <option value="All">All Locations</option>

          {[...new Set(jobs.map(job => job.location))].map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}

        </select>

      </div>
      <div className="mb-3">

  <select
    className="form-select"
    value={categoryFilter}
    onChange={(e) => {
      setCategoryFilter(e.target.value);
      setCurrentPage(1);
    }}
  >

    <option value="All">All Categories</option>
    {[...new Set(jobs.map(job => job.category))]
  .filter(Boolean)
  .sort()
  .map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
    ))}

  </select>

</div>

      <div className="mb-4">

        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => {
  setSortOrder(e.target.value);
  setCurrentPage(1);
}}
        >

          <option value="">Sort By Salary</option>
          <option value="high">Highest Salary First</option>
          <option value="low">Lowest Salary First</option>

        </select>

      </div>

      <div className="row mb-4">

        <div className="col-md-6">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{jobs.length}</h3>
              <p>Total Jobs</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{new Set(jobs.map(job => job.company)).size}</h3>
              <p>Total Companies</p>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        {sortedJobs.length === 0 && (

          <h4 className="text-center text-danger">
            No Jobs Found
          </h4>

        )}

       {currentJobs.map((job) => (

          <div className="col-md-4 mb-4" key={job.id}>

           <div
  className={`card job-card h-100 ${
    darkMode ? "bg-dark text-white" : ""
  }`}
>

              <div className="card-body">
                 {job.companyLogo && (

<div className="text-center mb-3">

<img
src={`http://localhost:8083/uploads/${job.companyLogo}`}
alt="Company Logo"
className="company-logo"
/>

</div>

)}


                <h4>{job.title}</h4>

                <p className="job-info">
  <FaBuilding className="me-2 text-primary" />
  <strong>Company:</strong> {job.company}
</p>

<p className="job-info">
  <FaBriefcase className="me-2 text-success" />
  <strong>Category:</strong> {job.category}
</p>

<p className="job-info">
  <FaMapMarkerAlt className="me-2 text-danger" />
  <strong>Location:</strong> {job.location}
</p>

<p className="job-info">
  <FaMoneyBillWave className="me-2 text-warning" />
  <strong>Salary:</strong> ₹{job.salary}
</p>

<p className="job-info">
    <FaFileAlt className="me-2 text-info" />
    <strong>Description:</strong> {job.description}
</p>

                <div className="d-flex flex-wrap gap-2 mt-3">

  {role === "ADMIN" && (
    <button
      className="btn btn-danger"
      onClick={() => deleteJob(job.id)}
    >
      Delete
    </button>
  )}

  <button
    className="btn btn-success"
    onClick={() => applyJob(job)}
  >
    Apply Now
  </button>

  <button
    className="btn btn-secondary"
    onClick={() => saveJob(job)}
  >
    ❤️ Save Job
  </button>

  <button
    className="btn btn-info"
    onClick={() => navigate(`/job/${job.id}`)}
  >
    View Details
  </button>

  {role === "ADMIN" && (
    <button
      className="btn btn-warning"
      onClick={() => navigate(`/edit-job/${job.id}`)}
    >
      Edit
    </button>
  )}

</div>

              </div>

            </div>

          </div>

        ))}

      </div>
      <div className="text-center mt-4">

  <button
    className="btn btn-primary me-2"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span className="fw-bold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-primary ms-2"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>

    </div>

  );
}

export default Home;