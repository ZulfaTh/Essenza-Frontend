import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [staffs, setStaffs] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments,setAppointments]=useState([])
  const [dashData,setDashData]=useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllStaffs = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-staffs",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setStaffs(data.staffs);
        console.log(data.staffs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllServices = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-services",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setServices(data.services);
        console.log(data.services);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeStaffAvailability = async (staffId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-staff-availability",
        { staffId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllStaffs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeServiceAvailability = async (serviceId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-service-availability",
        { serviceId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllServices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () =>{
    try {
      const {data} = await axios.get (backendUrl + '/api/admin/appointments',{headers:{aToken}})

      if(data.success){
        setAppointments(data.appointments)
        console.log(data.appointments);
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

    const cancelAppointment = async (appointmentId) =>{
    try {
      const {data} = await axios.post (backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})

      if(data.success){
       toast.success(data.message)
       getAllAppointments();
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async () =>{
    try {
     const {data } = await axios.get (backendUrl + '/api/admin/dashboard',{headers:{aToken}}) 

     if (data.success){
      setDashData(data.dashData)
      console.log(data.dashData);
      
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    staffs,
    getAllStaffs,
    changeStaffAvailability,
    services,
    getAllServices,
    changeServiceAvailability,
    appointments,setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,setDashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
