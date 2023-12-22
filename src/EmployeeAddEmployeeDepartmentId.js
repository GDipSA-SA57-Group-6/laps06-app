//http://localhost:8080/api/employee/add-employee/${department_id}/${user_id}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EmployeeAddEmployeeDepartmentId() {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [department_id, setDepartmentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employee/get/${user_id}`);
        setSelectedEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/department/list');
        setDepartmentList(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchEmployee();
    fetchDepartments();
  }, [user_id]);

  const handleCancelClick = () => {
    navigate('/api/employee/list');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        user_id: selectedEmployee.user_id,
        belongToDepartment: {
          name: departmentList.find((dep) => dep.department_id === parseInt(department_id, 10)).name,
        },
      };

      const response = await axios.get(`http://localhost:8080/api/employee/add-employee/${department_id}/${user_id}`, updatedData);
      setSuccessMessage('Department set successfully');
      setErrorMessage('');
      console.log(response.data); // Log the updated employee data
      setTimeout(() => {
        navigate('/api/employee/list');
      }, 3000);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error setting department');
      console.error(error);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Set Department for: {selectedEmployee?.name}</h2>
      {selectedEmployee && (
        <div>
          <h4>Employee ID: {selectedEmployee.user_id}</h4>
          <p>Current Department: {selectedEmployee.belongToDepartment.name}</p>
        </div>
      )}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleFormSubmit}>
        <br />
        <label htmlFor="department_id">Select Department: </label>
        <select
          id="department_id"
          value={department_id}
          onChange={(e) => setDepartmentId(e.target.value)}
        >
          <option value="">Select Department</option>
          {departmentList.map((department) => (
            <option key={department.department_id} value={department.department_id}>
              {department.name}
            </option>
          ))}
        </select>

        <br />
        <br />
        <button className="btn btn-success mx-2" type="submit">
          Set Department
        </button>
        <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
}


  /*
  import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function EmployeeAddEmployeeDepartmentId() {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const [department_id, setDepartmentId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    
    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/employee/get/${user_id}`);
            setSelectedEmployee(response.data);
          } catch (error) {
            console.error('Error fetching employee:', error);
          }
        };
    
        fetchEmployee();
      }, [user_id]);
    

    const handleCancelClick = () => {
        navigate("/api/employee/list");
      };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`http://localhost:8080/api/employee/add-employee/${department_id}/${user_id}`);
        setSuccessMessage('Department set successfully');
        setErrorMessage('');
        console.log(response.data); // Log the updated employee data
        setTimeout(() => {
            navigate("/api/employee/list");
          }, 3000);
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error setting manager');
        console.error(error);
      }
    };
  
    return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <h2 className="mt-5">Set Department for: {selectedEmployee?.name}</h2>
        {selectedEmployee && (
            <div>
            <h4>Employee ID: {selectedEmployee.user_id}</h4>
            </div>
        )}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={handleFormSubmit}>
        <br />
          <label htmlFor="department_id">Department ID: </label>
          <input
            type="text"
            id="department_id"
            value={department_id}
            onChange={(e) => setDepartmentId(e.target.value)}
        />

          <br />
          <br />
          <button  className="btn btn-success mx-2" type="submit">Set Department</button>
          <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
  };
  */