import React from "react";

function Profile() {

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const role = localStorage.getItem("role");

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          User Profile
        </h2>

        <p>
          <strong>Name:</strong> {userName}
        </p>

        <p>
          <strong>Email:</strong> {userEmail}
        </p>

        <p>
          <strong>Role:</strong> {role}
        </p>

      </div>

    </div>

  );
}

export default Profile;