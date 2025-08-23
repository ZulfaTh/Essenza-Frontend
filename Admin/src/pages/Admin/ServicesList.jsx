import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const ServicesList = () => {
  const { services, aToken, getAllServices,changeServiceAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllServices();
    }
  }, [aToken]);
  return (
    <div className="m-10 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Services</h1>
      <div className="w-full flex flex-wrap gap-10 pt-5 gap-y-6">
        {services.map((item, index) => (
          <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-indigo-50 group-hover:bg-purple-400 transition-all duration-500" src={item.image} alt="profile" />

            <div className="p-4 text-center">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
               <p className="text-neutral-800 text-sm">{item.duration}</p>
                <p className="text-neutral-800 text-sm">{item.price}</p>
                 <p className="text-neutral-800 text-sm">{item.about}</p>
               <div className="mt-2 flex justify-center items-center gap-1 text-sm ">
                <input onChange={()=>changeServiceAvailability(item._id)} type="checkbox" checked={item.available}/>
                <p>Available</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
