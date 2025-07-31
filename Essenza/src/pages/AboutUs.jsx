function AboutUs() {
  return (
    <div className="w-screen h-screen  px-10">
    <div className="flex flex-wrap ">
      <div className="w-1/2">
        <h1 className="font-bold text-center">ABOUT US</h1>
        <h3 className="mt-3 text-center text-xl">
          {" "}
          Welcome to <span className="font-bold ">Salon ESSENZA</span>, where
          beauty meets passion. Established in the heart of the city, our salon
          is dedicated to providing an exceptional and personalized experience
          for every client.
        </h3>

        <h2 className="font-bold text-xl mt-4"> Innovation</h2>
        <p className="text-lg">
          {" "}
          At <span className="font-bold">Salon Essenza</span>, we pioneer
          innovative techniques and styles, ensuring that we stay ahead of
          industry trends while catering to the unique preferences of our
          clients.
        </p>
        <h2 className="font-bold mt-4 text-xl"> Customer-Centric</h2>
        <p className="text-lg">
          {" "}
          Our commitment to clients is unwavering, as we strive to deliver not
          just services, but memorable experiences that leave you feeling
          refreshed and beautiful.
        </p>
        <h2 className="font-bold mt-4 text-xl"> Expertise</h2>
        <p className="text-lg">
          Our team consists of seasoned professionals with years of experience
          in the beauty industry, continually updating their knowledge to bring
          you the best.
        </p>
        <h2 className="font-bold mt-4 text-xl"> Integrity</h2>
        <p className="text-lg">
          {" "}
          We value transparency and honesty, ensuring that our clients are
          informed and satisfied with every aspect of their visit to{" "}
          <span className="font-bold">Salon Bliss</span>.
        </p>
      </div>

      <div className="hidden md:block w-1/2">
        <img src="/aboutUs.png" className="h-150"></img>
      </div>
      </div>
    </div>
  );
}

export default AboutUs;
