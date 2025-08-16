import { useState, useEffect, useContext } from "react";
import axios from "../assets/axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // FontAwesome profile icon
import { AppContent } from "../context/AppContext";

export default function BookingForm() {

  const {userData} = useContext(AppContent)


  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get current hour
  const hour = new Date().getHours();
  const isWorkingHour = hour >= 9 && hour < 21;

    // Fetch services
    useEffect(() => {
  axios
    .get("/services")
    .then((response) => {
      setServices(response.data);
      console.log("Services fetched:", response.data); // Check the data here
    })
    .catch((error) => console.error("Error fetching services:", error));
}, []);
    // Fetch staffs
    useEffect(() => {
      axios
        .get("staffs")
        .then((response) => setStaffs(response.data))
        .catch((error) => console.error("Error fetching staffs:", error));
    }, []);

  const handleCancelClick = () => navigate("/");

  return (
    <div className="">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 bg-[url('/Bg.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center z-50 ">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs " />

        {/* Profile Section */}
        <div
          className="absolute top-5 right-5 flex items-center text-white cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <FaUserCircle className="text-2xl mr-2" />
          <span className="font-semibold">{userData ? userData.name : "user"}</span>
        </div>

        {/* Form Overlay */}
        <div className="relative bg-gray-400/20 backdrop-blur-xs rounded-xl p-10 max-w-3xl w-full text-white">
          <h2 className="text-2xl font-bold text-center text-blue-900 font-impact">
            BOOK YOUR APPOINTMENT
          </h2>
          <p className="text-center text-blue-700 italic mt-1">
            Fill in the details below and confirm your booking
          </p>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="p-3 rounded bg-white/80 text-gray-800"
            />
            <input
              type="text"
              placeholder="Enter Your Contact Number"
              className="p-3 rounded bg-white/80 text-gray-800"
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-3 rounded bg-white/80 text-gray-800"
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="p-3 rounded bg-white/80 text-gray-800 w-1/2"
              />
              <input
                type="time"
                className="p-3 rounded bg-white/80 text-gray-800 w-1/2"
              />
            </div>

            {/* Staff Dropdown */}
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="p-3 rounded bg-white/80 text-gray-800"
            >
              <option value="">Select Preferred Staff</option>
              {staffs.length > 0 ? (
                staffs.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.staffName}
                  </option>
                ))
              ) : (
                <option>No Staff Available</option>
              )}
            </select>

            {/* Service Dropdown */}
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="p-3 rounded bg-white"
            >
              <option value="">Select Service</option>
              {services.length > 0 ? (
                services.map((service) => (
                  <option key={service._id} value={service._id}  className="text-gray-800 bg-white" >
                    {service.serviceName}
                  </option>
                ))
              ) : (
                <option>No Services Available</option>
              )}
            </select>

            <div className="fixed top-0 left-0 bg-white p-4 z-[100]">
  <select className="p-2 bg-white text-black">
    <option>Test Option 1</option>
    <option>Test Option 2</option>
  </select>
</div>


            {/* Buttons */}
            <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
              <div
                type="button"
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded cursor-pointer"
              >
                Cancel
              </div>

              <div>
                <div
                  type="button"
                  onClick={() => {
                    setShowConfirmation(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded cursor-pointer"
                >
                  Book Now
                </div>

                {showConfirmation && (
                  <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-purple-300 border border-gray-300 p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-10  text-green-500"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                          </div>
                        <h2 className="text-lg  font-semibold mb-4 text-blue-800">
                          Appointment Request Sent
                        </h2>
                    
                      <p className="mb-2">
                        Your appointment has been submitted for confirmation by
                        the salon staff.
                      </p>
                      {!isWorkingHour ? (
                        <p className="mb-2 text-red-600">
                          Note: You booked outside salon hours (9 AM – 9 PM). It
                          will be confirmed when the salon opens.
                        </p>
                      ) : (
                        <p className="mb-2 text-green-700">
                          Your request will be confirmed shortly during working
                          hours.
                        </p>
                      )}
                      <div
                        onClick={() => navigate("/profile")}
                        className="mt-4 bg-white hover:bg-purple-900 text-purple-500 font-semibold px-5 py-2 rounded cursor-pointer"
                      >
                        OK
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
