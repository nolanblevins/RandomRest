import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { Chip } from "./ui/Chip";

const YELP_CUISINE_CATEGORIES = [
  { alias: "newamerican", title: "American (New)" },
  { alias: "tradamerican", title: "American (Traditional)" },
  { alias: "bbq", title: "Barbeque" },
  { alias: "breakfast_brunch", title: "Breakfast & Brunch" },
  { alias: "burgers", title: "Burgers" },
  { alias: "chinese", title: "Chinese" },
  { alias: "french", title: "French" },
  { alias: "greek", title: "Greek" },
  { alias: "indpak", title: "Indian" },
  { alias: "italian", title: "Italian" },
  { alias: "japanese", title: "Japanese" },
  { alias: "korean", title: "Korean" },
  { alias: "mediterranean", title: "Mediterranean" },
  { alias: "mexican", title: "Mexican" },
  { alias: "pizza", title: "Pizza" },
  { alias: "seafood", title: "Seafood" },
  { alias: "steak", title: "Steakhouses" },
  { alias: "sushi", title: "Sushi Bars" },
  { alias: "thai", title: "Thai" },
  { alias: "vietnamese", title: "Vietnamese" },
];

const CuisineExclusionFilter = () => {
  const cuisineExclusions = useFiltersStore((state) => state.cuisineExclusions);
  const toggleCuisineExclusion = useFiltersStore(
    (state) => state.toggleCuisineExclusion
  );

  return (
    <FilterGroup label="Exclude Cuisines">
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {YELP_CUISINE_CATEGORIES.map((cuisine) => {
          const isExcluded = cuisineExclusions.includes(cuisine.alias);
          return (
            <Chip
              key={cuisine.alias}
              variant={isExcluded ? "selected" : "default"}
              onClick={() => toggleCuisineExclusion(cuisine.alias)}
              aria-pressed={isExcluded}
            >
              {cuisine.title}
            </Chip>
          );
        })}
      </div>
    </FilterGroup>
  );
};

export default CuisineExclusionFilter;
