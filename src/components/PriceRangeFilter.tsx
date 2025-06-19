import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import SegmentedControl from "./ui/SegmentedControl";

const priceRanges = [
  { label: "$", value: "1" },
  { label: "$$", value: "2" },
  { label: "$$$", value: "3" },
  { label: "$$$$", value: "4" },
];

const PriceRangeFilter = () => {
  const selectedPrices = useFiltersStore((state) => state.priceRange);
  const togglePrice = useFiltersStore((state) => state.togglePrice);

  return (
    <FilterGroup label="Price Range">
      <div className="flex items-center justify-center">
        <SegmentedControl
          options={priceRanges}
          selectedValues={selectedPrices}
          onValueChange={togglePrice}
        />
      </div>
    </FilterGroup>
  );
};

export default PriceRangeFilter;
