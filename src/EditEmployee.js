//OLD VERSION EditEmployee.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    idElement: id,
    employeeIdElement:'',
    nameElement: '',
    managerIdElement: ''
  });


  useEffect(() => {
  // Fetch the details of the selected employee using the received ID
    axios
      .get(`http://localhost:8480/api/employees/${id}`)
      .then((response) => {
        setEmployee((employee) => ({
          ...employee,
          employeeIdElement: response.data.employeeId,
          nameElement: response.data.name,
          managerIdElement: response.data.managerId,
        }));
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
      });
  }, [id, setEmployee]); // Include setEmployee in the dependency array

  const handleEditClick = (e) => {
    e.preventDefault();

    const updatedData = {
      employeeId: employee.employeeIdElement,
      name: employee.nameElement,
      managerId: employee.managerIdElement
    };
    axios
      .put(`http://localhost:8480/api/employees/${id}`, updatedData)
      .then((response) => {
        console.log("Success!");
        console.log(response.updatedData);
        navigate("/list-employee");
      })
      .catch((error) => {
        console.error("Error updating employee details:", error);
      });
  };


  const handleCancelClick = () => {
    // Redirect to "/list-employee" upon cancel
    navigate("/list-employee");
  };

  return (
    <div>
      <h2>Edit Employee</h2>
        <form>
          <label htmlFor="employeeId">Employee ID</label>
          <br />
          <input type="text" name="employeeId" value={employee.employeeIdElement} disabled />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" value={employee.nameElement} 
                onChange={e => setEmployee({...employee, nameElement: e.target.value})}/>
          <br />
          <label htmlFor="managerId">Manager ID</label>
          <br />
          <input type="text" name="managerId" value={employee.managerIdElement} 
                  onChange={e => setEmployee({...employee, managerIdElement: e.target.value})}/>
          <br />
          <button onClick={handleEditClick}>Save Changes</button>
          <button onClick={handleCancelClick}>Cancel & Return to Employee List</button>
        </form>
    </div>
  )
}