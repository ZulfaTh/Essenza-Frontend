import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";

const PaymentPage = () => {
  const { backendUrl, currencySymbol } = useContext(AppContent);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));
  const [loading, setLoading] = useState(false);

  if (!bookingInfo) {
    toast.error("Booking info not found.");
    setTimeout(() => navigate("/booking"), 0);
    return null;
  }

  // Always full amount
  const payAmount = Math.round(bookingInfo.totalAmount * 100);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/payment/process", {
        amount: payAmount,
      });
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: bookingInfo.userName,
            email: bookingInfo.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        sessionStorage.removeItem("bookingInfo");
        navigate("/confirm", {
          state: {
            booking: bookingInfo,
            amountPaid: (payAmount / 100),
          },
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* --- Booking Summary --- */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold mb-2">Booking Summary</h2>
          <p>
            <span className="font-semibold">Staff:</span>{" "}
            {bookingInfo.staffName}
          </p>
          <p className="font-semibold">Services:</p>
          <ul className="list-disc list-inside text-gray-700">
            {bookingInfo.serviceData?.map((s, i) => (
              <li key={i}>
                {s.name} - {currencySymbol}.{s.price}
              </li>
            ))}
          </ul>

          <p>
            <span className="font-semibold">Total Amount:</span>{" "}
            {currencySymbol}.{bookingInfo.totalAmount}
          </p>
        </div>

        {/* --- Payment Form --- */}
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="border p-3 rounded">
            <label className="block mb-2 font-semibold">Card Number</label>
            <CardNumberElement className="p-2 border rounded w-full" />
          </div>

          <div className="flex gap-3">
            <div className="border p-3 rounded w-1/2">
              <label className="block mb-2 font-semibold">Expiry</label>
              <CardExpiryElement className="p-2 border rounded w-full" />
            </div>
            <div className="border p-3 rounded w-1/2">
              <label className="block mb-2 font-semibold">CVC</label>
              <CardCvcElement className="p-2 border rounded w-full" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? "Processing..."
              : `Pay ${currencySymbol}.${bookingInfo.totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
