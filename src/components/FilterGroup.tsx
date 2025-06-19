import type { PropsWithChildren } from "react";

interface FilterGroupProps {
  label: string;
  className?: string;
}

const FilterGroup = ({
  label,
  className,
  children,
}: PropsWithChildren<FilterGroupProps>) => {
  return (
    <div className={`flex flex-col space-y-3 px-2 ${className}`}>
      <label className="text-lg font-medium text-gray-100">{label}</label>
      {children}
    </div>
  );
};

export default FilterGroup;
