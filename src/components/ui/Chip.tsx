import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gray-800 text-gray-100 border border-gray-600 hover:bg-gray-700",
        selected:
          "bg-gray-200 text-gray-900 border border-gray-200 hover:bg-white",
      },
      size: {
        default: "h-8 px-4",
        sm: "h-7 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={chipVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
