import { useContext, useEffect, useState } from "react";
import { AppContent } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingForm() {
  const { services, getServicesData, currencySymbol, backendUrl } = useContext(AppContent);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    staffId: "",
    staffName: "",
    slotDate: "",
    slotTime: "",
    userName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { userId, staffId, staffName, slotDate, slotTime, userName, email } = location.state;
      setFormData({ userId, staffId, staffName, slotDate, slotTime, userName, email, phone: "" });
    }
  }, [location.state]);

  useEffect(() => {
    getServicesData();
  }, [getServicesData]);

  const toggleService = (serviceId) =>
    setSelectedServices(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.phone || selectedServices.length === 0) {
      return toast.error("Fill all details & select at least one service");
    }

    try {
      const totalAmount = services
        .filter(s => selectedServices.includes(s._id))
        .reduce((sum, s) => sum + Number(s.price), 0);

      const payload = { ...formData, services: selectedServices, amount: totalAmount };
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, payload);

      if (data.success) {
        toast.success(data.message);
        navigate("/profile");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-screen flex justify-center pt-5">
      <form onSubmit={handleSubmit} className="p-6 w-full max-w-3xl bg-gray-50 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm Appointment</h2>
        <p><strong>Staff:</strong> {formData.staffName}</p>
        <p><strong>Date:</strong> {formData.slotDate} | <strong>Time:</strong> {formData.slotTime.toUpperCase()}</p>

        <div className="flex flex-col gap-3 mb-4">
          <input type="text" name="userName" placeholder="Your Name" value={formData.userName} onChange={handleChange} className="p-2 border rounded"/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded"/>
          <input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded"/>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <h3 className="font-bold mb-2">Select Services</h3>
          {services.map(s => (
            <label key={s._id} className="flex items-center p-3 bg-purple-200 rounded cursor-pointer hover:bg-purple-300">
              <input type="checkbox" checked={selectedServices.includes(s._id)} onChange={() => toggleService(s._id)} className="mr-3"/>
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-gray-600">Duration: {s.duration} | Price: {currencySymbol} {s.price}</p>
              </div>
            </label>
          ))}
        </div>

        <button type="submit" className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:scale-105 transition-transform cursor-pointer">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}
