//http://localhost:8480/api/department/get/${user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function DepartmentGet() {
    const { department_id } = useParams();
    const navigate = useNavigate();
  
    const [object, setObject] = useState({
      department_idElement: "",
      nameElement: "",
      includedByNameElement: "",
    });
  
    useEffect(() => {
      console.log("Fetching data...");
      axios
        .get(`http://localhost:8480/api/department/get/${department_id}`)
        .then((response) => {
          console.log("Response data:", response.data);
          setObject({
            department_idElement: response.data.department_id,
            nameElement: response.data.name,
            includedByNameElement: response.data.includedBy ? response.data.includedBy.name : 'N/A',
          });
        })
        .catch((error) => {
          console.error("Error fetching object details:", error);
        });
    }, [department_id]);
  
    const handleReturnClick = () => {
      navigate("/api/department/list");
    };
  
    const handleEditClick = () => {
      navigate(`/api/department/update/${object.department_idElement}`);
    };
  
    const handleDeleteClick = () => {
      navigate(`/api/department/delete/${object.department_idElement}`);
    };
  
    const handleCancelClick = () => {
      navigate("/api/department/list");
    };
  
    return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>Return</button>
        <h2 className="mt-5">Department Detail</h2>
        <form>
          <label htmlFor="department_id">Department Id</label>
          <br />
          <input type="text" name="department_id" value={object.department_idElement} disabled />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" value={object.nameElement} disabled/>
          <br />
          <label htmlFor="includedBy.name">Included By</label>
          <br />
          <input type="text" name="includedBy.name" value={object.includedByNameElement} disabled />
          <br />
          <br></br>
          <br />
          <button className="mx-2 btn btn-warning" type="button" onClick={handleEditClick}>
            Edit
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