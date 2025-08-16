import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const {backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials=true;


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent,setIsEmailSent] = useState('');
  const [otp,setOtp] = useState(0);
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);



  const inputRefs = React.useRef([]);

  //to automatically move to next input field
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  //to dlt a field using backsapce
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //to paste via ctrl+v
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e)=>{
    e.preventDefault();
    try {
      const {data} =await axios.post(backendUrl + '/api/auth/send-reset-otp',{email})
      data.success? toast.success(data.message) : toast.error(data.message) 
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP =async (e) =>{
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
        data.success? toast.success(data.message) : toast.error(data.message) 
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-purple-200 to-purple-400">
      {/* enter email id */}
      {!isEmailSent && 
      <form
        onSubmit={onSubmitEmail}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address
        </p>

        <div className="flex outline-white outline-1 rounded items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-7 ml-4 text-white"
          >
            <path
              fillRule="evenodd"
              d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full px-4 py-2 outline-none text-white"
            required
          />
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded mt-3 cursor-pointer">
          Submit
        </button>
      </form>
}
      {/* OTP input form */}
      {!isOtpSubmitted && isEmailSent &&  
      <form
        onSubmit={onSubmitOTP}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer">
          Submit
        </button>
      </form>

 }
      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent &&
      <form
        onSubmit={onSubmitNewPassword}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the new password below
        </p>

        <div className="flex outline-white outline-1 rounded items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-7 ml-4 text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            placeholder="Enter your new password"
            className="mt-1 w-full px-4 py-2 outline-none text-white"
            required
          />
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded mt-3">
          Submit
        </button>
      </form>
      }
    </div>
  );
}
