//http://localhost:8080/api/department/list
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DepartmentList() {
  const navigate = useNavigate();
  const [myObjectList, updateMyObjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Retrieve the object");
    setLoading(true);

    axios
      .get("http://localhost:8080/api/department/list")

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
    navigate(`/api/department/create`);
  };


  const handleGetObjectClick = (object) => {
    navigate(`/api/department/get/${object.department_id}`);
  };

  const handleSetManagerClick = (object) => {
    navigate(`/api/department/set-manager-by-id/${object.department_id}`);
  };
/*
  const handleDeleteObjectClick = (object) => {
    navigate(`/api/department/delete/${object.user_id}`);
  };
*/

    function renderObjectRows() {
    return myObjectList.map((object) => 
        <tr key={object.department_id}>
        <td className = "text-center">{object.department_id}</td>
        <td className = "text-center">{object.name}</td>
        <td className="text-center">{object.includedBy?.name || 'N/A'}</td>

        <td className = "text-center">
            <button className="btn btn-info mx-2" onClick={() => handleGetObjectClick(object)}>Detail</button>
            <button className="btn btn-warning mx-2" onClick={() => handleSetManagerClick(object)}>Set Manager</button>
            {/*<button className="btn btn-danger mx-2" onClick={() => handleDeleteObjectClick(object)}>Delete</button>*/}
        </td>
        </tr>
    );
    }


  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Department List</h2>
      <button className="btn btn-success mx-2" onClick={handleCreateObjectClick}>Create Department</button>
       <table className="table table-boardered table-hover">
        <thead>
          <tr className = "text-center">
            <th>Department ID</th>
            <th>Name</th>
            <th>IncludedBy</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{loading ? <p>Loading...</p> : renderObjectRows()}</tbody>
      </table>
    </div>
  );
}