const appointments = [
  {
    id: 1,
    service: "Haircut & Styling ",
    date: "2025-07-01",
    time: "10.30 AM",
    status: "Completed",
  },
  {
    id: 2,
    service: "Manicure & Pedicure",
    date: "2025-07-10",
    time: "03.00 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    service: "Classical Facial",
    date: "2025-07-15",
    time: "13.00 PM",
    status: "Pending",
  },
];

import { useNavigate } from "react-router-dom";
export default function UserProfile() {
  const navigate = useNavigate();
  return (
    <div className=" px-40 py-20 w-screen ">
      <div className="bg-white rounded-2xl shadow-xl  flex flex-col md:flex-row  items-center justify-center">
        {/* Profile Image */}
        <div className="flex gap-5 my-5">
          <div className="w-45 h-45 rounded-full overflow-hidden border-4 border-purple-400">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 justify-center my-auto">
            <h2 className="text-2xl font-bold text-gray-800">Jane Doe</h2>
            <p className="text-gray-600">jane.doe@example.com</p>
            <p className="text-gray-600">username</p>
            <p className="text-gray-600">NIC</p>
            <p className="text-gray-600">COntact Number</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-10 mt-35 cursor-pointer"
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </div>
      </div>

      {/* Appointment History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Appointment History
        </h3>
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm"
            >
              <div>
                <p className="font-medium">{appt.service}</p>
                <p className="text-sm text-gray-500">{appt.date}</p>
                <p className="text-sm text-gray-500">{appt.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appt.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "Confirmed"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
        <div  className="ml-auto mt-5 w-max"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12  shadow-lg transition duration-300 cursor-pointer"
        onClick={()=>{navigate('/booking')}}>
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
</svg>

</div>
      </div>
    </div>
  );
}
