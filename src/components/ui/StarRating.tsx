import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";

const starIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

const starVariants = cva("transition-colors", {
  variants: {
    state: {
      empty: "text-gray-600",
      half: "text-yellow-500",
      full: "text-yellow-500",
    },
  },
});

interface StarRatingProps extends VariantProps<typeof starVariants> {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  onRatingChange,
  size = 24,
  className,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rate: number) => {
    if (onRatingChange) {
      // Allow deselecting by clicking the same star
      onRatingChange(rate === rating ? 0 : rate);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const currentRate = hoverRating || rating;
    let state: "full" | "half" | "empty" = "empty";
    if (i <= currentRate) {
      state = "full";
    } else if (i - 0.5 <= currentRate) {
      state = "half";
    }

    const starStyle = {
      width: size,
      height: size,
    };

    stars.push(
      <button
        key={i}
        onClick={() => handleStarClick(i)}
        onMouseEnter={() => setHoverRating(i)}
        onMouseLeave={() => setHoverRating(0)}
        className={`${starVariants({
          state,
        })} ${onRatingChange ? "cursor-pointer" : ""}`}
        style={starStyle}
        disabled={!onRatingChange}
        aria-label={`Set rating to ${i}`}
      >
        {starIcon}
      </button>
    );
  }

  return <div className={`flex items-center ${className}`}>{stars}</div>;
};

export { StarRating };
