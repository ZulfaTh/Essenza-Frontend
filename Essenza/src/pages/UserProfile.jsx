import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserProfile() {
  const {
    backendUrl,
    userData,
    token,
    getUserData,
    setUserData,
    getStaffsData,
  } = useContext(AppContent);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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

  const updateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-user`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData(); // <-- call the function
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      getUserAppointments();
    }
  }, [userData]);

  return (
    userData && (
      <div className="px-40 py-20 w-screen">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl flex flex-col  items-center justify-center gap-5 p-5">
          {/* Profile Image */}
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-purple-400">
            {isEdit ? (
              <label
                htmlFor="image"
                className="cursor-pointer w-full h-full block"
              >
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData.image || "/profile.jpg"
                  }
                  alt="Profile"
                  className="w-44 h-44 rounded-full overflow-hidden border-4 border-purple-400 object-cover"
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                src={userData.image || "/profile.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col justify-center my-auto gap-2">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border p-2 rounded"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}
            <p className="text-gray-600">{userData.email}</p>
          </div>

          {/* Edit / Save Button */}
          <div>
            {isEdit ? (
              <button
                onClick={updateUser}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
              >
                Save Info
              </button>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Appointment History */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Appointment History
          </h3>
          <div className="space-y-4">
            {appointments.map((item, index) => (
              <div
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 "
                key={index}
              >
                <div>
                  <img
                    className="w-32 bg-indigo-50"
                    src={item.staffData.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    Service By: {item.staffData.name}
                  </p>
                  <p>Total amount: {item.amount}</p>
                  <div>
                    Selected services:
                    {item.serviceData.map((service, index) => (
                      <p key={index} className="text-zinc-700 font-medium mt-1">
                        {service.name}
                      </p>
                    ))}
                  </div>{" "}
                  <p className="text-xs mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time :{" "}
                    </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && 
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-300">
                      Paid
                    </button>
                  }
                  {!item.cancelled && !item.payment && !item.isCompleted && 
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-300">
                      Payment
                    </button>
                  }
                  {!item.cancelled && !item.isCompleted && 
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Cancel
                    </button>
                  }

                  {item.cancelled && !item.isCompleted &&  
                    <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">
                      Appointment Cancelled
                    </button>
                  }

                    {item.isCompleted &&  
                    <button className="sm:min-w-48 py-2 border border-green-500 text-green-500">
                      Completed
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Add Appointment Button */}
          <div className="ml-auto mt-5 w-max">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg transition duration-300 cursor-pointer"
              onClick={() => navigate("/staffs")}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  );
}
