//http://localhost:8080/api/employee/create
import { AES, enc} from 'crypto-js';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const EmployeeCreate = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const preName = queryParams.get('name');
  const encryptedPassword = queryParams.get('password');
  const prePassword = AES.decrypt(encryptedPassword, 'yourSecretKey').toString(enc.Utf8);
  const preUserType = queryParams.get('userType');
  
  console.log("Decrypted Password:", prePassword);

  const formik = useFormik({
    initialValues: {
      name: preName,
      password: prePassword,
      userType: preUserType, // Use the userType from query parameters
      employeeType: 'ADMINISTRATIVE', // Default value
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(3, 'Must be at least 3 characters').max(20, 'Must be at most 20 characters'),
      password: Yup.string().required('Password is required').min(6, 'Must be at least 6 characters').max(10, 'Must be at most 10 characters'),
      userType: Yup.string().required('User Type is required'),
      employeeType: Yup.string().required('Employee Type is required'),
    }),


    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/api/employee/create', values);
        setSuccessMessage('Employee created successfully');
        setErrorMessage('');
        console.log(response.data); // Log the created employee data
        setSuccessMessage(
          <span style={{ color: "green" }}>Employee successfully created!</span>
        );

        setTimeout(() => {
          navigate("/api/employee/list"); // Assuming this is the correct route
        }, 3000);

      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error creating employee');
        console.error(error);
      }
    },
  });


  // Effect to update form values if the query parameters change
  useEffect(() => {
    const setFormValues = formik.setValues; // memoize setValues function
  
    // Update form values if the query parameters change
    setFormValues({
      name: preName ,
      password: prePassword ,
      userType: preUserType ,
      employeeType: 'ADMINISTRATIVE',
    });
  }, [preName, prePassword, preUserType, formik.setValues]); // include setValues in the dependency array

  const handleReturnClick = () => {
    navigate("/api/employee/list");
  };

  const handleCancelClick = () => {
    navigate("/api/employee/list");
  };


  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>Return</button>
      <h2 className="mt-5">Create Employee</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={formik.handleSubmit}>
        <br />
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: 'red', position: 'absolute'}}>{formik.errors.name}</div>
              ) : null}
              <br/>
        <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red', position: 'absolute' }}>{formik.errors.password}</div>
              ) : null}
              <br/>
        <br />
                <label htmlFor="userType">User Type</label>
                <br />
                <select
                  name="userType"
                  value={formik.values.userType}
                  onChange={formik.handleChange}
                  disabled  
                >
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {formik.touched.employeeType && formik.errors.employeeType ? (
                  <div style={{ color: 'red', position: 'absolute' }}>{formik.errors.employeeType}</div>
                ) : null}
                <br/>
        <br/>

                <label htmlFor="employeeType">Employee Type</label>
                <br />
                <select
                  name="employeeType"
                  value={formik.values.employeeType}
                  onChange={formik.handleChange}
                >
                  <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                </select>
                {formik.touched.employeeType && formik.errors.employeeType ? (
                  <div style={{ color: 'red', position: 'absolute' }}>{formik.errors.employeeType}</div>
                ) : null}
                <br/>

        <div>
        <br />
          <button className="mx-2 btn btn-success" type="submit">Create Employee</button>
          <button className="mx-2 btn btn-secondary" onClick={handleCancelClick}>
                            Cancel & Return to User List</button>
        </div>
      </form>

    </div>
  );
};

export default EmployeeCreate;