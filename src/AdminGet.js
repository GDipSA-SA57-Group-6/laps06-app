//http://localhost:8080/api/admin/get/${user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminGet() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [object, setObject] = useState({
    user_idElement: "",
    nameElement: "",
    passwordElement: "",
    userTypeElement: ""
  });

  useEffect(() => {
    console.log("Fetching data...");
    axios
      .get(`http://localhost:8080/api/admin/get/${user_id}`)
      //laps: http://localhost:8080/api/admin/get/${user_id}
      .then((response) => {
        console.log("Response data:", response.data);
        setObject({
          user_idElement: response.data.user_id,
          nameElement: response.data.name,
          passwordElement: response.data.password,
          userTypeElement: response.data.userType
        });
      })
      .catch((error) => {
        console.error("Error fetching object details:", error);
      });
  }, [user_id]);

  const handleReturnClick = () => {
    navigate("/api/admin/list");
  };

  const handleEditClick = () => {
    // Navigate to the edit route based on the object's ID
    navigate(`/api/admin/update/${object.user_idElement}`);
  };  
  
  const handleDeleteClick = () => {
    // Navigate to the delete route based on the object's ID
    navigate(`/api/admin/delete/${object.user_idElement}`);
  };

  const handleCancelClick = () => {
    navigate("/api/admin/list"); 
  };


  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>Return</button>
      <h2 className="mt-5">User Detail</h2>
      <form>
        <label htmlFor="user_id">User Id</label>
        <br />
        <input type="text" name="user_id" value={object.user_idElement}  disabled/>
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" value={object.nameElement} disabled />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="text" name="password" value={object.passwordElement} disabled />
        <br />
        <label htmlFor="userType">User Type</label>
        <br />
        <input type="text" name="userType" value={object.userTypeElement} disabled />
        <br></br>
        <br />
        <button className="mx-2 btn btn-warning" type="button" onClick={handleEditClick}>
        Modify Role
        </button>
        <button className="mx-2 btn btn-danger" type="button" onClick={handleDeleteClick}>
          Delete
        </button>
        <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
}