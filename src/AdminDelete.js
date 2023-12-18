//http://localhost:8080/api/admin/get/${user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminDelete() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idElement: "",
    nameElement: "",
    passwordElement: "",
    userTypeElement: ""
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch the details of the selected user using the received user_id
    console.log("Fetching data...");
    axios
      .get(`http://localhost:8080/api/admin/get/${user_id}`)
      .then((response) => {
        setUser({
          user_idElement: response.data.user_id,
          nameElement: response.data.name,
          passwordElement: response.data.password,
          userTypeElement: response.data.userType
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [user_id]);

  const handleReturnClick = () => {
    navigate("/api/admin/list");
  };

  const handleConfirmDeleteClick = async () => {
    try {
      // Send a DELETE request to delete the user
      await axios.delete(`http://localhost:8080/api/admin/delete/${user_id}`);
      console.log("User deleted successfully!");

      // Show success message for 3 seconds
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        // Navigate to another page or perform other actions
        navigate("/api/admin/list");
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleCancelDeleteClick = () => {
    navigate("/api/admin/list");
  };

  return (
    <div>
      <button onClick={handleReturnClick}>Return</button>
      <h2>Delete User</h2>
      {showSuccessMessage && <p>User deleted successfully!</p>}
        <form>
          <label htmlFor="user_id">User Id</label>
          <br />
          <input type="text" name="user_id" value={user.user_idElement} readOnly />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" value={user.nameElement} readOnly />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="text" name="password" value={user.passwordElement} readOnly />
          <br />
          <label htmlFor="userType">User Type</label>
          <br />
          <input type="text" name="userType" value={user.userTypeElement} readOnly />

          <br />
          <button type="button" onClick={handleConfirmDeleteClick}>Confirm Delete</button>
          <button type="button" onClick={handleCancelDeleteClick}>Cancel & Return to User List</button>
        </form>
    </div>
  );
}