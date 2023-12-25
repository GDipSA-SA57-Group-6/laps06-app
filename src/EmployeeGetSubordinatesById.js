//http://localhost:8480/api/employee/get-subordinates-by-id/${user_id}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeGetSubordinatesById = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Retrieve the object");
        setLoading(true);

        // Fetch subordinates data
        const response = await axios.get(`http://localhost:8480/api/employee/get-subordinates-by-id/${user_id}`);
        const subordinateList = response.data.map(subordinate => ({
          user_idElement: subordinate.user_id,
          nameElement: subordinate.name,
          passwordElement: subordinate.password,
          userTypeElement: subordinate.userType,
          entitlementToAnnualLeaveElement: subordinate.entitlementToAnnualLeave,
          employeeTypeElement: subordinate.employeeType,
          belongToDepartmentNameElement: subordinate.belongToDepartment.name,
          belongToDepartmentIncludedByElement: subordinate.belongToDepartment.includedBy,
          belongToDepartmentDepartmentIdElement: subordinate.belongToDepartment.department_id,
          medicalLeaveDayElement: subordinate.medical_leave_day,
          overWorkingHourElement: subordinate.over_working_hour,
        }));

        updateMyObjectList(subordinateList);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8480/api/employee/get/${user_id}`);
        setEmployeeInfo(employeeResponse.data);

        setLoading(false);
        
      } catch (error) {
        setErrorMessage(`Employee with user_id ${user_id} is not a manager.`);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  // Render rows for the table
  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_idElement}>
        <td className="text-center">{object.user_idElement}</td>
        <td className="text-center">{object.nameElement}</td>
        {/*
        <td className="text-center">{object.passwordElement}</td>
        */}
        <td className="text-center">{object.userTypeElement}</td>
        <td className="text-center">{object.entitlementToAnnualLeaveElement ? 'Yes' : 'No'}</td>
        <td className="text-center">{object.employeeTypeElement}</td>
        <td className="text-center">{object.belongToDepartmentNameElement}</td>
        {/*
        <td className="text-center">{object.belongToDepartmentIncludedByElement}</td>
        <td className="text-center">{object.belongToDepartmentDepartmentIdElement}</td>
        */}
        <td className="text-center">{object.medicalLeaveDayElement}</td>
        <td className="text-center">{object.overWorkingHourElement}</td>
      </tr>
    ));
  }

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <br />
      {myObjectList.length > 0 ? (
        <div>
          <form>
            <h2>Subordinates of: {employeeInfo && employeeInfo.name}</h2>
            <br />
            <h4>User ID: {employeeInfo && employeeInfo.user_id}</h4>
            <br />
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>User Id</th>
                  <th>Name</th>                  
                  <th>User Type</th>
                  <th>Entitlement to Annual Leave</th>
                  <th>Employee Type</th>
                  <th>Department Name</th>
                  <th>Medical Leave Day</th>
                  <th>Over Working Hour</th>
                </tr>
              </thead>
              <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
            </table>
            <br />
            <br />
            <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>{errorMessage}</p>
          <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
            Return to Employee List
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeGetSubordinatesById;

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeGetSubordinatesById = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Retrieve the object");
        setLoading(true);

        // Fetch subordinates data
        const response = await axios.get(`http://localhost:8480/api/employee/get-subordinates-by-id/${user_id}`);
        const subordinateList = response.data.map(subordinate => ({
          user_idElement: subordinate.user_id,
          nameElement: subordinate.name,
          passwordElement: subordinate.password,
          userTypeElement: subordinate.userType,
        }));

        updateMyObjectList(subordinateList);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8480/api/employee/get/${user_id}`);
        setEmployeeInfo(employeeResponse.data);

        setLoading(false);
        
      } catch (error) {
        setErrorMessage("You are not a manager!");
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  // Render rows for the table
  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_idElement}>
        <td className="text-center">{object.user_idElement}</td>
        <td className="text-center">{object.nameElement}</td>
        <td className="text-center">{object.passwordElement}</td>
        <td className="text-center">{object.userTypeElement}</td>
      </tr>
    ));
  }

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <br />
      {myObjectList.length > 0 ? (
        <div>
          <form>
          <h2>Subordinates of: {employeeInfo && employeeInfo.name}</h2>
            <br />
            <h4>User ID: {employeeInfo && employeeInfo.user_id}</h4>
            <br />
          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>User Id</th>
                <th>Name</th>
                <th>Password</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
          </table>
          <br />
              <br />
              <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </form>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default EmployeeGetSubordinatesById;
*/

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeGetSubordinatesById = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Retrieve the object");
        setLoading(true);

        // Fetch subordinates data
        const response = await axios.get(`http://localhost:8480/api/employee/get-subordinates-by-id/${user_id}`);
        const subordinateList = response.data.map(subordinate => ({
          user_idElement: subordinate.user_id,
          nameElement: subordinate.name,
          passwordElement: subordinate.password,
          userTypeElement: subordinate.userType,
        }));

        updateMyObjectList(subordinateList);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8480/api/employee/get/${user_id}`);
        setEmployeeInfo(employeeResponse.data);

        setLoading(false);
        
      } catch (error) {
        setErrorMessage(`Employee with user_id ${user_id} is not a manager.`);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  // Render rows for the table
  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_idElement}>
        <td className="text-center">{object.user_idElement}</td>
        <td className="text-center">{object.nameElement}</td>
        <td className="text-center">{object.passwordElement}</td>
        <td className="text-center">{object.userTypeElement}</td>
      </tr>
    ));
  }

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <br />
      {myObjectList.length > 0 ? (
        <div>
          <form>
            <h2>Subordinates of: {employeeInfo && employeeInfo.name}</h2>
            <br />
            <h4>User ID: {employeeInfo && employeeInfo.user_id}</h4>
            <br />
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>User Type</th>
                </tr>
              </thead>
              <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
            </table>
            <br />
            <br />
            <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>{errorMessage}</p>
          <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
            Return to Employee List
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeGetSubordinatesById;
*/

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeGetSubordinatesById = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Retrieve the object");
        setLoading(true);

        // Fetch subordinates data
        const response = await axios.get(`http://localhost:8480/api/employee/get-subordinates-by-id/${user_id}`);
        const subordinateList = response.data.map(subordinate => ({
          user_idElement: subordinate.user_id,
          nameElement: subordinate.name,
          userTypeElement: subordinate.userType,
          employeeTypeElement: subordinate.employeeType,




        }));

        updateMyObjectList(subordinateList);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8480/api/employee/get/${user_id}`);
        setEmployeeInfo(employeeResponse.data);

        setLoading(false);
        
      } catch (error) {
        setErrorMessage(`Employee with user_id ${user_id} is not a manager.`);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  // Render rows for the table
  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_idElement}>
        <td className="text-center">{object.user_idElement}</td>
        <td className="text-center">{object.nameElement}</td>
        <td className="text-center">{object.userTypeElement}</td>
        <td className="text-center">{object.employeeTypeElement}</td>
        {/* Update if necessary
        "name": "Arcain",
        "userType": "EMPLOYEE",
        "entitlementToAnnualLeave": true,
        "employeeType": "ADMINISTRATIVE",
        "user_id": 1,
        "belongToDepartment": {
            "name": "Head Office",
            "includedBy": null,
            "department_id": 1
        },
        "medical_leave_day": 0,
        "over_working_hour": 40

        */
       /*
        </tr>
        ));
      }
    
      return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
          <br />
          {myObjectList.length > 0 ? (
            <div>
              <form>
                <h2>Subordinates of: {employeeInfo && employeeInfo.name}</h2>
                <br />
                <h4>User ID: {employeeInfo && employeeInfo.user_id}</h4>
                <br />
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr className="text-center">
                      <th>User Id</th>
                      <th>Name</th>
                      <th>User Type</th>
                      <th>Employee Type</th>
                    </tr>
                  </thead>
                  <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
                </table>
                <br />
                <br />
                <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p>{errorMessage}</p>
              <button className="mx-2 btn btn-secondary" type="button" onClick={handleCancelClick}>
                Return to Employee List
              </button>
            </div>
          )}
        </div>
      );
    };
    
    export default EmployeeGetSubordinatesById;
    */