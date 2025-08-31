import React, { useContext, useEffect } from "react";
import { StaffContext } from "../../context/StaffContext";
import userImg from "../../assets/userImg.png";
import rupeesImg from "../../assets/rupees.jpg";
import appointmentsImg from "../../assets/appointments.png";
import listImg from "../../assets/listImg.png";
import { AppContext } from "../../context/AppContext";

const StaffDashboard = () => {
  const { sToken, dashData, setDashData, getDashData,completeAppointment,cancelAppointment } =
    useContext(StaffContext);

  const { currency,slotDateFormat } = useContext(AppContext);

  useEffect(() => {
  if (!sToken) return;

  // Initial fetch
  getDashData()

  // Poll every 5 seconds
  const interval = setInterval(() => {
    getDashData();
  }, 1000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, [sToken]);


  return (
    dashData && (
      <div className="pt-15 px-40">
        <div className="flex flex-wrap gap-10">
          {/* users */}
          <div className="flex items-center gap-2  px-10 py-5  bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img src={rupeesImg} alt="customers" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">
                {currency}.{dashData.earnings}
              </p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          {/* users */}
          <div className="flex items-center gap-2  px-10 py-5  bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img src={userImg} alt="Staffs" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">{dashData.users}</p>
              <p className="text-gray-500">Customers</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-2  px-10 py-5 bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img
              src={appointmentsImg}
              alt="Appointments"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <p className="text-2xl font-bold">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>
        </div>

        {/* Latest bookings */}
        <div className="bg-white mt-10">
          <div className="flex items-center gap-3 px-4 py-4 mt-10 rounded-t border">
            <img className="w-10" src={listImg} />
            <p className="font-bold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 overflow-y-scroll">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="w-8 h-8 rounded-full object-cover "
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-10 cursor-pointer text-green-700"
                  onClick={() => {
                    completeAppointment(item._id);
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-10 cursor-pointer text-red-700"
                  onClick={() => cancelAppointment(item._id)}
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clip-rule="evenodd"
                  />
                </svg> */}
              </div>
            )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default StaffDashboard;
