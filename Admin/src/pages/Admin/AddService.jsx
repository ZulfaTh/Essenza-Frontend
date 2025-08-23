import React, { useContext, useState } from "react";
import profile from "../../assets/profile.jpg";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddService = () => {
  const [serviceImg, setServiceImg] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("1 Hour");
  const [about, setAbout] = useState("");


  const {backendUrl,aToken} =useContext(AdminContext)

  const onSubmitHandler = async (event) =>{
    event.preventDefault()

    try {
      
      if(!serviceImg){
        return toast.error('Image not selected')
      }

      const formData = new FormData()

      formData.append('image',serviceImg)
      formData.append('name',name)
      formData.append('price',price)
      formData.append('duration',duration)
      formData.append('about',about)
      

      //console log form data
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-service',formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setServiceImg(false)
        setName('')
        setPrice('')
        setDuration('')
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
      {/* title */}
      <p className="mb-3 text-lg font-medium ">Add Service</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* image */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="service-img">
            <img
              src={serviceImg ? URL.createObjectURL(serviceImg) : profile}
              alt="profile img"
              className="w-20 h-20 bg-gray-100 cursor-pointer rounded-full"
            />
          </label>{" "}
          <input
            onChange={(e) => setServiceImg(e.target.files[0])}
            type="file"
            id="service-img"
            hidden
          />
          <p>
            Upload Service <br /> image
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Service name</p>
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
              <p>Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Price"
                required
              />
            </div>

        

            <div className="flex-1 flex flex-col gap-1">
              <p>Duration </p>
              <select
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Hour">1 Hour</option>
                 <option value="1.5 Hour">1.5 Hour</option>
                <option value="2 Hour">2 Hour</option>
                 <option value="2.5 Hour">2.5 Hour</option>
                <option value="3 Hour">3 Hour</option>
                 <option value="3.5 Hour">3 Hour</option>
                <option value="4 Hour">4 Hour</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p> About Service </p>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="border rounded px-3 py-2"
                placeholder="Write about service"
                rows={5}
                required
              />
            </div>

           

            <button type="submit" className="bg-purple-500 text-white px-10 py-3 mt-4 cursor-pointer">
              Add Service
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddService;
