import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import AddStaff from "./pages/Admin/AddStaff";
import StaffsList from "./pages/Admin/StaffsList";
import AddService from "./pages/Admin/AddService";
import ServicesList from "./pages/Admin/ServicesList";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-purple-100">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path="/staff-list" element={<StaffsList />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/service-list" element={<ServicesList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
