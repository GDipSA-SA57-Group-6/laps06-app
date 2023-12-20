//App.js
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import React from "react"
import './App.css';
import ListEmployee from "./ListEmployee";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminList from "./AdminList";
import AdminGet from "./AdminGet";
import AdminDelete from "./AdminDelete";
import AdminCreateUserType from "./AdminCreateUserType";
import AdminUpdateIdUserType from "./AdminUpdateIdUserType";
import Learn from "./Learn";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeList from "./EmployeeList";
import EmployeeGet from "./EmployeeGet";
import EmployeeDelete from "./EmployeeDelete";
import EmployeeUpdate from "./EmployeeUpdate";


function App() {

  return (
    <BrowserRouter>
    {/*{getNavigationHtml()}*/}
    <div>
      <Learn/>
        <Routes>
          <Route path="/" element={<AdminList />} />
          <Route path="/api/admin/get/:user_id" element={<AdminGet />} />
          <Route path="/api/admin/list" element={<AdminList />} />
          <Route path="/api/admin/delete/:user_id" element={<AdminDelete/>} />
          <Route path="/api/admin/create/:user_type" element={<AdminCreateUserType/>} />
          <Route path="/api/admin/update/:user_id" element={<AdminUpdateIdUserType/>} />
          <Route path="/api/employee/create" element={<EmployeeCreate/>} />
          <Route path="/api/employee/list" element={<EmployeeList/>} />
          <Route path="/api/employee/get/:user_id" element={<EmployeeGet />} />
          <Route path="/api/employee/delete/:user_id" element={<EmployeeDelete />} />
          <Route path="/api/employee/update/:user_id" element={<EmployeeUpdate />} />


          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

