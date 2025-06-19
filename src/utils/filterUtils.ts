import type { YelpBusiness } from "../types/restaurant";

export const filterRestaurantsClientSide = (
  restaurants: YelpBusiness[],
  filters: {
    cuisineExclusions: string[];
  }
): YelpBusiness[] => {
  let filteredRestaurants = [...restaurants];

  // 1. Filter by Cuisine Exclusions
  if (filters.cuisineExclusions.length > 0) {
    const excludedAliases = new Set(filters.cuisineExclusions);
    filteredRestaurants = filteredRestaurants.filter((restaurant) => {
      return !restaurant.categories.some((category) =>
        excludedAliases.has(category.alias)
      );
    });
  }

  // Future client-side filters can be added here...

  return filteredRestaurants;
};
