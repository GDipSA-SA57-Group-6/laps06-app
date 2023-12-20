//http://localhost:8080/api/admin/create/${user_type}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCreateUserType() {
  const { user_type } = useParams();
  const navigate = useNavigate();
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const userTypeMapping = {
    0: "EMPLOYEE",
    1: "MANAGER",
    2: "ADMIN"
  };

  const [object, setObject] = useState({
    nameElement: "",
    passwordElement: "",
    userTypeElement: userTypeMapping[user_type] || "EMPLOYEE" // Initialize with default value
  });


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // If user_type changes, update the userTypeElement in the state
    setObject((prevObject) => ({ ...prevObject, userTypeElement: userTypeMapping[user_type] || "EMPLOYEE" }));
  }, [user_type]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleUserTypeChange = (e) => {
    const selectedUserType = e.target.value;
    setObject({ ...object, userTypeElement: selectedUserType });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateForm = () => {
    // Reset error messages
    setNameError('');
    setPasswordError('');

    let isValid = true;

    // Name validation
    if (object.nameElement.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else if (object.nameElement.length < 3 || object.nameElement.length > 20) {
      setNameError('Name must be 3-20 characters');
      isValid = false;
    }

    // Password validation
    if (object.passwordElement.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else if (object.passwordElement.length < 6 || object.passwordElement.length > 10) {
      setPasswordError('Password must be 6-10 characters');
      isValid = false;
    }

    return isValid;
  };
  
  const handleAdminCreateUserTypeClick = (e) => {
    e.preventDefault();
    console.log("Object State:", object);

    const updatedData = {
      name: object.nameElement,
      password: object.passwordElement,
      userType: object.userTypeElement,
    };

    const isFormValid = validateForm();        

    if (isFormValid) {
        /*
        if (object.userTypeElement === "EMPLOYEE") {
          setSuccessMessage(
            <span style={{ color: "blue" }}>Redirecting to Create Employee page... </span>
          );
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/api/employee/create"); 
          }, 3000); //3 seconds
          return; // Return to prevent the rest of the function from executing
        }
        */
        if (object.userTypeElement === "EMPLOYEE") {
          // Replace placeholders with actual values
          const queryParams = `?name=${encodeURIComponent(object.nameElement)}&password=${encodeURIComponent
                (object.passwordElement)}&userType=${encodeURIComponent(object.userTypeElement)}`;

          console.log("Constructed Query Parameters:", queryParams);
        
          setSuccessMessage(
            <span style={{ color: "blue" }}>Redirecting to Create Employee page... </span>
          );
          setShowSuccessMessage(true);
          
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate(`/api/employee/create${queryParams}`);
          }, 3000); // 3 seconds
        
          return; // Return to prevent the rest of the function from executing
        }

        axios
          .post(`http://localhost:8080/api/admin/create/${user_type}`, updatedData)
          .then((response) => {
            console.log("Success!");
            console.log("Response Data:", response.data);

            setSuccessMessage(
              <span style={{ color: "green" }}>User successfully created!</span>
            );
            setShowSuccessMessage(true);

            setTimeout(() => {
              setShowSuccessMessage(false);
              navigate("/api/admin/list"); // Assuming this is the correct route
            }, 3000); // 3000 milliseconds = 3 seconds
          })
          .catch((error) => {
            console.error("Error creating object:", error);
          });    
    }
  };
  

  const handleCancelClick = () => {
    navigate("/api/admin/list");
  };

  const handleReturnClick = () => {
    navigate("/api/admin/list");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>
        Return
      </button>
      <h2 className="mt-5">Create User</h2>
      {showSuccessMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form>
        <label htmlFor="user_type">User Type</label>
        <br />
        <select
          name="user_type"
          value={object.userTypeElement}
          onChange={handleUserTypeChange}
        >
          {Object.entries(userTypeMapping).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={object.nameElement}
          onChange={(e) => {
            setObject({ ...object, nameElement: e.target.value });
            setNameError(''); // Clear the error when the user types
          }}
        />
        <div className="error-message" style={{ color: 'red' }}>{nameError}</div>


        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          name="password"
          value={object.passwordElement}
          onChange={(e) => {
            setObject({ ...object, passwordElement: e.target.value });
            setPasswordError(''); // Clear the error when the user types
          }}
        />
        <div className="error-message" style={{ color: 'red' }}>{passwordError}</div>

        <br />
        <br />
        <button
          className="mx-2 btn btn-success"
          onClick={handleAdminCreateUserTypeClick}
        >
          Create User
        </button>
        <button
          className="mx-2 btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancel & Return to User List
        </button>
      </form>
      
      {console.log("Object State:", object)}
    </div>
  );
}




/*FIRST VERSION
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCreateUserType() {
  const { user_type } = useParams();
  const navigate = useNavigate();

  const userTypes = {
    0: "EMPLOYEE",
    1: "MANAGER",
    2: "ADMIN"
  };

  const [object, setObject] = useState({
    nameElement: "",
    passwordElement: "",
    user_typeElement: user_type,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAdminCreateUserTypeClick = (e) => {
    e.preventDefault();

    console.log("Object State:", object);

    const updatedData = {
      name: object.nameElement,
      password: object.passwordElement,
      user_type: object.user_typeElement,
    };

    axios
      .post(`http://localhost:8080/api/admin/create/${user_type}`, updatedData)
      .then((response) => {
        console.log("Success!");
        console.log("Response Data:", response.data);

        setSuccessMessage(
          <span style={{ color: "green" }}>User successfully created!</span>
        );
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/api/admin/list"); // Assuming this is the correct route
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.error("Error creating object:", error);
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
      <h2>Create User</h2>
      {showSuccessMessage && <div className="success-message">{successMessage}</div>}
      <form>
        <label htmlFor="user_type">User Type</label>
        <br />
        <select
          name="user_type"
          value={object.user_typeElement}
          onChange={(e) => setObject({ ...object, user_typeElement: e.target.value })}
        >
          {Object.keys(userTypes).map((key) => (
            <option key={key} value={key}>
              {userTypes[key]}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={object.nameElement}
          onChange={(e) => setObject({ ...object, nameElement: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          name="password"
          value={object.passwordElement}
          onChange={(e) => setObject({ ...object, passwordElement: e.target.value })}
        />
        <br />
        <button onClick={handleAdminCreateUserTypeClick}>Create User</button>
        <button onClick={handleCancelClick}>Cancel & Return to User List</button>
      </form>
    </div>
  );
}
*/

/*
    axios
      .post(`http://localhost:8080/api/admin/create/${user_type}`, updatedData)
      .then((response) => {
          console.log("Success!");
          console.log("Response Data:", response.data);

          setSuccessMessage(
            <span style={{ color: "green" }}>User successfully created! </span>
          );
          setShowSuccessMessage(true);

          setTimeout(() => {
          setShowSuccessMessage(false);
          // Redirect based on user_type
          if (object.user_typeElement === "0") {
            setTimeout(() => {
              navigate("/api/employee/create");
            }, 3000);
            setSuccessMessage(
              <span style={{ color: "blue" }}>Redirecting to create employee page...</span>
            );
            setShowSuccessMessage(true);
          } else {
            setTimeout(() => {
              navigate("/api/admin/list");
            }, 3000);
          }
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.error("Error creating object:", error);
      });
  };
*/


/*SECOND VERSION
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCreateUserType() {
  const { user_type } = useParams();
  const navigate = useNavigate();

  const userTypeMapping = {
    0: "EMPLOYEE",
    1: "MANAGER",
    2: "ADMIN"
  };

  const [object, setObject] = useState({
    nameElement: "",
    passwordElement: "",
    userTypeElement: userTypeMapping[user_type] || "EMPLOYEE" // Initialize with default value
  });
*/

  /* eslint-disable react-hooks/exhaustive-deps */
/*
  useEffect(() => {
    // If user_type changes, update the userTypeElement in the state
    setObject((prevObject) => ({ ...prevObject, userTypeElement: userTypeMapping[user_type] || "EMPLOYEE" }));
  }, [user_type]);
 */
  /* eslint-enable react-hooks/exhaustive-deps */

/*
  const handleUserTypeChange = (e) => {
    const selectedUserType = e.target.value;
    setObject({ ...object, userTypeElement: selectedUserType });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAdminCreateUserTypeClick = (e) => {
    e.preventDefault();

    console.log("Object State:", object);

    const updatedData = {
      name: object.nameElement,
      password: object.passwordElement,
      userType: object.userTypeElement,
    };

    if (object.userTypeElement === "EMPLOYEE") {
      setSuccessMessage(
        <span style={{ color: "blue" }}>Redirecting to Create Employee page... </span>
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/api/employee/create"); // Assuming this is the correct route
      }, 3000); // 3000 milliseconds = 3 seconds
      return; // Return to prevent the rest of the function from executing
    } 


    axios
      .post(`http://localhost:8080/api/admin/create/${user_type}`, updatedData)
      .then((response) => {
        console.log("Success!");
        console.log("Response Data:", response.data);

        setSuccessMessage(
          <span style={{ color: "green" }}>User successfully created!</span>
        );
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/api/admin/list"); // Assuming this is the correct route
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.error("Error creating object:", error);
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
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>
        Return
      </button>
      <h2 className="mt-5">Create User</h2>
      {showSuccessMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form>
        <label htmlFor="user_type">User Type</label>
        <br />
        <select
          name="user_type"
          value={object.userTypeElement}
          onChange={handleUserTypeChange}
        >
          {Object.entries(userTypeMapping).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>

        <br />
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={object.nameElement}
          onChange={(e) =>
            setObject({ ...object, nameElement: e.target.value })
          }
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          name="password"
          value={object.passwordElement}
          onChange={(e) =>
            setObject({ ...object, passwordElement: e.target.value })
          }
        />
        <br />
        <br />
        <button
          className="mx-2 btn btn-success"
          onClick={handleAdminCreateUserTypeClick}
        >
          Create User
        </button>
        <button
          className="mx-2 btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancel & Return to User List
        </button>
      </form>
      
      {console.log("Object State:", object)}
    </div>
  );
}
*/