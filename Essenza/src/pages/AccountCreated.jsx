import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccountCreated() {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-0 bg-[url('/salonBg.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs " />
        <div className="relative z-10 p-6 rounded   w-full max-w-md ">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-20 text-green-700"
            >
              <path
                fill-rule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Your account has been successfully verified!
          </h2>

          <h2 className="text-lg text-center mt-20 font-semibold">
            {" "}
            You can now log in and book your first appointment
          </h2>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-purple-600 hover:bg-purple-700 text-purple-500 font-semibold px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
