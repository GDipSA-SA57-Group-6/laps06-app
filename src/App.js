//App.js
import React from "react"
import './App.css';
import ListEmployee from "./ListEmployee";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminList from "./AdminList";
import AdminGet from "./AdminGet";
import AdminDelete from "./AdminDelete";


function App() {

  return (
    <BrowserRouter>
    {/*{getNavigationHtml()}*/}
    <div>
        <Routes>
          <Route path="/" element={<AdminList />} />
          <Route path="/admin/get/:user_id" element={<AdminGet />} />
          <Route path="/admin/list" element={<AdminList />} />
          <Route path="/admin/delete/:user_id" element={<AdminDelete/>} />
          
          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
