//http://localhost:8080/api/admin/list
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminList() {
  const navigate = useNavigate();
  const [myObjectList, updateMyObjectList] = useState([]);
  //const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [deleteSuccess, setDeleteSuccess] = useState(false); // New state variable

  useEffect(() => {
    console.log("Retrieve the object");
    setLoading(true);

    axios
      .get("http://localhost:8080/api/admin/list")
      //laps: http://localhost:8080/api/admin/list
      //LFtest: http://localhost:8080/api/employees

      .then((response) => {
        updateMyObjectList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /*
  const handleCreateObjectClick = () => {
    navigate("/create-object");
  };

  const handleCreateObjectClick = () => {
    const userTypes = ["EMPLOYEE", "MANAGER", "ADMIN"];
    const selectedUserType = window.prompt("Select user type:\n" + userTypes.join(", "));

    if (selectedUserType && userTypes.includes(selectedUserType.toUpperCase())) {
      navigate(`/api/admin/create/${selectedUserType.toUpperCase()}`);
    } else {
      alert("Invalid user type selected.");
    }
  };
  */

  const handleCreateObjectClick = () => {
    // Map numeric indices to user types
    const indexToUserType = {
      0: "EMPLOYEE",
      1: "MANAGER",
      2: "ADMIN"
    };
  
    const selectedUserTypeIndex = parseInt(window.prompt("Select user type:\n0 - EMPLOYEE, 1 - MANAGER, 2 - ADMIN"));
  
    // Check if the selected index is valid
    if (!isNaN(selectedUserTypeIndex) && indexToUserType.hasOwnProperty(selectedUserTypeIndex)) {
      // Use the numeric index in the URL
      navigate(`/api/admin/create/${selectedUserTypeIndex}`);
    } else {
      alert("Invalid user type selected.");
    }
  };

  const handleGetObjectClick = (object) => {
    navigate(`/api/admin/get/${object.user_id}`);
  };

  const handleEditObjectClick = (object) => {
    navigate(`/api/admin/update/${object.user_id}`);
  };

  const handleDeleteObjectClick = (object) => {
    navigate(`/api/admin/delete/${object.user_id}`);
  };

/*
  const handleDeleteObjectClick = (object) => {
    setSelectedObject(object);
  };

  const handleConfirmDeleteClick = async () => {
    try {
      setLoading(true);

      // Optimistic update: Remove the object from the list immediately
      const updatedObjectList = myObjectList.filter(
        (object) => object.id !== selectedObject.id
      );
      updateMyObjectList(updatedObjectList);

      // Send a DELETE request to delete the object
      await axios.get(`http://localhost:8080/api/employees/${selectedObject.id}`);
      //laps: http://localhost:8080/api/admin/delete/${selectedObject.id}
      //LFtest: http://localhost:8080/api/employees/${selectedObject.id}

      // Set delete success status
      setDeleteSuccess(true);

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting object:", error.message);

      // Rollback the UI changes if the server-side deletion fails
      // You may want to display an error message to the user
      updateMyObjectList((prevList) => [...prevList, selectedObject]);
    } finally {
      setLoading(false);
      setSelectedObject(null);
    }
  };

  const handleCancelDeleteClick = () => {
    setSelectedObject(null);
  };

  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_id}>
        <td>{object.user_id}</td>
        <td>{object.name}</td>
        <td>{object.password}</td>
        <td>{object.userType}</td>
        <td>
          <button onClick={() => handleGetObjectClick(object)}>Detail</button>
          <button onClick={() => handleEditObjectClick(object)}>Edit</button>
          <button onClick={() => handleDeleteObjectClick(object)}>Delete</button>
        </td>
      </tr>
    ));
  }
*/

function renderObjectRows() {
  //<tbody className="text-center">
  return myObjectList.map((object,index) => (
    
    <tr key={object.user_id}>
      <th className = "text-center" scope="row" key={index}>
        {index+1}
      </th>
      <td className = "text-center">{object.name}</td>
      <td className = "text-center">{object.password}</td>
      <td className = "text-center">{object.userType}</td>
      <td className = "text-center">
        <button className="btn btn-info mx-2" onClick={() => handleGetObjectClick(object)}>Detail</button>
        <button className="btn btn-warning mx-2" onClick={() => handleEditObjectClick(object)}>Edit</button>
        <button className="btn btn-danger mx-2" onClick={() => handleDeleteObjectClick(object)}>Delete</button>
      </td>
    </tr>
  ));
}



  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Object List</h2>
      <button className="btn btn-success mx-2" onClick={handleCreateObjectClick}>Create Object</button>
      {/*{deleteSuccess && <p>Delete successful!</p>}  Show success message */}
      <table className="table table-boardered table-hover">
        <thead>
          <tr className = "text-center">
            <th>User Id</th>
            <th>Name</th>
            <th>Password</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
      </table>
    </div>
  );
}

/*
      {selectedObject && (
        <div>
          <p>
            Are you sure you want to delete the following object?
            <br />
            User Id: {selectedObject.user_id}
            <br />
            Name: {selectedObject.name}
            <br />
            Password: {selectedObject.password}
            <br />
            User Type: {selectedObject.userType}
          </p>
          <button onClick={handleConfirmDeleteClick}>Confirm Delete</button>
          <button onClick={handleCancelDeleteClick}>Cancel</button>
        </div>
      )}*/