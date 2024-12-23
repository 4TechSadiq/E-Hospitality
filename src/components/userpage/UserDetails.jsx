import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

export default function UserDetails({ userId }) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/${userId}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (userId) fetchUserData();
  }, [userId]);
  console.log("user id is", userId);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="col-12 p-5 shadow rounded d-flex">
      <div>
        <img
          className="user-avatar rounded-circle"
          style={{ width: "150px", height: "150px" }}
          src={data.profile || "https://via.placeholder.com/150"}
          alt="User Avatar"
        />
      </div>
      <div className="user-details">
        <Typography variant="h6">{data.first_name || "User Name"}</Typography>
        <Typography variant="h6">{data.last_name || "Last Name"}</Typography>
        <Typography variant="body2">{data.email || "user@example.com"}</Typography>
      </div>
    </div>
  );
}
