import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { StarRating } from "./ui/StarRating";

const StarRatingFilter = () => {
  const minRating = useFiltersStore((state) => state.minRating);
  const setMinRating = useFiltersStore((state) => state.setMinRating);

  return (
    <FilterGroup label="Minimum Rating">
      <div className="flex flex-col items-center justify-center space-y-2">
        <StarRating
          rating={minRating}
          onRatingChange={setMinRating}
          size={32}
        />
        <span className="text-sm text-gray-400">
          {minRating > 0 ? `${minRating} stars and up` : "Any rating"}
        </span>
      </div>
    </FilterGroup>
  );
};

export default StarRatingFilter;
