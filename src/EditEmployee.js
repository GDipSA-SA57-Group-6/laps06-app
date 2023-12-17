import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminGet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [object, setObject] = useState({
    idElement: id,
    employeeIdElement:'',
    nameElement: '',
    managerIdElement: ''
  });
  useEffect(() => {
    console.log("Retrieve the object");
    // Fetch the details of the selected object using the received ID
    axios
      .get(`http://localhost:8080/api/get/${id}`)
      .then((response) => {
        setObject(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleEditClick = () => {
    navigate(`/edit-object/${id}`);
  };

  const handleDeleteClick = async () => {
    try {
      // Send a DELETE request to delete the object
      await axios.delete(`http://localhost:8080/api/admin/delete/${id}`);
      navigate("/list-object");
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };

  const handleCancelClick = () => {
    navigate("/list-object");
  };

  return (
    <div>
      <h2>Object Detail</h2>
      <form>
        <label htmlFor="id">Id</label>
        <br />
        <input type="text" name="id" value={object.id || ""} readOnly />
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" value={object.name || ""} readOnly />
        <br />
        <button type="button" onClick={handleEditClick}>
          Edit
        </button>
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
        <button type="button" onClick={handleCancelClick}>
          Return
        </button>
      </form>
    </div>
  );
}