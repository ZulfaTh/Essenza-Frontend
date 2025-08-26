import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import appointmentsImg from "../../assets/appointments.png";
import staffsImg from "../../assets/staffs.png";
import servicesImg from "../../assets/services.png";
import customerImg from "../../assets/customers.jpeg";
import listImg from "../../assets/listImg.jpeg";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);

    const {slotDateFormat} =useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
      
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="pt-15 px-40">
        <div className="flex flex-wrap gap-10">
          {/* users */}
          <div className="flex items-center gap-2  px-10 py-5  bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img src={customerImg} alt="customers" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">{dashData.users}</p>
              <p className="text-gray-500">Customers</p>
            </div>
          </div>

          {/* Staffs */}
          <div className="flex items-center gap-2  px-10 py-5  bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img src={staffsImg} alt="Staffs" className="w-16 " />
            <div>
              <p className="text-2xl font-bold">{dashData.staffs}</p>
              <p className="text-gray-500">Staffs</p>
            </div>
          </div>

          {/* Services */}
          <div className="flex items-center px-10 py-5 bg-white shadow-xl rounded cursor-pointer hover:scale-105 transition-all">
            <img src={servicesImg} alt="Services" className="w-25" />
            <div>
              <p className="text-2xl font-bold">{dashData.services}</p>
              <p className="text-gray-500">Services</p>
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
                  className="rounded-full w-10"
                  src={item.staffData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.staffData.name}
                  </p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {
              item.cancelled
              ?  <p className="text-red-400 text-xs font-medium">Cancelled</p>
             : item.isCompleted 
             ? <p className="text-green-500 text-xs font-medium">Completed</p>
             : <svg
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
              </svg>
            }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
