import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/booking");
  };

  const handleCreate = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="fixed inset-0 bg-[url('/salonBg.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs " />
        <div className="relative z-10 p-6 rounded   w-full max-w-md ">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            LOGIN TO YOUR ACCOUNT
          </h2>

          <form className="space-y-4">
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
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="relative left-30 text-sm text-center text-blue-900 cursor-pointer">
                Forgot password?{" "}
              </div>
            </div>

            <div
              type="submit"
              className="w-full bg-purple-500 text-center   text-white font-bold py-2 px-4 rounded-lg cursor-pointer "
              onClick={handleLogin}
            >
              LOGIN
            </div>
            <div
              type="submit"
              className="w-full bg-white  text-purple-500  text-center font-bold py-2 px-4 rounded-lg cursor-pointer"
              onClick={handleCreate}
            >
              CREATE ACCOUNT
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
