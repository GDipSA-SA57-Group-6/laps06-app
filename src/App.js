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
import EmployeeSetEntitlementUserId from "./EmployeeSetEntitlementUserId";
import DepartmentList from "./DepartmentList";
import DepartmentGet from "./DepartmentGet";
import DepartmentCreate from "./DepartmentCreate";
import DepartmentSetManagerById from "./DepartmentSetManagerById";
import EmployeeAddEmployeeDepartmentId from "./EmployeeAddEmployeeDepartmentId";
import EmployeeGetSuperior from "./EmployeeGetSuperior";
import EmployeeGetSubordinatesById from "./EmployeeGetSubordinatesById";



function App() {

  return (
    <BrowserRouter>
    {/*{getNavigationHtml()}*/}
    <div>
      <Learn/>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
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
          <Route path="/api/employee/set-entitlement/:user_id" element={<EmployeeSetEntitlementUserId />} />
          <Route path="/api/employee/add-employee/:user_id" element={<EmployeeAddEmployeeDepartmentId />} />
          <Route path="/api/employee/get-superior/:user_id" element={<EmployeeGetSuperior />} />
          <Route path="/api/employee/get-subordinates-by-id/:user_id" element={<EmployeeGetSubordinatesById />} />

          <Route path="/api/department/list" element={<DepartmentList/>} />
          <Route path="/api/department/get/:department_id" element={<DepartmentGet />} />
          <Route path="/api/department/create" element={<DepartmentCreate/>} />
          <Route path="/api/department/set-manager-by-id/:department_id" element={<DepartmentSetManagerById/>} />
          


          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

