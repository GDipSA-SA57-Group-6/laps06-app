//LF WIP
//http://localhost:8080/api/employee/create/{user_id}
import React, { useState, useEffect } from "react";
import axios from "axios";

const ObjectController = () => {
  const [user, setUser] = useState({});
  const [objectData, setObjectData] = useState({
    belongToDepartment: "",
    calenderYearMedicalLeave: 0,
    employeeType: "",
    entitlementToAnnualLeave: true,
    medical_leave_day: 0,
    over_working_hour: 0,
  });

  const createUser = async () => {
    try {
      // Make a request to create a new user in the backend
      const response = await axios.post("http://localhost:8080/api/employee/create/{user_id}", {
        name: "John Doe",
        password: "password123",
      });

      // Set the user data in the state
      setUser(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const createObject = async () => {
    try {
      // Make a request to create a new object using the user data
      const response = await axios.post(`http://localhost:8080/api/create/${user.id}`, {
        belongToDepartment: objectData.belongToDepartment,
        calenderYearMedicalLeave: objectData.calenderYearMedicalLeave,
        objectType: objectData.objectType,
        entitlementToAnnualLeave: objectData.entitlementToAnnualLeave,
        overworkingHour: objectData.overworkingHour,
      });

      // Log the created object data
      console.log("Created Object:", response.data);
    } catch (error) {
      console.error("Error creating object:", error);
    }
  };

  useEffect(() => {
    // Call the createUser function when the component mounts
    createUser();
  }, []); // Empty dependency array ensures the function is only called once on mount

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2>Create Employee</h2>
      <div>
        <h3>User Data:</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h3>Employee Data:</h3>
        <label>Belong to Department:</label>
        <input
          type="text"
          value={objectData.belongToDepartment}
          onChange={(e) =>
            setObjectData({ ...objectData, belongToDepartment: e.target.value })
          }
        />
        <br />
        <label>Calender Year Medical Leave:</label>
        <input
          type="number"
          value={objectData.calenderYearMedicalLeave}
          onChange={(e) =>
            setObjectData({
              ...objectData,
              calenderYearMedicalLeave: parseInt(e.target.value, 10),
            })
          }
        />
        <br />
        <label>Object Type:</label>
        <input
          type="text"
          value={objectData.objectType}
          onChange={(e) => setObjectData({ ...objectData, objectType: e.target.value })}
        />
        <br />
        <label>Entitlement to Annual Leave:</label>
        <input
          type="checkbox"
          checked={objectData.entitlementToAnnualLeave}
          onChange={(e) =>
            setObjectData({ ...objectData, entitlementToAnnualLeave: e.target.checked })
          }
        />
        <br />
        <label>Overworking Hour:</label>
        <input
          type="number"
          value={objectData.overworkingHour}
          onChange={(e) =>
            setObjectData({
              ...objectData,
              overworkingHour: parseInt(e.target.value, 10),
            })
          }
        />
        <br />
        <button className="btn btn-success mx-2" onClick={createObject}>Create Object</button>
      </div>
    </div>
  );
};

export default ObjectController;
