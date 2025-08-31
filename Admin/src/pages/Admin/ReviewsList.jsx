import { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import CardLayout from "../../components/CardLayout";
import { AppContext } from "../../context/AppContext";

const ReviewsList = () => {
  const { aToken, reviews, getAllReviews } = useContext(AdminContext);
  const { renderStars } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllReviews();
    }
  }, [aToken]);

  return (
    <CardLayout
      title="Reviews"
      items={reviews}
      renderItem={(review) => (
        <div className="flex flex-col justify-between h-full p-4 bg-purple-200 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          {/* Stars */}
          <div className="flex justify-center mb-2">
            {renderStars(review.rating)}
          </div>

          {/* Comment */}
          <p className="text-gray-800 text-sm mb-3 line-clamp-3">
            "{review.comment}"
          </p>

          {/* User and Staff Info */}
          <div className="text-center space-y-1 mb-2">
            <p className="text-gray-700 font-medium">
              User: {review.userId?.name || "Unknown"}
            </p>
            <p className="text-gray-500 text-xs">
              ({review.userId?.email || "No Email"})
            </p>
            <p className="text-gray-700 font-medium">
              Staff: {review.staffId?.name || "Unknown"}
            </p>
          </div>

          {/* Date */}
          <p className="text-gray-400 text-xs text-center">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    />
  );
};

export default ReviewsList;
