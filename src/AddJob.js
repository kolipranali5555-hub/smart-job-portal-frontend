import React, { useState } from "react";
import axios from "axios";

function AddJob() {

    const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    category: ""
});

    const [logoFile, setLogoFile] = useState(null);
    //const [category, setCategory] = useState("");

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleLogoChange = (e) => {

        setLogoFile(e.target.files[0]);

    };

    const saveJob = async () => {

        try {

            let logoFileName = "";

            if (logoFile) {

                const formData = new FormData();

                formData.append("file", logoFile);

                const uploadResponse = await axios.post(
                    "http://localhost:8083/jobs/upload-logo",
                    formData
                );

                logoFileName = uploadResponse.data;
            }

            const jobData = {
                ...job,
                companyLogo: logoFileName
            };

            await axios.post(
                "http://localhost:8083/jobs",
                jobData
            );

            alert("✅ Job Added Successfully");

            window.location.reload();

        } catch (error) {

            console.log(error);

            alert("❌ Error Adding Job");

        }

    };

    return (

        <div>

            <h2 className="text-center text-primary mb-4">
                Add New Job
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Enter Title"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <input
                type="text"
                name="company"
                placeholder="Enter Company"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                placeholder="Enter Location"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <input
    type="text"
    name="salary"
    placeholder="Enter Salary"
    className="form-control mb-3"
    onChange={handleChange}
/>

<input
    type="text"
    name="category"
    className="form-control mb-3"
    placeholder="Enter Category"
    value={job.category}
    onChange={handleChange}
/>

<textarea
    name="description"
    placeholder="Enter Description"
    className="form-control mb-3"
    rows="4"
    onChange={handleChange}
/>

<label className="form-label">
    Company Logo
</label>

            <input
                type="file"
                className="form-control mb-3"
                onChange={handleLogoChange}
            />

            <button
                className="btn btn-primary w-100"
                onClick={saveJob}
            >
                Add Job
            </button>

        </div>
    );
}

export default AddJob;