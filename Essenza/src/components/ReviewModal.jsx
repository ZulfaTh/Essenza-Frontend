import { useContext, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const ReviewModal = ({
  appointmentId,
  staffId,
  userId,
  onClose,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { backendUrl} = useContext(AppContent);

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a rating");

    try {
      const { data } = await axios.post(backendUrl + 
       '/api/reviews/add-review',
        { appointmentId, staffId, userId, rating, comment }
      );

      if (data.success) {
        toast.success(data.message || "Review submitted successfully");
        onClose();
        onReviewSubmitted?.();
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-2xl p-8 w-96 shadow-2xl relative animate-fadeIn">

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6 text-center">
          Rate Your Experience
        </h2>

        {/* Rating */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={i < rating ? "gold" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gold"
              className="w-8 h-8 cursor-pointer transition duration-200 hover:scale-110"
              key={i}
              onClick={() => setRating(i + 1)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          ))}
        </div>

        {/* Comment */}
        <textarea
          className="w-full border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-xl p-3 text-sm mb-6 resize-none outline-none"
          rows="4"
          placeholder="Write your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            Cancel
          </button>
          <button
            disabled={rating === 0}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-xl text-white font-semibold shadow-lg transition cursor-pointer
              ${
                rating === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              }`}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
