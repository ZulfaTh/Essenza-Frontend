import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-[url('/salonBg.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs " />
        <div className="relative z-10 p-6 rounded   w-full max-w-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>

          <h2 className="text-2xl font-bold text-white text-center mb-4">
            CREATE NEW ACCOUNT
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-md text-black font-bold">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-md text-black font-bold">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-md text-black font-bold">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your Userame"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-md text-black font-bold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-md text-black font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div
              type="submit"
              className="w-full bg-purple-500 text-center   text-white font-bold py-2 px-4 rounded-lg cursor-pointer "
              onClick={() => setShowPopup(true)}
            >
              CREATE ACCOUNT
            </div>

            {/* Popup Modal */}
            {showPopup && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative ">
                  <p
                    className="cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  >
                    Please check your email and click the verification link to
                    activate your account..
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
