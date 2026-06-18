import React, { useEffect, useState } from "react";
import axios from "axios";

function AppliedJobs() {

  const [applications, setApplications] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {

    axios.get("http://localhost:8083/applications")
      .then((response) => {

        setApplications(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const getStatusBadge = (status) => {

    if (status === "PENDING") {
      return <span className="badge bg-warning text-dark">PENDING</span>;
    }

    if (status === "INTERVIEW") {
      return <span className="badge bg-info">INTERVIEW</span>;
    }

    if (status === "SELECTED") {
      return <span className="badge bg-success">SELECTED</span>;
    }

    if (status === "REJECTED") {
      return <span className="badge bg-danger">REJECTED</span>;
    }

    return <span className="badge bg-secondary">N/A</span>;
  };

  const filteredApplications = applications.filter(
    (app) => app.applicantEmail === userEmail
  );

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        My Applied Jobs
      </h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Applicant Email</th>
            <th>Job Title</th>
            <th>Resume</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {filteredApplications.map((app) => (

            <tr key={app.id}>

              <td>{app.id}</td>
              <td>{app.applicantName}</td>
              <td>{app.applicantEmail}</td>
              <td>{app.jobTitle}</td>

              <td>

                {app.resumeFileName ? (

                  <a
                    href={`http://localhost:8083/uploads/${app.resumeFileName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Download Resume
                  </a>

                ) : (

                  <span className="text-danger">
                    No Resume
                  </span>

                )}

              </td>

              <td>{getStatusBadge(app.status)}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default AppliedJobs;