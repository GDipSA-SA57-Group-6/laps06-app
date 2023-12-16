import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListEmployee() {
  const navigate = useNavigate();
  const [myEmployeeList, updateMyEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    console.log("Retrieve the employee");
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => {
        updateMyEmployeeList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleCreateEmployeeClick = () => {
    // Redirect to "/create-employee" upon clicking the "Create Employee" button
    navigate("/create-employee");
  };

  
  const handleEditEmployeeClick = (employee) => {
    // Redirect to the edit page with the employee's ID
    navigate(`/edit-employee/${employee.id}`);
  };
  

  const handleDeleteEmployeeClick = (employee) => {
    // Set the selected employee for confirmation
    setSelectedEmployee(employee);
  };

  const handleConfirmDeleteClick = async () => {
    try {
      // Send a DELETE request to delete the employee
      await axios.delete(`http://localhost:8080/api/employees/${selectedEmployee.id}`);
      // Update the employee list after deletion
      const updatedEmployeeList = myEmployeeList.filter(
        (employee) => employee.id !== selectedEmployee.id
      );
      updateMyEmployeeList(updatedEmployeeList);
      // Reset the selected employee after deletion
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDeleteClick = () => {
    // Reset the selected employee if canceling the deletion
    setSelectedEmployee(null);
  };

  function renderEmployeeRows() {
    return myEmployeeList.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.employeeId}</td>
        <td>{employee.name}</td>
        <td>{employee.managerId}</td>
        <td>
          {/* Edit button for each employee */}
          <button onClick={() => handleEditEmployeeClick(employee)}>
            Edit
          </button>
          {/* Delete button for each employee */}
          <button onClick={() => handleDeleteEmployeeClick(employee)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleCreateEmployeeClick}>Create Employee</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Manager ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderEmployeeRows()}</tbody>
      </table>

      {/* Confirmation modal for delete */}
      {selectedEmployee && (
        <div>
          <p>
            Are you sure you want to delete the following employee?
            <br />
            ID: {selectedEmployee.id}
            <br />
            Employee ID: {selectedEmployee.employeeId}
            <br />
            Name: {selectedEmployee.name}
            <br />
            Manager ID: {selectedEmployee.managerId}
          </p>
          <button onClick={handleConfirmDeleteClick}>Confirm Delete</button>
          <button onClick={handleCancelDeleteClick}>Cancel</button>
        </div>
      )}
    </div>
  );
}