import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import Staffs from "./pages/Staffs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";

import UserProfile from "./pages/UserProfile";

import BookingForm from "./pages/BookingForm";
import PaymentPage from "./pages/PaymentPage";

import ConfirmPage from "./pages/ConfirmPage";

import { ToastContainer } from "react-toastify";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StaffAvailability from "./pages/StaffAvailability";
import StaffReviews from "./pages/StaffReviews";
import ReviewsSlider from "./pages/ReviewSlider";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get(
        "http://localhost:8080/api/payment/stripeapi"
      );

      console.log("Stripe API Response:", data);
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/login" element={<Login />} />

        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/profile" element={<UserProfile />} />

        <Route path="/staff/:staffId" element={<StaffAvailability />} />

        <Route path="/booking" element={<BookingForm />} />

        <Route
          path="/payment"
          element={
            stripeApiKey ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentPage />
              </Elements>
            ) : (
              <div className="p-6 text-center">Loading Payment Gateway...</div>
            )
          }
        />

        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/reviews" element={<StaffReviews />} />
         <Route path="/reviewss" element={<ReviewsSlider />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
