import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import appointmentsImg from "../../assets/appointments.png";
import staffsImg from "../../assets/staffs.png";
import servicesImg from "../../assets/services.png";
import userImg from "../../assets/userImg.png";
import listImg from "../../assets/listImg.png";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { aToken, getDashData, dashData, completeAppointment } =
    useContext(AdminContext);

  const { slotDateFormat, renderStars } = useContext(AppContext);

  const handleComplete = async (id, staffId) => {
  await completeAppointment(id, staffId);
  getDashData(); // refresh dashboard stats + latest appointments
};


 useEffect(() => {
  if (!aToken) return;

  // Initial fetch
  getDashData();

  // Poll every 5 seconds
  const interval = setInterval(() => {
    getDashData();
  }, 1000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, [aToken]);


  return (
    dashData && (
      <div className="pt-15 px-40">
        <div className="flex flex-wrap gap-10">
          {/* users */}
          <div
            onClick={() => navigate("/users-list")}
            className="flex items-center gap-2  px-10 py-5  bg-purple-300 shadow-xl rounded cursor-pointer hover:scale-105 transition-all"
          >
            <img src={userImg} alt="customers" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">{dashData.users}</p>
              <p className="text-gray-500">Customers</p>
            </div>
          </div>

          {/* Staffs */}
          <div
            onClick={() => navigate("/staff-list")}
            className="flex items-center gap-2  px-10 py-5  bg-purple-300 shadow-xl rounded cursor-pointer hover:scale-105 transition-all"
          >
            <img src={staffsImg} alt="Staffs" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">{dashData.staffs}</p>
              <p className="text-gray-500">Staffs</p>
            </div>
          </div>

          {/* Services */}
          <div
            onClick={() => navigate("/service-list")}
            className="flex items-center px-5 py-5 bg-purple-300 shadow-xl rounded cursor-pointer hover:scale-105 transition-all"
          >
            <img src={servicesImg} alt="Services" className="w-25" />
            <div>
              <p className="text-2xl font-bold">{dashData.services}</p>
              <p className="text-gray-500">Services</p>
            </div>
          </div>

          {/* Appointments */}
          <div
            onClick={() => navigate("/appointments")}
            className="flex items-center gap-2  px-10 py-5 bg-purple-300 shadow-xl rounded cursor-pointer hover:scale-105 transition-all"
          >
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
        <div className="bg-purple-200 mt-10">
          <div className="flex items-center gap-3 px-4 py-4 mt-10 rounded-t border border-purple-700">
            <img className="w-10" src={listImg} />
            <p className="font-bold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 border-purple-700 overflow-y-scroll">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-15 h-15"
                  src={item.staffData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.staffData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {/* --- Appointment Status --- */}
                  {item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex gap-5 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-10 cursor-pointer text-green-700"
                        onClick={() =>
                          handleComplete(item._id, item.staffData._id)
                        }
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* --- Reviews (only if completed and has review) --- */}
                  {item.isCompleted && item.review && (
                    <div className="p-2 border rounded bg-green-100 text-green-700 mt-2">
                      <p className="flex">
                        Rating: {renderStars(item.review.rating)}
                      </p>
                      <p>Comment: {item.review.comment}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
