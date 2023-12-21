//http://localhost:8080/api/employee/list
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Retrieve the object");
    setLoading(true);

    axios
      .get("http://localhost:8080/api/employee/list")

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

  
  const handleCreateObjectClick = () => {
    navigate(`/api/employee/create`);
  };


  const handleGetObjectClick = (object) => {
    navigate(`/api/employee/get/${object.user_id}`);
  };

  const handleSetEntitlementClick = (object) => {
    navigate(`/api/employee/set-entitlement/${object.user_id}`);
  };
/*
  const handleDeleteObjectClick = (object) => {
    navigate(`/api/employee/delete/${object.user_id}`);
  };
*/

    function renderObjectRows() {
    return myObjectList.map((object) => 
        <tr key={object.user_id}>
        <td className = "text-center">{object.user_id}</td>
        <td className = "text-center">{object.name}</td>
        <td className = "text-center">{object.password}</td>
        <td className = "text-center">{object.userType}</td>
        <td className="text-center">{object.entitlementToAnnualLeave ? 'Yes' : 'No'}</td>
        <td className = "text-center">{object.employeeType}</td>
        
        {/*
        <td className = "text-center">{object.belongToDepartment.name!== null ? object.belongToDepartment.name : 'null'}</td>
        <td className="text-center">{object.belongToDepartment.includedBy !== null ? object.belongToDepartment.includedBy : 'null'}</td>
        <td className = "text-center">{object.belongToDepartment.department_id !== null ? object.belongToDepartment.includedBy : 'null'}</td>
        */}

        <td className = "text-center">{object.medical_leave_day}</td>
        <td className = "text-center">{object.over_working_hour}</td>

        <td className = "text-center">
            <button className="btn btn-info mx-2" onClick={() => handleGetObjectClick(object)}>Detail</button>
            <button className="btn btn-warning mx-2" onClick={() => handleSetEntitlementClick(object)}>Entitlement</button>
            {/*<button className="btn btn-danger mx-2" onClick={() => handleDeleteObjectClick(object)}>Delete</button>*/}
        </td>
        </tr>
    );
    }


  return (
    <div>
      <h2 className="mt-5">Employee List</h2>
      <button className="btn btn-success mx-2" onClick={handleCreateObjectClick}>Create Object</button>
       <table className="table table-boardered table-hover">
        <thead>
          <tr className = "text-center">
            <th>User Id</th>
            <th>Name</th>
            <th>Password</th>
            <th>User Type</th>
            <th>Annual Leave Entitlement</th>
            <th>Employee Type</th>
            {/*
            <th>Belong To Department</th>
            <th>Belong To Department: Name</th>
            <th>Belong To Department: Included By</th>
            <th>Belong To Department: Department ID</th>
            */}
            <th>Medical Leave Day</th>
            <th>Overworking Hour</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
      </table>
    </div>
  );
}