import React, { useState, useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";

const ReviewsSlider = () => {
  const { reviews, getReviews } = useContext(AppContent);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getReviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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

  if (reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <div className="p-20">
      <h2 className="text-xl text-center  font-bold mb-4">Customer Reviews</h2>
      <div className="relative">
        <div className="p-5 bg-gray-300 rounded shadow-xl">
          <h3 className="font-semibold text-center ">
            {reviews[currentIndex].userId.name}
          </h3>

          <p className="flex items-center justify-center">
            {renderStars(reviews[currentIndex].rating)}
          </p>
          <p className="text-md text-center">{reviews[currentIndex].comment}</p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ReviewsSlider;
