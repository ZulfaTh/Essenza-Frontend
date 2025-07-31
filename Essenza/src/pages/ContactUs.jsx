
import Footer from "../components/Footer";

function ContactUs() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-5">Contact Us</h1>
      <div className="w-screen  px-60">
        <div className=" bg-purple-200 shadow-xl flex">
          <div className="w-1/2 p-6">
            <label>Name</label>
            <br />
            <input type="text" className="w-full  shadow-lg bg-purple-300" />

            <label>Email</label>
            <br />
            <input type="email" className="w-full shadow-lg bg-purple-300" />

            <label>Message</label>
            <br />
            <textarea type="text" className="w-full h-40 shadow-lg bg-purple-300" />

            <button type="submit" className="">
              Submit
            </button>
          </div>
          <div className="w-1/2 py-2 px-2">
            <img src="/location.jpg" className="" />
          </div>
        </div>
      </div>

    
    </>
  );
}

export default ContactUs;
