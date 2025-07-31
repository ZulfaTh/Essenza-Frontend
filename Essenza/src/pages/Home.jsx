import {useNavigate} from "react-router-dom";

export default function Home() {

  const navigate=useNavigate();

  const handleClick=()=>{
    navigate ("/login");
  };
  return (
    <>
      <div className="relative w-screen h-screen bg-[url('/salon.jpg')] bg-cover bg-no-repeat bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text on top */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-['Alfa-Slab-One'] text-4xl font-bold mb-4">
            ELEVATE YOUR EVERYDAY LOOK
          </h1>
          <h2 className="font-['Aclonica'] text-white text-xl">
            Find, Book, Indulge in Exceptional Beauty Care
          </h2>
          <button onClick={handleClick} className="text-sm mt-4">BOOK YOUR APPOINTMENTS NOW</button>
        </div>
      </div>
    </>
  );
}
