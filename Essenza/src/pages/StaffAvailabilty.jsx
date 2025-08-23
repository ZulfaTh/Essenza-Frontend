// import React, { useState, useEffect } from "react";

// export default function StaffAvailability() {
//   // Example working hours & slot duration
//   const startHour = 9; // 9 AM
//   const endHour = 17; // 5 PM
//   const slotDuration = 60; // in minutes

//   // Example booked slots from API (in "HH:mm" 24-hour format)
//   const [bookedSlots, setBookedSlots] = useState([]);

//   // All time slots
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     // Fetch booked slots (replace with API call)
//     // Example: booked at 10:00 and 14:00
//     setBookedSlots(["10:00", "14:00"]);
//   }, []);

//   useEffect(() => {
//     // Generate all slots between startHour and endHour
//     const generatedSlots = [];
//     for (let hour = startHour; hour < endHour; hour++) {
//       const timeString = `${hour.toString().padStart(2, "0")}:00`;
//       generatedSlots.push(timeString);
//     }
//     setSlots(generatedSlots);
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 w-screen h-screen">
//       <h1 className="text-2xl font-bold mb-6">Availability</h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {slots.map((slot) => {
//           const isBooked = bookedSlots.includes(slot);
//           return (
//             <div
//               key={slot}
//               className={`p-4 rounded-lg text-center font-semibold cursor-pointer transition ${
//                 isBooked
//                   ? "bg-red-500 text-white line-through"
//                   : "bg-green-500 text-white hover:bg-green-600"
//               }`}
//             >
//               {slot}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
