import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const StaffContext = createContext();

const StaffContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [sToken, setSToken] = useState(
    localStorage.getItem("sToken") ? localStorage.getItem("sToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData]=useState(false)
  const [profileData,setProfileData] = useState
  (false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/staff/appointments", {
        headers: { sToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/staff/complete-appointment",{appointmentId}, {
        headers: { sToken },
      });

      if (data.success) {
       toast.success(data.message)
       getAppointments()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/staff/cancel-appointment",{appointmentId}, {
        headers: { sToken },
      });

      if (data.success) {
       toast.success(data.message)
       getAppointments()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const getDashData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/staff/dashboard',{headers:{sToken}})

      if (data.success) {
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/staff/profile", {
        headers: { sToken },
      });

      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    sToken,
    setSToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <StaffContext.Provider value={value}>
      {props.children}
    </StaffContext.Provider>
  );
};

export default StaffContextProvider;
