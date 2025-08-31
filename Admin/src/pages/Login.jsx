import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { StaffContext } from "../context/StaffContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setSToken } = useContext(StaffContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/staff/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("sToken", data.token);
          setSToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded text-sm shadow-2xl">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-purple-600">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="border w-full rounded p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="border w-full rounded p-2 mt-1"
          />
        </div>
        <button className="bg-purple-600 text-white w-full py-2 rounded text-base cursor-pointer">
          Login
        </button>

        {state === "Admin" ? (
          <p className=" text-gray-900 text-center text-md">
            Login as Staff ?{" "}
            <span
              className="text-purple-900 cursor-pointer"
              onClick={() => setState("Staff")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className=" text-gray-900 text-center text-md">
            Login as Admin ?{" "}
            <span
              className="text-purple-900 cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
