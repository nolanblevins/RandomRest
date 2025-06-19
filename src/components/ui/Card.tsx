import { type HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gray-700 p-8 rounded-xl shadow-md ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };
