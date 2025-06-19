import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { Slider } from "./ui/Slider";

const DistanceFilter = () => {
  const distance = useFiltersStore((state) => state.distance);
  const setDistance = useFiltersStore((state) => state.setDistance);

  return (
    <FilterGroup label="Distance Radius">
      <div className="flex flex-col items-center">
        <Slider
          value={[distance]}
          onValueChange={(value) => setDistance(value[0])}
          max={25}
          step={1}
          min={1}
          className="w-full"
          aria-label="Distance radius slider"
        />
        <span className="text-lg font-semibold mt-3">{distance} miles</span>
      </div>
    </FilterGroup>
  );
};

export default DistanceFilter;
