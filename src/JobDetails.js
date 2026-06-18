import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState({});
  const [resume, setResume] = useState(null);

  useEffect(() => {

    axios.get("http://localhost:8083/jobs")
      .then((response) => {

        const selectedJob = response.data.find(
          (j) => j.id === Number(id)
        );

        setJob(selectedJob);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  const applyJob = async () => {

    try {

      let uploadedFileName = "";

      if (resume) {

        const formData = new FormData();

        formData.append("file", resume);

        const uploadResponse = await axios.post(
          "http://localhost:8083/applications/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        uploadedFileName = uploadResponse.data;
      }

      const application = {
        applicantName: localStorage.getItem("userName"),
        applicantEmail: localStorage.getItem("userEmail"),
        jobTitle: job.title,
        resumeFileName: uploadedFileName
      };

      await axios.post(
        "http://localhost:8083/applications",
        application
      );

      alert("Application Submitted Successfully");

    } catch (error) {

      console.log(error);
      alert("Application Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-primary mb-4">
          {job.title}
        </h2>

        <p>
          <strong>Company:</strong> {job.company}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Salary:</strong> ₹{job.salary}
        </p>

        <p>
          <strong>Description:</strong> {job.description}
        </p>

        <div className="mt-4">

          <label className="form-label fw-bold">
            Upload Resume (PDF)
          </label>

          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />

        </div>

        <button
          className="btn btn-success mt-4"
          onClick={applyJob}
        >
          Apply Now
        </button>

      </div>

    </div>

  );
}

export default JobDetails;