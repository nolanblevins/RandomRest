import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { Chip } from "./ui/Chip";

// Simple SVG Icons
const DineInIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 3a1 1 0 011 1v5h3a1 1 0 110 2h-3v5a1 1 0 11-2 0v-5H6a1 1 0 110-2h3V4a1 1 0 011-1z" />
  </svg>
);

const TakeoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z"
      clipRule="evenodd"
    />
  </svg>
);

const DeliveryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path
      fillRule="evenodd"
      d="M3 4a2 2 0 012-2h10a2 2 0 012 2v5h-1.5a2.5 2.5 0 00-5 0H4.5a2.5 2.5 0 00-2.48 2.01L1 14.53A2.5 2.5 0 003.5 17H6a3 3 0 006 0h2.5a.5.5 0 00.5-.5V4zM5 6a1 1 0 100 2h10a1 1 0 100-2H5z"
      clipRule="evenodd"
    />
  </svg>
);

const diningOptions = [
  { label: "Dine-in", value: "restaurant_reservation", icon: DineInIcon },
  { label: "Takeout", value: "pickup", icon: TakeoutIcon },
  { label: "Delivery", value: "delivery", icon: DeliveryIcon },
];

const DiningOptionsFilter = () => {
  const selectedOptions = useFiltersStore((state) => state.diningOptions);
  const toggleOption = useFiltersStore((state) => state.toggleDiningOption);

  return (
    <FilterGroup label="Dining Options">
      <div className="flex items-center justify-around">
        {diningOptions.map(({ label, value, icon }) => (
          <Chip
            key={value}
            variant={selectedOptions.includes(value) ? "selected" : "default"}
            onClick={() => toggleOption(value)}
            aria-pressed={selectedOptions.includes(value)}
            className="w-28 flex items-center justify-center gap-2 py-3"
          >
            {icon}
            <span className="text-sm">{label}</span>
          </Chip>
        ))}
      </div>
    </FilterGroup>
  );
};

export default DiningOptionsFilter;
