import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  //unless we add this every time refresh the page it will logout automatically.so we have to send cookies via this
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);

  const currencySymbol = "Rs";

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/auth/is-authenticated"
      );

      if (data.success) {
        setIsLoggedin(true);
        setToken(data.token);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getStaffsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/staff/list");

      data.success ? setStaffs(data.staffs) : toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getServicesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/service/list");

      data.success ? setServices(data.services) : toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
        console.log(
          "Appointments:",
          data.appointments,
          Array.isArray(data.appointments)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

    const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getStaffsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

const getReviews = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/reviews/list');
    data.success ? setReviews(data.reviews) : toast.error(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};



  //whenever web page loaded this will check for user logged in or not
  useEffect(() => {
    getAuthState();
    getStaffsData();
    getServicesData();
    getUserData();
    getReviews();
  }, []);

  const value = {
    backendUrl,
    token,
    setToken,
    staffs,
    getStaffsData,
    services,
    getServicesData,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    currencySymbol,
    reviews,setReviews,
    getReviews,
    appointments,
    getUserAppointments
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
