import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const EmployeeGetSuperior = () => {
  const { user_id } = useParams();
  const [superior, setSuperior] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch superior information
        const response = await axios.get(`http://localhost:8080/api/employee/get-superior/${user_id}`);
        setSuperior(response.data);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8080/api/employee/get/${user_id}`);
        setEmployeeInfo(employeeResponse.data);
      } catch (error) {
        setErrorMessage("Boss doesn't have a superior");
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <br />
      {superior && employeeInfo ? (
        <div>
          <h2>Superior Information of: {employeeInfo.name}</h2>
          <div>            
            <h4>User ID: {employeeInfo.user_id}</h4>
            <form>
            <br />
            <strong>Superior Details:</strong>
              <br />
              <br />
              <label htmlFor="superior.user_id">User ID: </label>
              <br />
              <input
                type="text"
                id="superior.user_id"
                value={superior.user_id}
              />
              <br />
              <br />
              <label htmlFor="superior.name">Name</label>
              <br />
              <input
                type="text"
                id="superior.name"
                value={superior.name}
              />
              <br />
              <br />
              <label htmlFor="superior.userType">User Type</label>
              <br />
              <input
                type="text"
                id="superior.userType"
                value={superior.userType}
              />
              <br />
              <br />
              <label htmlFor="superior.employeeType">Employee Type</label>
              <br />
              <input
                type="text"
                id="superior.employeeType"
                value={superior.employeeType}
              />
              <br />
              <br />
              <label htmlFor="superior.belongToDepartment.name">Department Name</label>
              <br />
              <input
                type="text"
                id="superior.belongToDepartment.name"
                value={superior.belongToDepartment.name}
              />
              <br />
              <br />
              <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};


export default EmployeeGetSuperior;
