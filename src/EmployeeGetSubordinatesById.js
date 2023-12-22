import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeGetSubordinates = () => {
  const { user_id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch subordinates
        const response = await axios.get(`http://localhost:8080/api/employee/get-subordinates-by-id/${user_id}`);
        console.log(response.data); 
        updateMyObjectList(response.data);

        // Fetch current employee information
        const employeeResponse = await axios.get(`http://localhost:8080/api/employee/get/${user_id}`);
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

  function renderObjectRows() {
    return myObjectList.map((object) => (
      <tr key={object.user_id}>
        <td className="text-center">{object.user_id}</td>
        <td className="text-center">{object.name}</td>
        <td className="text-center">{object.password}</td>
        <td className="text-center">{object.userType}</td>
        <td className="text-center">Actions</td>
      </tr>
    ));
  }
  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <br />
      {myObjectList.length > 0 ? (
        <div>
          <h2>Subordinates of: User ID {employeeInfo.user_id}</h2>

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>User Id</th>
                <th>Name</th>
                <th>Password</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
          </table>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default EmployeeGetSubordinates;