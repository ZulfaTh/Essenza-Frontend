import React from "react";
import { useNavigate } from "react-router-dom";


const ConfirmPage = () => {
  const navigate = useNavigate();

 

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">

      {/* Success Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 text-green-600">
  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
</svg>

  
      <h2 className="my-4 text-lg font-bold text-blue-900">
        APPOINTMENT IS PLACED SUCCESSFULLY
      </h2>
      {/* Appointment Card */}
      <div className="bg-white rounded-lg shadow-md p-6 w-96 mb-6 text-left">
        <div className="mb-2">
          <h2 className="text-red-600 font-bold text-lg">SUN 19</h2>
          <p className="text-gray-500 text-sm">JANUARY 2024</p>
        </div>
        <h3 className="text-2xl font-semibold">10.00 A.M</h3>
        <p className="text-red-500 text-right text-sm mt-2">pending</p>
      </div>

    

      {/* OK Button */}
      <button
        onClick={ () => {
            navigate("/profile")}}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        OK
      </button>
    </div>
  );
};

export default ConfirmPage;


 