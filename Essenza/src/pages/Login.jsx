import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("SIGN UP");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      //this will send cookies
      axios.defaults.withCredentials = true;

      if (state === "SIGN UP") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            {state === "SIGN UP"
              ? "CREATE NEW ACCOUNT"
              : "LOGIN TO YOUR ACCOUNT"}
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            {state === "SIGN UP" && (
              <div>
                {" "}
                <label className="block text-md text-black font-bold">
                  Name
                </label>
                <div className="flex outline-1 rounded items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-7 ml-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter your Name"
                    className="mt-1 w-full px-4 py-2 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-md text-black font-bold">
                Email
              </label>
              <div className="flex outline-1 rounded items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7 ml-4"
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
                  className="mt-1 w-full px-4 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-md text-black font-bold">
                Password
              </label>
              <div className="flex outline-1 rounded items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7 ml-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 outline-none"
                />
              </div>
            </div>
            {state === "LOGIN" && (
              <h1
                onClick={() => navigate("/reset-password")}
                className="text-md w-2xl text-center text-blue-900 cursor-pointer mb-3"
              >
                Forgot password?{" "}
              </h1>
            )}
            {state === "SIGN UP" && (
              <div>
                <label className="block text-md text-black font-bold">
                  Confirm Password
                </label>
                <div className="flex outline-1 rounded items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-7 ml-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    //                   value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-500 text-center text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
            >
              {state}
            </button>

            {state === "SIGN UP" ? (
              <p className=" text-gray-900 text-center text-lg">
                Already have an account?{" "}
                <span
                  onClick={() => setState("LOGIN")}
                  className="text-purple-900 cursor-pointer"
                >
                  LOGIN
                </span>{" "}
                here
              </p>
            ) : (
              <p
                className=" text-gray-900 text-center text-lg"
                onClick={() => setState("SIGN UP")}
              >
                Don't have an account?{" "}
                <span className="text-purple-900 cursor-pointer">Register</span>{" "}
                here
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
