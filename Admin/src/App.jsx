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
import { StaffContext } from "./context/StaffContext";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffAppointment from "./pages/Staff/StaffAppointment";
import StaffProfile from "./pages/Staff/StaffProfile";
import Home from "./pages/Home";
import ReviewsList from "./pages/Admin/ReviewsList";
import UsersList from "./pages/Admin/UsersList";


const App = () => {
  const { aToken } = useContext(AdminContext);
  const {sToken} = useContext(StaffContext)

  return aToken || sToken ? (
    <div className="bg-purple-100">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
        {/* Admin Routes */}
          <Route path="/" element={<Home/>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/users-list" element={<UsersList/>}/>
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path="/staff-list" element={<StaffsList />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/service-list" element={<ServicesList />} />
           <Route path="/reviews-list" element={<ReviewsList />} />

            {/* Staff Routes */}
          <Route path="/staff-dashboard" element={<StaffDashboard/>}/>
           <Route path="/staff-appointments" element={<StaffAppointment/>}/>
            <Route path="/staff-profile" element={<StaffProfile/>}/>


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
