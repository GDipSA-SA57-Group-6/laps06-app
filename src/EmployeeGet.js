//http://localhost:8480/api/employee/get/${user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeGet() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [object, setObject] = useState({
    user_idElement: "",
    nameElement: "",
    passwordElement: "",
    userTypeElement: "",
    entitlementToAnnualLeaveElement: "",
    employeeTypeElement:"",
    belongToDepartmentNameElement: "",
    belongToDepartmentIncludedByElement: "",
    belongToDepartmentDepartment_idElement: "",
    medical_leave_dayElement:"",
    over_working_hourElement: ""
  });

  useEffect(() => {
    console.log("Fetching data...");
    axios
      .get(`http://localhost:8480/api/employee/get/${user_id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setObject({
          user_idElement: response.data.user_id,
          nameElement: response.data.name,
          passwordElement: response.data.password,
          userTypeElement: response.data.userType,
          entitlementToAnnualLeaveElement: response.data.entitlementToAnnualLeave,
          employeeTypeElement:response.data.employeeType,
          belongToDepartmentNameElement: response.data.belongToDepartment.name,
          belongToDepartmentIncludedByElement: response.data.belongToDepartment.includedBy,
          belongToDepartmentDepartment_idElement: response.data.belongToDepartment.department_id,
          medical_leave_dayElement: response.data.medical_leave_day,
          over_working_hourElement: response.data.over_working_hour

        });
      })
      .catch((error) => {
        console.error("Error fetching object details:", error);
      });
  }, [user_id]);

  const handleReturnClick = () => {
    navigate("/api/employee/list");
  };

  const handleEditClick = () => {
    // Navigate to the edit route based on the object's ID
    navigate(`/api/employee/update/${object.user_idElement}`);
  };  
  
  const handleDeleteClick = () => {
    // Navigate to the delete route based on the object's ID
    navigate(`/api/employee/delete/${object.user_idElement}`);
  };

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };


  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>Return</button>
      <h2 className="mt-5">Object Detail</h2>
      <form>
        <label htmlFor="user_id">User Id</label>
        <br />
        <input type="text" name="user_id" value={object.user_idElement} disabled />
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" value={object.nameElement} disabled/>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="text" name="password" value={object.passwordElement} disabled />
        <br />
        <label htmlFor="userType">User Type</label>
        <br />
        <input type="text" name="userType" value={object.userTypeElement} disabled />
        <br />
        <label htmlFor="entitlementToAnnualLeave">Entitlement To Annual Leave</label>
        <br />
        <input type="text" name="entitlementToAnnualLeave" value={object.entitlementToAnnualLeaveElement? "Yes" : "No"} disabled/>
        <br />
        <label htmlFor="employeeType">Employee Type</label>
        <br />
        <input type="text" name="employeeType" value={object.employeeTypeElement} disabled/>
        <br />
        <label htmlFor="belongToDepartment.name">Belong To Department: Name</label>
        <br />
        <input type="text" name="belongToDepartment.name" value={object.belongToDepartmentNameElement} disabled/>
        <br />
        {/*
        <label htmlFor="belongToDepartment.includedBy">Belong To Department: Included By</label>
        <br />
        <input type="text" name="belongToDepartment.includedBy" value={object.belongToDepartmentIncludedByElement || "null"} disabled/>
        <br />
        */}
        <label htmlFor="belongToDepartment.department_id">Belong To Department: Department ID</label>
        <br />
        <input type="text" name="belongToDepartment.department_id" value={object.belongToDepartmentDepartment_idElement} disabled/>
        <br />
        <label htmlFor="medical_leave_day">Medical Leave Day</label>
        <br />
        <input type="text" name="medical_leave_day" value={object.medical_leave_dayElement} disabled/>
        <br />
        <label htmlFor="over_working_hour">Overworking Hour</label>
        <br />
        <input type="text" name="over_working_hour" value={object.over_working_hourElement} disabled/>
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