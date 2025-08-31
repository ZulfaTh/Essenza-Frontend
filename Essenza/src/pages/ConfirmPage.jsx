import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const booking = location.state?.booking;
  const amountPaid = location.state?.amountPaid;

  if (!booking) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p>No booking details found. Please go back.</p>
      </div>
    );
  }

  // Save booking to DB
  const saveBooking = async () => {
    try {
      const payload = {
        ...booking,
        amountPaid, 
         payment: true, // partial payment
      };
 

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        payload,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Booking saved successfully!");
        navigate("/profile"); // redirect after save
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      {/* Success Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-green-600 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>

      <h2 className="text-lg font-bold text-blue-900">
        Appointment Confirmed Successfully!
      </h2>

      {/* Appointment Card */}
      <div className="bg-white rounded-lg shadow-md p-6 w-96 mt-4 text-left">
        <h3 className="text-xl font-semibold mb-2">{booking.staffName}</h3>
        <p className="text-gray-600">
          {booking.slotDate} | {booking.slotTime}
        </p>
        <p className="mt-2">
          <strong>Customer:</strong> {booking.userName}
        </p>
        <p>
          <strong>Email:</strong> {booking.email}
        </p>
        <p>
          <strong>Phone:</strong> {booking.phone}
        </p>
        <hr className="my-2" />
        <p className="font-semibold">Services:</p>
        <ul className="list-disc list-inside text-gray-700">
          {booking.serviceData?.map((s, i) => (
            <li key={i}>
              {s.name} - Rs. {s.price}
            </li>
          ))}
        </ul>

        <hr className="my-2" />
        <p>
          <strong>Amount Paid:</strong> Rs. {amountPaid}
        </p>
        <p>
          <strong>Total:</strong> Rs. {booking.totalAmount}
        </p>
      </div>

      {/* OK Button */}
      <button
        onClick={saveBooking}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition cursor-pointer"
      >
        OK
      </button>
    </div>
  );
};

export default ConfirmPage;
