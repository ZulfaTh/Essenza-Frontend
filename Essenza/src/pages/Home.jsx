import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const { userData, backendUrl, isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  const handleClick = () => {
    if (userData) {
      navigate("/staffs");
    } else {
      navigate("/login");
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
    <div className="relative w-screen h-screen bg-[url('/salon.jpg')] bg-cover bg-no-repeat bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text on top */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Loading State */}
        {isLoggedin && !userData ? (
          <h1 className="text-3xl text-white font-bold animate-pulse">
            Loading your profile...
          </h1>
        ) : isLoggedin && userData ? (
          /* Logged In - Show Welcome */
          <div className="space-y-6 text-center px-4">
            <h1 className="text-4xl md:text-5xl text-white font-extrabold tracking-wider animate-bounce">
              Hello {userData.name}!
            </h1>

            <h1 className="text-2xl md:text-3xl font-bold font-dancing animate-pulse text-white">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
                Salon Essenza
              </span>{" "}
              Website
            </h1>

             {/* Show BOOK NOW only if account is verified */}
    {userData.isAccountVerified && (
      <button
        onClick={handleClick}
        className="font-bold mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow-lg transform hover:scale-105 transition-transform duration-500 cursor-pointer animate-bounce"
      >
        BOOK YOUR APPOINTMENTS NOW
      </button>
    )}
          </div>
        ) : (
          /* Not Logged In */
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
             SIGN UP  &  SCHEDULE 
            </button>
          </>
        )}

        {/* Show verification button if logged in but not verified */}
        {isLoggedin && userData && !userData.isAccountVerified && (
          <div className="mt-6 text-center">
            <p className="text-white text-lg animate-fade-in animate-delay-400">
              Please check your email and click the below button to enter the
              OTP to verify your account
            </p>
            <button
              className="font-bold mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow-lg transform hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={sendVerficationOtp}
            >
              VERIFY ACCOUNT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
