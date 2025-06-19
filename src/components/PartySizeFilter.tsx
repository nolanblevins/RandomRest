import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { Button } from "./ui/Button";

const PartySizeFilter = () => {
  const partySize = useFiltersStore((state) => state.partySize);
  const setPartySize = useFiltersStore((state) => state.setPartySize);

  const handleIncrement = () => {
    setPartySize(Math.min(partySize + 1, 10));
  };

  const handleDecrement = () => {
    setPartySize(Math.max(partySize - 1, 1));
  };

  return (
    <FilterGroup label="Party Size">
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDecrement}
          aria-label="Decrease party size"
        >
          -
        </Button>
        <span className="text-xl font-semibold w-10 text-center">
          {partySize}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleIncrement}
          aria-label="Increase party size"
        >
          +
        </Button>
      </div>
    </FilterGroup>
  );
};

export default PartySizeFilter;
