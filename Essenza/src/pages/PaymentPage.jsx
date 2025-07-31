import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/confirmation");
  };

  const username = "Zulfa";
  const bookedDate = "Sunday, July 7, 2025";
  const bookedTime = "10:00 AM";

  return (
    <div className="w-screen min-h-screen bg-[url('/Bg.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center p-4 md:p-8 relative">
      
      {/* Background Blur Layer */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* Main Card */}
      <div className="relative z-10 bg-white/90 rounded-lg w-full max-w-2xl space-y-6 p-6 md:p-8 shadow-lg">
        
        {/* Heading */}
        <h1 className="text-xl font-bold text-blue-900">Appointment Payment</h1>

        {/* Info Message */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded">
          <p className="font-medium">Hi {username}, your appointment has been confirmed!</p>
          <p className="text-sm mt-1">
            Please complete the payment to finalize your booking.
          
          </p>
          {/* Payment Deadline Warning */}
<div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-3 rounded shadow-sm">
  ⚠️ Please complete your payment within <strong>2 hours</strong>. If not, your appointment will be <strong>automatically cancelled</strong>.
</div>

          <p className="text-sm mt-1">
            Appointment Date: <strong>{bookedDate}</strong> at <strong>{bookedTime}</strong>
          </p>
        </div>

        {/* Selected Services */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="font-bold mb-2">SELECTED SERVICES</h2>
          <hr className="mb-2" />
          {["Classic Facial", "Classic Manicure", "Hair Coloring"].map((service, idx) => (
            <div key={idx} className="flex justify-between mb-1">
              <span>{service}</span>
              <span className="font-bold">Rs. XXXX</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold">TOTAL</span>
            <span className="font-bold">Rs. XXXXX</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="font-bold mb-2">PAYMENT METHOD</h2>
          <hr className="mb-2" />
          <div className="flex justify-between items-center">
            <span>VISA - XXXX 5678</span>
            <button className="text-red-600 font-medium hover:underline">Change</button>
          </div>
        </div>

        {/* Offers & Discounts */}
        <div className="bg-pink-100 shadow-md rounded-md p-4">
          <div className="flex justify-between">
            <span>Essenza Offers</span>
            <span className="font-bold text-red-600">-Rs. 500</span>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="font-bold mb-2">SUMMARY</h2>
          <hr className="mb-2" />
          <div className="flex justify-between mb-1">
            <span>Services Approx. Total</span>
            <span className="font-bold">Rs. XXXX</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Essenza Discount</span>
            <span className="font-bold text-red-600">-Rs. 500</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold">Final Amount:</span>
            <span className="font-bold">Rs. XXXXX</span>
          </div>
        </div>

        {/* Confirm Payment Button */}
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          CONFIRM & PAY
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
