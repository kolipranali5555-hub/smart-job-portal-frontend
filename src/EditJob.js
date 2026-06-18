import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    useEffect(() => {

        axios.get("http://localhost:8083/jobs")
            .then((response) => {

                const selectedJob = response.data.find(
                    (j) => j.id === parseInt(id)
                );

                if (selectedJob) {
                    setJob(selectedJob);
                }

            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const updateJob = () => {

        axios.put(`http://localhost:8083/jobs/${id}`, job)
            .then(() => {

                alert("✅ Job Updated Successfully");

                navigate("/");

            })
            .catch((error) => {

                console.log(error);

                alert("❌ Update Failed");

            });

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-warning mb-4">
                Edit Job
            </h2>

            <input
                type="text"
                name="title"
                className="form-control mb-3"
                value={job.title}
                onChange={handleChange}
            />

            <input
                type="text"
                name="company"
                className="form-control mb-3"
                value={job.company}
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                className="form-control mb-3"
                value={job.location}
                onChange={handleChange}
            />

            <input
                type="text"
                name="salary"
                className="form-control mb-3"
                value={job.salary}
                onChange={handleChange}
            />

            <textarea
                name="description"
                className="form-control mb-3"
                rows="4"
                value={job.description}
                onChange={handleChange}
            />

            <button
                className="btn btn-warning w-100"
                onClick={updateJob}
            >
                Update Job
            </button>

        </div>
    );
}

export default EditJob;