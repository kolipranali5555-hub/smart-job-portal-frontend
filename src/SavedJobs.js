import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedJobs() {

  const [savedJobs, setSavedJobs] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {

  axios.get(
    `http://localhost:8083/saved-jobs/${userEmail}`
  )
    .then((response) => {

      setSavedJobs(response.data);

    })
    .catch((error) => {

      console.log(error);

    });

}, [userEmail]);

  const loadSavedJobs = () => {

    axios.get(
      `http://localhost:8083/saved-jobs/${userEmail}`
    )
      .then((response) => {

        setSavedJobs(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const removeJob = (id) => {

    axios.delete(
      `http://localhost:8083/saved-jobs/${id}`
    )
      .then(() => {

        alert("Job Removed");

        loadSavedJobs();

      })
      .catch((error) => {

        console.log(error);

      });

  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        ❤️ Saved Jobs
      </h2>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {savedJobs.map((job) => (

            <tr key={job.id}>

              <td>{job.id}</td>
              <td>{job.jobTitle}</td>
              <td>{job.company}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => removeJob(job.id)}
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default SavedJobs;