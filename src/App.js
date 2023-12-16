//App.js
import React from "react"
import './App.css';
import ListEmployee from "./ListEmployee";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
    {/*{getNavigationHtml()}*/}
    <div>
        <Routes>
          <Route path="/" element={<ListEmployee />} />
          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;




/*
<Route path="/employee/:id" element={<Employee />} />
  const employeeList = [
    {
      id: 1,
      employeeId: "A007",
      name: "laps-06-app_employee1",
      managerId: "A008",
    },
    {
      id: 2,
      employeeId: "A002",
      name: "laps-06-app_employee2",
      managerId: "A008",
    }]

  return (
    <div className="App">
      <ListEmployee myEmployeeList={employeeList} />
    </div>
  );
*/

