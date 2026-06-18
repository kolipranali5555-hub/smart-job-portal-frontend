import React, { useEffect, useState } from "react";
import axios from "axios";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function AdminDashboard() {

const [data, setData] = useState({
totalJobs: 0,
totalUsers: 0,
totalApplications: 0
});

const [applications, setApplications] = useState([]);

useEffect(() => {

loadDashboard();
loadApplications();

}, []);

const loadDashboard = () => {

axios.get("http://localhost:8083/dashboard")
  .then((response) => {

    setData(response.data);

  })
  .catch((error) => {

    console.log(error);

  });

};

const loadApplications = () => {

axios.get("http://localhost:8083/applications")
  .then((response) => {

    setApplications(response.data);

  })
  .catch((error) => {

    console.log(error);

  });

};

const updateStatus = (id, status) => {

axios.put(
  `http://localhost:8083/applications/${id}/status?status=${status}`
)
  .then(() => {

    alert("Status Updated Successfully");

    loadApplications();

  })
  .catch((error) => {

    console.log(error);

  });

};

const chartData = {
labels: [
"PENDING",
"INTERVIEW",
"SELECTED",
"REJECTED"
],
datasets: [
{
data: [
applications.filter(app => app.status === "PENDING").length,
applications.filter(app => app.status === "INTERVIEW").length,
applications.filter(app => app.status === "SELECTED").length,
applications.filter(app => app.status === "REJECTED").length
]
}
]
};

return (

<div className="container mt-5">

  <h2 className="text-center mb-5">
    Admin Dashboard
  </h2>

  <div className="row">

    <div className="col-md-4 mb-4">
      <div className="card shadow text-center">
        <div className="card-body">
          <h1>{data.totalJobs}</h1>
          <h5>Total Jobs</h5>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card shadow text-center">
        <div className="card-body">
          <h1>{data.totalUsers}</h1>
          <h5>Total Users</h5>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card shadow text-center">
        <div className="card-body">
          <h1>{data.totalApplications}</h1>
          <h5>Total Applications</h5>
        </div>
      </div>
    </div>

  </div>

  <div className="card shadow p-4 mb-5">

    <h4 className="text-center mb-4">
      Application Status Analytics
    </h4>

    <div
      style={{
        width: "400px",
        margin: "auto"
      }}
    >
      <Pie data={chartData} />
    </div>

  </div>

  <h3 className="mt-5 mb-3">
    Applications Management
  </h3>

  <table className="table table-bordered table-striped">

    <thead className="table-dark">

      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Job Title</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

    </thead>

    <tbody>

      {applications.map((app) => (

        <tr key={app.id}>

          <td>{app.id}</td>
          <td>{app.applicantName}</td>
          <td>{app.applicantEmail}</td>
          <td>{app.jobTitle}</td>

          <td>

            <select
              className="form-select"
              value={app.status}
              onChange={(e) => {

                const updatedApps = applications.map((a) =>
                  a.id === app.id
                    ? { ...a, status: e.target.value }
                    : a
                );

                setApplications(updatedApps);

              }}
            >

              <option value="PENDING">PENDING</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="SELECTED">SELECTED</option>
              <option value="REJECTED">REJECTED</option>

            </select>

          </td>

          <td>

            <button
              className="btn btn-success"
              onClick={() =>
                updateStatus(app.id, app.status)
              }
            >
              Update
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

);
}

export default AdminDashboard;