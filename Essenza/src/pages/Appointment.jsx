import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appointment = () => {
  const { staffId } = useParams();
  const { staffs, userData, isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  const [staffInfo, setStaffInfo] = useState(null);
  const [staffSlots, setStaffSlots] = useState([]); // array of 7 arrays
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch staff info
  useEffect(() => {
    const info = staffs.find((s) => s._id === staffId) || null;
    setStaffInfo(info);
  }, [staffs, staffId]);

  // Generate available slots
  useEffect(() => {
    if (!staffInfo) return;

    const booked = staffInfo.slots_booked || {};
    const today = new Date();
    const now = new Date();
    const slotsByDay = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);

      const slots = [];
      for (let hour = 10; hour < 21; hour += 2) {
        const slotDate = new Date(day);
        slotDate.setHours(hour, 0, 0, 0);

        // Skip past hours if it's today
        if (i === 0 && slotDate <= now) continue;

        // build keys
        const dateKey =
          day.getDate() +
          "_" +
          (day.getMonth() + 1) +
          "_" +
          day.getFullYear();

        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour > 12 ? hour - 12 : hour;
        const timeKey = hour12 + ":00 " + ampm;

        // only push if NOT booked
        if (!booked[dateKey] || booked[dateKey].indexOf(timeKey) === -1) {
          slots.push({
            dateKey: dateKey,
            timeKey: timeKey,
            dateObj: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
          });
        }
      }
      slotsByDay.push(slots);
    }

    setStaffSlots(slotsByDay);
  }, [staffInfo]);

  const handleBook = () => {
    if (!isLoggedin) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!staffSlots[slotIndex] || staffSlots[slotIndex].length === 0) {
      return toast.warn("No slots available for this day");
    }

    if (!slotTime) {
      return toast.warn("Please select a time slot");
    }

    const selectedSlot = staffSlots[slotIndex].find(
      (s) => s.timeKey === slotTime
    );
    if (!selectedSlot) return toast.error("Invalid slot selection");

    navigate("/booking", {
      state: {
        userId: userData._id,
        staffId: staffInfo._id,
        staffName: staffInfo.name,
        slotDate: selectedSlot.dateKey,
        slotTime: selectedSlot.timeKey,
        userName: userData.name,
        email: userData.email,
      },
    });
  };

  return (
    staffInfo && (
      <div className="h-screen">
        {/* Staff info */}
        <div className="flex flex-col sm:flex-row gap-4 pt-10 px-20 lg:px-50">
          <img
            className="bg-purple-100 w-full sm:max-w-45 rounded"
            src={staffInfo.image}
            alt=""
          />
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="text-2xl font-medium">{staffInfo.name}</p>
            <p className="text-lg text-gray-600">{staffInfo.speciality}</p>
            <p className="text-gray-500 mt-2">{staffInfo.about}</p>
          </div>
        </div>

        {/* Booking slots */}
        <div className="lg:ml-96 sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Date pills */}
          <div className="flex gap-3 overflow-x-scroll mt-4">
            {staffSlots.map((daySlots, index) => {
              const labelDate = daySlots[0]?.dateObj || new Date();
              return (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded cursor-pointer ${
                    slotIndex === index
                      ? "bg-gray-900 text-white"
                      : "border border-gray-700"
                  }`}
                >
                  <p>{daysOfWeek[labelDate.getDay()]}</p>
                  <p>{labelDate.getDate()}</p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="flex gap-3 overflow-x-scroll mt-4">
            {staffSlots[slotIndex]?.length > 0 ? (
              staffSlots[slotIndex].map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => setSlotTime(item.timeKey)}
                  className={`px-5 py-2 rounded cursor-pointer ${
                    item.timeKey === slotTime
                      ? "bg-gray-900 text-white"
                      : "border border-gray-700"
                  }`}
                >
                  {item.timeKey}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No available slots</p>
            )}
          </div>
{  staffInfo.available &&
          <button
            onClick={handleBook}
            className="bg-purple-400 text-white px-14 py-3 rounded my-6 hover:bg-purple-700 cursor-pointer"
          >
            Book Appointment
          </button>
}
        </div>
      </div>
    )
  );
};

export default Appointment;
