import React, { useContext, useEffect, useState } from "react";
import { StaffContext } from "../../context/StaffContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const StaffProfile = () => {
  const { backendUrl , sToken, profileData, setProfileData, getProfileData } =
    useContext(StaffContext);


  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        available:profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/staff/update-profile',updateData,{headers:{sToken}})

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if (sToken) {
      getProfileData();
    }
  }, [sToken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img className="w-full sm:max-w-64 rounded-lg" src={profileData.image} />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-purple-300"> 
            {/* name,experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <p className="text-lg">{profileData.speciality}</p>
              <button className="py-0.5 px-2 border tex-xs rounded">{profileData.experience}</button>
            </div>

            {/* about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-3">{profileData.about}</p>
            </div>

            <div className="flex gap-1 pt-2">
              <input onChange={()=> isEdit && setProfileData(prev => ({...prev,available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
              <label htmlFor="">Available</label>
            </div>

            {
              isEdit
              ?  <button onClick={updateProfile} className="px-4 p-1 bg-purple-500 rounded hover:bg-purple-700 text-white cursor-pointer">Save</button>
              : <button onClick={()=>setIsEdit(true)} className="px-4 p-1 bg-purple-500 rounded hover:bg-purple-700 text-white cursor-pointer">Edit</button>
            }

           

            

          </div>
        </div>
      </div>
    )
  );
};

export default StaffProfile;
