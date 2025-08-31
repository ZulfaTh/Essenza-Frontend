import { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";


function Services() {
  const { services, getServicesData, currencySymbol } = useContext(AppContent);

  useEffect(() => {
    getServicesData();
  }, [getServicesData]);

  return (
    <div className="w-screen h-screen flex justify-center pt-5">
      <div className="overflow-y-auto p-6">
        <div className="flex flex-wrap gap-5 justify-center">
        {services && services.length > 0 ? (
  services
    .filter((item) => item.available)
    .map((item, index) => (
      <div
        key={index}
        className="w-[250px] p-5 bg-purple-200 rounded shadow-xl flex flex-col items-center space-y-3 ani"
      >
        <img
          className="border-2 border-purple-600 w-60 h-[200px] object-cover rounded hover:scale-110"
          src={item.image}
          alt={item.name || "Service"}
        />
        <p className="text-lg font-bold">{item.name}</p>
        <p className="text-md">{item.about}</p>
        <p className="text-gray-600 text-center">
          Estimated time : {item.duration}
        </p>
        <p>
          {currencySymbol} {item.price}
        </p>
      </div>
    ))
) : (
  <p className="text-center text-gray-500">No service available.</p>
)}

        </div>
      </div>
    </div>
  );
}

export default Services;
