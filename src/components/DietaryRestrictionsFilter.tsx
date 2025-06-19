import useFiltersStore from "../store/useFiltersStore";
import FilterGroup from "./FilterGroup";
import { Chip } from "./ui/Chip";

const dietaryOptions = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-Free", value: "gluten_free" },
  { label: "Dairy-Free", value: "dairy_free" },
  { label: "Nut-Free", value: "nut_free" },
  { label: "Keto", value: "keto" },
  { label: "Paleo", value: "paleo" },
  { label: "Halal", value: "halal" },
  { label: "Kosher", value: "kosher" },
  { label: "Low-Sodium", value: "low_sodium" },
];

const DietaryRestrictionsFilter = () => {
  const selectedOptions = useFiltersStore((state) => state.dietaryRestrictions);
  const toggleOption = useFiltersStore(
    (state) => state.toggleDietaryRestriction
  );

  return (
    <FilterGroup label="Dietary Restrictions">
      <div className="flex flex-wrap justify-center gap-2">
        {dietaryOptions.map(({ label, value }) => (
          <Chip
            key={value}
            variant={selectedOptions.includes(value) ? "selected" : "default"}
            onClick={() => toggleOption(value)}
            aria-pressed={selectedOptions.includes(value)}
          >
            {label}
          </Chip>
        ))}
      </div>
    </FilterGroup>
  );
};

export default DietaryRestrictionsFilter;
