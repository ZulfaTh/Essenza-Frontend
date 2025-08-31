import React, { useContext, useState } from "react";
import profile from "../../assets/profile.jpg";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddStaff = () => {
  const [staffImg, setStaffImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Haircut");

  const {backendUrl,aToken} =useContext(AdminContext)

  const onSubmitHandler = async (event) =>{
    event.preventDefault()

    try {
      
      if(!staffImg){
        return toast.error('Image not selected')
      }

      const formData = new FormData()

      formData.append('image',staffImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('about',about)
      formData.append('experience',experience)
      formData.append('speciality',speciality)

      //console log form data
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-staff',formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setStaffImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
    
      <p className="mb-3 text-lg font-medium ">Add Staff</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
       
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="staff-img">
            <img
              src={staffImg ? URL.createObjectURL(staffImg) : profile}
              alt="profile img"
              className="w-20 h-20 bg-gray-100 cursor-pointer rounded-full"
            />
          </label>{" "}
          <input
            onChange={(e) => setStaffImg(e.target.files[0])}
            type="file"
            id="staff-img"
            hidden
          />
          <p>
            Upload Staff <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Staff name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Staff Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Staff Password </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Staff Experience </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p> About Staff </p>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="border rounded px-3 py-2"
                placeholder="Write about staff"
                rows={5}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="Hair Specialists">Hair Specialist</option>
                <option value="Skin & Beauty Specialists">Skin & Beauty Specialist</option>
                <option value="Nail & Hand/Feet Specialists">Nail & Hand/Feet Specialist</option>
                <option value="Makeup Specialists">Makeup Specialist</option>
                 <option value="Spa & Wellness Specialists">Spa & Wellness Specialist</option>
              </select>
            </div>

            <button type="submit" className="bg-purple-500 text-white px-10 py-3 mt-4 cursor-pointer">
              Add Staff
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddStaff;
