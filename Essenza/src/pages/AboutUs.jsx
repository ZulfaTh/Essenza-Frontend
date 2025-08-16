function AboutUs() {
  return (
    <div className="w-screen min-h-screen px-5 md:px-20 py-10 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left text-purple-600">
            ABOUT US
          </h2>

          <p className="text-lg md:text-xl text-center md:text-left">
            Welcome to <span className="font-semibold">Salon ESSENZA</span>, where beauty meets passion. Established in the heart of the city, our salon is dedicated to providing an exceptional and personalized experience for every client.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-purple-500 font-bold text-xl mb-2">Innovation</h3>
              <p>
                At <span className="font-semibold">Salon Essenza</span>, we pioneer innovative techniques and styles, staying ahead of trends while catering to your unique preferences.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-purple-500 font-bold text-xl mb-2">Customer-Centric</h3>
              <p>
                Our commitment is unwavering. We deliver memorable experiences that leave you refreshed and beautiful.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-purple-500 font-bold text-xl mb-2">Expertise</h3>
              <p>
                Our team has years of experience in the beauty industry, continually updating skills to bring you the best.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-purple-500 font-bold text-xl mb-2">Integrity</h3>
              <p>
                We value honesty and transparency, ensuring you are informed and satisfied with every visit to <span className="font-semibold">Salon Essenza</span>.
              </p>
            </div>

          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2">
          <img src="/aboutUs.png" className="rounded-2xl shadow-2xl" alt="Salon Essenza" />
        </div>

      </div>
    </div>
  );
}

export default AboutUs;
