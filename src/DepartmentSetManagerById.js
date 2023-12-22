import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function DepartmentSetManagerById() {
    const navigate = useNavigate();
    const { department_id } = useParams();
    const [user_id, setUser_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    
    useEffect(() => {
        const fetchDepartment = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/department/get/${department_id}`);
            setSelectedDepartment(response.data);
          } catch (error) {
            console.error('Error fetching department:', error);
          }
        };
    
        fetchDepartment();
      }, [department_id]);
    

    const handleCancelClick = () => {
        navigate("/api/department/list");
      };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`http://localhost:8080/api/department/set-manager-by-id/${department_id}/${user_id}`);
        setSuccessMessage('Manager set successfully');
        setErrorMessage('');
        console.log(response.data); // Log the updated department data
        setTimeout(() => {
            navigate("/api/employee/list"); // Assuming this is the correct route
          }, 3000);
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error setting manager');
        console.error(error);
      }
    };
  
    return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <h2 className="mt-5">Set Manager for: {selectedDepartment?.name}</h2>
        {selectedDepartment && (
            <div>
            <h4>Department ID: {selectedDepartment.department_id}</h4>
            </div>
        )}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={handleFormSubmit}>
        <br />
          <label htmlFor="user_id">User ID: </label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />

          <br />
          <br />
          <button  className="btn btn-success mx-2" type="submit">Set Manager</button>
          <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
  };





/*
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function DepartmentSetManagerById() {
    const navigate = useNavigate();
    const { department_id } = useParams();
    const [user_id, setUser_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleCancelClick = () => {
        navigate("/api/department/list");
      };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`/set-manager-by-id/${department_id}/${user_id}`);
        setSuccessMessage('Manager set successfully');
        setErrorMessage('');
        console.log(response.data); // Log the updated department data
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error setting manager');
        console.error(error);
      }
    };
  
    return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <br />
        <br />
        <h2 lassName="mt-5">Set Manager for Department: ??</h2>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={handleFormSubmit}>
        <br />
          <label htmlFor="user_id">User ID: </label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
          <br />
          <br />
          <button  className="btn btn-success mx-2" type="submit">Set Manager</button>
          <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
  };

*/