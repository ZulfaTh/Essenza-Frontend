import React, { useContext, useEffect } from "react";
import { StaffContext } from "../../context/StaffContext";
import { AppContext } from "../../context/AppContext";

const StaffAppointment = () => {
  const {
    sToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(StaffContext);

  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (sToken) {
      getAppointments();
    }
  }, [sToken]);

  return (
    <div className="w-full  m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid  grid-cols-7 grid-flow-col py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium text-sm">
          <p>#</p>
          <p>Customer</p>
          <p>Service</p>
          <p>Date & Time</p>
          <p>Total amount</p>
          <p>Payment</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className=" max-sm:gap-2 sm:grid  grid-cols-7 grid-flow-col   items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden  ">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              {item.serviceData.map((service, index) => (
                <p key={index} className="text-zinc-700 font-medium mt-1">
                  {service.name}
                </p>
              ))}
            </div>

            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>

            <p>
              {currency} {item.amount}
            </p>
            <p className="w-12 py-1 text-xs inline border border-purple-500  rounded">
              {item.payment ? "pending" : "pending"}
            </p>

            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
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
                <svg
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffAppointment;
