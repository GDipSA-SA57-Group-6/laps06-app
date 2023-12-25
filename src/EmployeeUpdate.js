//http://localhost:8480/api/employee/update/${user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EmployeeUpdate() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [object, setObject] = useState({
    user_idElement: user_id,
    nameElement: "",
    passwordElement: "",
    userTypeElement: "",
    entitlementToAnnualLeaveElement: "",
    employeeTypeElement:"",
    belongToDepartmentNameElement: "",
    belongToDepartmentIncludedByElement: "",
    belongToDepartmentDepartment_idElement: "",
    medical_leave_dayElement: "",
    over_working_hourElement: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8480/api/employee/get/${user_id}`)
      .then((response) => {
        setObject((object) => ({
          ...object,
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
        }));
      })
      .catch((error) => {
        console.error("Error fetching object details:", error);
      });
  }, [user_id, setObject]);

  const handleEditClick = (e) => {
    e.preventDefault();
    console.log("Object State:", object);

    const updatedData = {
        user_id: object.user_idElement,
        name: object.nameElement,
        password: object.passwordElement,
        userType: object.userTypeElement,
        entitlementToAnnualLeave: object.entitlementToAnnualLeaveElement,
        employeeType: object.employeeTypeElement,
        belongToDepartment: {
          name: object.belongToDepartmentNameElement,
          includedBy: object.belongToDepartmentIncludedByElement,
          department_id: object.belongToDepartmentDepartment_idElement,
        },
        medical_leave_day: object.medical_leave_dayElement,
        over_working_hour: object.over_working_hourElement,
    };

    console.log("Updated Data:", updatedData);

    axios
    .post(`http://localhost:8480/api/employee/update/${user_id}`, updatedData)
    .then((response) => {
      console.log("Success!");
      console.log(response.updatedData);

      // Display a success message for 3 seconds
      setSuccessMessage(
        <span style={{ color: "green" }}>
          User details successfully updated! Returning to the previous page.
        </span>
      );
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/api/employee/list");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error updating object details:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    });
};

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };

  const handleReturnClick = () => {
    navigate("/api/employee/list");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="btn btn-primary mx-2" onClick={handleReturnClick}>Return</button>
      <h2 className="mt-5">Edit Object</h2>
      {showSuccessMessage && <div className="success-message">{successMessage}</div>}
      <form>
        <label htmlFor="user_id">User ID</label>
        <br />
        <input type="text" name="user_id" value={object.user_idElement} disabled 
                  onChange={(e) => setObject({ ...object, user_idElement: e.target.value })}/>
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" value={object.nameElement}  
                  onChange={(e) => setObject({ ...object, nameElement: e.target.value })}/>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="text" name="password" value={object.passwordElement} disabled
                  onChange={(e) => setObject({ ...object, passwordElement: e.target.value })}/>
        <br />
        <label htmlFor="userType">User Type</label>
        <br />
        <select
          name="userType" value={object.userTypeElement}
                  onChange={(e) => setObject({ ...object, userTypeElement: e.target.value })}
          >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <br />  
        <label htmlFor="entitlementToAnnualLeave">Entitlement To Annual Leave</label>
        <br />
        <select
          name="entitlementToAnnualLeave" value={object.entitlementToAnnualLeaveElement}
                  onChange={(e) => setObject({ ...object, entitlementToAnnualLeaveElement: e.target.value })}
          >
            {/*
          <option value="true">Yes</option>
          <option value="false">No</option>
            */}
        </select>
        {/*<input type="text" name="entitlementToAnnualLeave" value={object.entitlementToAnnualLeaveElement} 
                  onChange={(e) => setObject({ ...object, entitlementToAnnualLeaveElement: e.target.value })}/>*/}
        <br />

        <label htmlFor="employeeType">Employee Type</label>
        <br /> 
        <select
          name="employeeType" value={object.employeeTypeElement}
                  onChange={(e) => setObject({ ...object, employeeTypeElement: e.target.value })}
          >
          <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
          <option value="PROFESSIONAL">PROFESSIONAL</option>
        </select>
        <br />  
        <label htmlFor="belongToDepartment.name">Belong To Department: Name</label>
        <br />
        <input
        type="text"
        name="belongToDepartment.name"
        value={object.belongToDepartmentNameElement}
        onChange={(e) => setObject({ ...object, belongToDepartmentNameElement: e.target.value })}
        />
        <br />

        <label htmlFor="belongToDepartment.includedBy">Belong To Department: Included By</label>
        <br />
        <input
        type="text"
        name="belongToDepartment.includedBy"
        value={object.belongToDepartmentIncludedByElement}
        onChange={(e) => setObject({ ...object, belongToDepartmentIncludedByElement: e.target.value })}
        />
        <br />

        <label htmlFor="belongToDepartment.department_id">Belong To Department: Department ID</label>
        <br />
        <input
        type="text"
        name="belongToDepartment.department_id"
        value={object.belongToDepartmentDepartment_idElement}
        onChange={(e) => setObject({ ...object, belongToDepartmentDepartment_idElement: e.target.value })}
        />
        <br />

        <label htmlFor="medical_leave_day">Medical Leave Day</label>
        <br />
        <input
        type="text"
        name="medical_leave_day"
        value={object.medical_leave_dayElement}
        onChange={(e) => setObject({ ...object, medical_leave_dayElement: e.target.value })}
        />
        <br />

        <label htmlFor="over_working_hour">Overworking Hour</label>
        <br />
        <input
        type="text"
        name="over_working_hour"
        value={object.over_working_hourElement}
        onChange={(e) => setObject({ ...object, over_working_hourElement: e.target.value })}
        />
        <br />

        <br />
        <br />
        <button className="btn btn-success mx-2" onClick={handleEditClick}>Save Changes</button>
        <button className="btn btn-secondary mx-2" onClick={handleCancelClick}>Cancel & Return to Object List</button>
      </form>
      {/* Log state or other information for debugging */}
      {console.log("Object State:", object)}
    </div>
  );
}
