import { useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";

const StaffReviews = () => {
  const { reviews, getReviews } = useContext(AppContent);

  useEffect(() => {
    getReviews(); 
  }, []);

  

  // Helper to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i < rating ? "gold" : "none"}
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="gold"
        className="w-5 h-5 "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((item, index) => (
            <div
              key={item._id || index}
              className="p-4 border rounded-lg shadow"
            >
              <div className="flex items-center mb-2">
                {renderStars(item.rating)}
              </div>
              <p className="text-gray-700 mb-1">{item.comment}</p>
              <p className="text-sm text-gray-400 mb-1">
                by User: {item.userId.name}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffReviews;
