/*this is for http://localhost:8080/api/admin/get/${user_id}
//Too complicated for front end:
@PutMapping("/update/{id}/{user_type}")
//LF change to simpler version:
@PostMapping("/update/{id}")*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function AdminUpdateIdUserType() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [object, setObject] = useState({
    user_idElement: user_id,
    nameElement: "",
    passwordElement: "",
    userTypeElement: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/get/${user_id}`)
      .then((response) => {
        setObject((object) => ({
          ...object,
          user_idElement: response.data.user_id,
          nameElement: response.data.name,
          passwordElement: response.data.password,
          userTypeElement: response.data.userType
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
      managerId: object.passwordElement,
      userType: object.userTypeElement
    };

    console.log("Updated Data:", updatedData);

    axios
      .post(`http://localhost:8080/api/admin/update/${user_id}`, updatedData)
      .then((response) => {
        console.log("Success!");
        console.log(response.updatedData);
        navigate("/api/admin/list");
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
    navigate("/api/admin/list");
  };

  const handleReturnClick = () => {
    navigate("/api/admin/list");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="btn btn-primary mx-2" onClick={handleReturnClick}>Return</button>
      <h2 className="mt-5">Edit Object</h2>
      <form>
        <label htmlFor="user_id">User ID</label>
        <br />
        <input type="text" name="user_id" value={object.user_idElement} disabled 
                  onChange={(e) => setObject({ ...object, user_idElement: e.target.value })}/>
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" value={object.nameElement} disabled 
                  onChange={(e) => setObject({ ...object, nameElement: e.target.value })}/>
        <br />
        <label htmlFor="password">Password</label>
        <br />

        <input type="password" name="password" value={object.passwordElement} disabled
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
        <br />
        <button className="btn btn-success mx-2" onClick={handleEditClick}>Save Changes</button>
        <button className="btn btn-secondary mx-2" onClick={handleCancelClick}>Cancel & Return to Object List</button>
      </form>
      {/* Log state or other information for debugging */}
      {console.log("Object State:", object)}
    </div>
  );
}



/*
          <label htmlFor="userType">User Type</label>
          <br />
          <select
          name="userType"
          value={object.userTypeElement}
                onChange={(e) => setObject({ ...object, userTypeElement: e.target.value })}>
          {Object.keys(userTypeMapping).map((key) => (
            <option key={key} value={key}>
              {userTypeMapping[key]}
            </option>
          ))}
          </select>
          <br />
*/
/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminUpdateIdUserType() {
  const {user_id} = useParams();
  const navigate = useNavigate();

  const userTypeMapping = {
    0: "EMPLOYEE",
    1: "MANAGER",
    2: "ADMIN"
  };

  const [object, setObject] = useState({
  user_idElement: "",
  nameElement: "",
  passwordElement: "",
  user_typeElement: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/get/${user_id}`)
      .then((response) => {
        setObject((object) => ({
          ...object,
          user_idElement: response.data.user_id,
          nameElement: response.data.name,
          passwordElement: response.data.password,
          user_typeElement: response.data.user_type
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
    managerId: object.passwordElement,
    user_typeElement: object.user_typeElement
  };
  axios
    .put(`http://localhost:8080/api/admin/update/${user_id}`, updatedData)
    .then((response) => {
      console.log("Success!");
      console.log(response.updatedData);
      navigate("/api/admin/list");
    })
    .catch((error) => {
      console.error("Error updating object details:", error);
    });
  };


  const handleCancelClick = () => {
    navigate("/api/admin/list");
  };

  const handleReturnClick = () => {
    navigate("/api/admin/list");
  };

  return (
    <div>
      <button onClick={handleReturnClick}>Return</button>
      <h2>Edit Object</h2>
        <form>
          <label htmlFor="user_id">User ID</label>
          <br />
          <input type="text" name="user_id" value={object.user_idElement} disabled />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" value={object.nameElement} disabled/>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="text" name="password" value={object.passwordElement} 
              onChange={(e) => setObject({ ...object, passwordElement: e.target.value })} />

          {/*<input type="password" name="password" value={object.passwordElement} disabled/>*/

          /*
          <br />
          <label htmlFor="user_type">User Type</label>
          <br />
          <select
          name="user_type"
          value={object.user_typeElement}
                onChange={(e) => setObject({ ...object, user_typeElement: e.target.value })}>
          {Object.keys(userTypeMapping).map((key) => (
            <option key={key} value={key}>
              {userTypeMapping[key]}
            </option>
          ))}
        </select>
        <br />

          <br />
          <button onClick={handleEditClick}>Save Changes</button>
          <button onClick={handleCancelClick}>Cancel & Return to Object List</button>
        </form>
            {/* Log state or other information for debugging */
            /*
            {console.log("Object State:", object)}
    </div>
  )
}
*/