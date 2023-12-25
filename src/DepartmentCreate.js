//http://localhost:8480/api/department/create
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function DepartmentCreate() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be 3-20 characters')
        .max(20, 'Name must be 3-20 characters')
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(`http://localhost:8480/api/department/create`, values);
        console.log(response.data); // Log the created department data
        setSuccessMessage(
          <span style={{ color: 'green' }}>Department successfully created!</span>
        );

        setTimeout(() => {
          navigate('/api/department/list'); // Assuming this is the correct route
        }, 3000);

      } catch (error) {
        setErrorMessage('Error creating department');
        console.error(error);
      }
    },
  });

  const handleReturnClick = () => {
    navigate('/api/department/list');
  };

  const handleCancelClick = () => {
    navigate('/api/department/list');
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <button className="mx-2 btn btn-primary" onClick={handleReturnClick}>
        Return
      </button>
      <h2 className="mt-5">Create Department</h2>
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
        {formik.touched.name && formik.errors.name && (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        )}
        <br />

        <div>
          <br />
          <button className="mx-2 btn btn-success" type="submit">
            Create Department
          </button>
          <button className="mx-2 btn btn-secondary" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}