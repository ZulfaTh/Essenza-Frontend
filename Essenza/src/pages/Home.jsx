import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const { userData, backendUrl } = useContext(AppContent);

  const navigate = useNavigate();

  const handleClick = () => {
    {
      userData ? navigate("/booking") : navigate("/login");
    }
  };

  const sendVerficationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="relative w-screen h-screen bg-[url('/salon.jpg')] bg-cover bg-no-repeat bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text on top */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {userData ? (
            <div className="space-y-6 text-center px-4">
              <h1 className="text-4xl md:text-5xl text-white font-extrabold tracking-wider animate-bounce">
                Hello {userData.name}!
              </h1>

              <h1 className="text-2xl md:text-3xl font-bold font-dancing animate-pulse text-white">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
                  Salon Essenza
                </span>
                Website
              </h1>

              <p className="text-white text-lg animate-fade-in animate-delay-400">
                Please check your email and click the below button to enter the
                OTP to verify your account
              </p>
            </div>
          ) : (
            <>
              <div className="text-white font-['Alfa-Slab-One'] text-4xl font-bold mb-4">
                ELEVATE YOUR EVERYDAY LOOK
              </div>
              <h2 className="font-['Aclonica'] text-white text-xl">
                Find, Book, Indulge in Exceptional Beauty Care
              </h2>
              <button
                onClick={handleClick}
                 className="font-bold mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow-lg transform hover:scale-105 transition-transform duration-500 cursor-pointer animate-bounce"
              >
                {" "}
                {userData
                  ? "BOOK YOUR APPOINTMENTS NOW"
                  : "SIGN UP  &  SCHEDULE "}
              </button>
            </>
          )}

          {userData && !userData.isAccountVerified && (
            <button
              className="font-bold mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow-lg transform hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={sendVerficationOtp}
            >
              VERIFY ACCOUNT
            </button>
          )}
        </div>
      </div>
    </>
  );
}
