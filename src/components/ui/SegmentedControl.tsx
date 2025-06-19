import { AnimatePresence, motion } from "framer-motion";

export interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  selectedValues: string[];
  onValueChange: (value: string) => void;
  className?: string;
}

const SegmentedControl = ({
  options,
  selectedValues,
  onValueChange,
  className = "",
}: SegmentedControlProps) => {
  return (
    <div
      className={`flex items-center space-x-1 bg-gray-800 p-1 rounded-lg ${className}`}
    >
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`relative flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
              isSelected ? "text-gray-900" : "text-gray-300 hover:text-white"
            }`}
            aria-pressed={isSelected}
          >
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  layoutId="segmented-control-active"
                  className="absolute inset-0 bg-gray-200 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
