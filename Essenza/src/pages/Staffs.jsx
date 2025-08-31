import { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import ReviewsSlider from "./ReviewSlider";

function Staffs() {
  const { staffs, getStaffsData, isLoggedin } = useContext(AppContent);

  const navigate = useNavigate();

  // Fetch staff data when component mounts
  useEffect(() => {
    getStaffsData();
  }, [getStaffsData]);

  return (
    <>
      <div className="w-screen flex justify-center pt-5">
        <div className=" overflow-x-auto p-6">
          <div className="flex gap-5">
            {staffs && staffs.length > 0 ? (
              staffs.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[350px] p-5 bg-purple-200 rounded shadow-xl flex flex-col items-center space-y-3 ani"
                >
                  <img
                    className="border-2 border-purple-600 w-60 h-[200px] object-cover rounded  hover:scale-110"
                    src={item.image}
                    alt={item.name || "Staff"}
                  />

                  <p className="text-lg font-bold">{item.name}</p>
                  <div className="flex gap-2">
                    <p className="text-gray-600 text-center">
                      {item.speciality}
                    </p>
                    <button className="py-0.5 px-2 border text-xs rounded-full">
                      {item.experience}
                    </button>
                  </div>

                  {isLoggedin ? (
                    item.available ? (
                      <button
                        onClick={() => navigate(`/staff/${item._id}`)}
                        className="font-bold px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow-lg hover:scale-105 transition"
                      >
                        Availability
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-white rounded shadow-lg px-6 py-2">
                        Not Available
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-blue-500 text-white rounded shadow-lg px-6 py-2 hover:scale-105 transition"
                    >
                      Login to check availability
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No staff available.</p>
            )}
          </div>
        </div>
      </div>

      <ReviewsSlider />
    </>
  );
}

export default Staffs;
