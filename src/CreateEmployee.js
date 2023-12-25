//OLD VERSION CreateEmployee.js

import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const employeeIdElement = useRef(null);
  const nameElement = useRef(null);
  const managerIdElement = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleCreateClick(e) {
    e.preventDefault();
    console.log("Submit data to server to create a new employee.");
    console.log(employeeIdElement.current.value);
    console.log(nameElement.current.value);
    console.log(managerIdElement.current.value);
    apiCreateEmployee();
  }

  function apiCreateEmployee() {
    const data = {
      employeeId: employeeIdElement.current.value,
      name: nameElement.current.value,
      managerId: managerIdElement.current.value,
    };
    axios
      .post("http://localhost:8480/api/employees", data)
      .then((response) => {
        console.log("Success!");
        console.log(response.data);
        setSuccessMessage("Employee created successfully! Redirect to Employee List page...");
        setShowConfirmation(true);

        // Automatically hide the success message after 3 seconds
        setTimeout(() => {
          setShowConfirmation(false);
          navigate("/list-employee");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setSuccessMessage("Error creating employee. Please try again.");
        setShowConfirmation(true);
      });
  }

  const handleListEmployeeClick = () => {
    navigate("/list-employee");
  };

  function handleConfirmClick() {
    // You can redirect to another page or perform additional actions here
    // For now, let's reset the form and hide the confirmation message
    setSuccessMessage("");
    setShowConfirmation(false);
  }

  return (
    <div>
      {!showConfirmation ? (
        <div>
          <h2>Create a New Employee</h2>
          <p></p>
          <form>
            <label htmlFor="employeeId">Employee Id</label>
            <br />
            <input type="text" name="employeeId" ref={employeeIdElement} />
            <br />
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" name="name" ref={nameElement} />
            <br />
            <label htmlFor="managerId">Manager Id</label>
            <br />
            <input type="text" name="managerId" ref={managerIdElement} />
            <br />

            <button onClick={handleCreateClick}>Create</button>
            <button onClick={handleListEmployeeClick}>Return to Employee List</button>
          </form>
        </div>
      ) : (
        <div>
          <p style={{ color: "green" }}>{successMessage}</p>
          <button onClick={handleConfirmClick}>OK. Return to Employee List.</button>
        </div>
      )}
    </div>
  );
}