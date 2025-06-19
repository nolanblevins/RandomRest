import { create } from "zustand";
import {
  type SearchParams,
  searchRestaurants,
} from "../services/restaurantService";
import type { YelpBusiness } from "../types/restaurant";
import { filterRestaurantsClientSide } from "../utils/filterUtils";

export interface FiltersState {
  // --- Filter Values ---
  latitude: number | null;
  longitude: number | null;
  partySize: number;
  distance: number; // in miles
  priceRange: string[];
  minRating: number;
  diningOptions: string[];
  dietaryRestrictions: string[];
  cuisineExclusions: string[];

  // --- API State ---
  restaurants: YelpBusiness[];
  currentRestaurant: YelpBusiness | null;
  isLoading: boolean;
  isLocating: boolean;
  isSpinning: boolean;
  error: string | null;

  // --- Actions ---
  setCoordinates: (lat: number, lon: number) => void;
  setIsLocating: (isLocating: boolean) => void;
  setPartySize: (size: number) => void;
  setDistance: (distance: number) => void;
  togglePrice: (price: string) => void;
  setMinRating: (rating: number) => void;
  toggleDiningOption: (option: string) => void;
  toggleDietaryRestriction: (restriction: string) => void;
  toggleCuisineExclusion: (cuisine: string) => void;
  fetchRestaurants: () => Promise<void>;
  pickNewRandom: () => void;
  settleRestaurant: () => void;
}

const useFiltersStore = create<FiltersState>((set, get) => ({
  // --- Initial Filter Values ---
  latitude: null,
  longitude: null,
  partySize: 2,
  distance: 10, // 10 miles
  priceRange: [],
  minRating: 0,
  diningOptions: [],
  dietaryRestrictions: [],
  cuisineExclusions: [],

  // --- Initial API State ---
  restaurants: [],
  currentRestaurant: null,
  isLoading: false,
  isLocating: false,
  isSpinning: false,
  error: null,

  // --- Actions ---
  setCoordinates: (latitude, longitude) =>
    set({ latitude, longitude, isLocating: false }),
  setIsLocating: (isLocating) => set({ isLocating }),
  setPartySize: (size) => set({ partySize: size }),
  setDistance: (distance) => set({ distance }),
  togglePrice: (price) =>
    set((state) => ({
      priceRange: state.priceRange.includes(price)
        ? state.priceRange.filter((p) => p !== price)
        : [...state.priceRange, price],
    })),
  setMinRating: (rating) => set({ minRating: rating }),
  toggleDiningOption: (option) =>
    set((state) => ({
      diningOptions: state.diningOptions.includes(option)
        ? state.diningOptions.filter((o) => o !== option)
        : [...state.diningOptions, option],
    })),
  toggleDietaryRestriction: (restriction) =>
    set((state) => ({
      dietaryRestrictions: state.dietaryRestrictions.includes(restriction)
        ? state.dietaryRestrictions.filter((r) => r !== restriction)
        : [...state.dietaryRestrictions, restriction],
    })),
  toggleCuisineExclusion: (cuisine) =>
    set((state) => ({
      cuisineExclusions: state.cuisineExclusions.includes(cuisine)
        ? state.cuisineExclusions.filter((c) => c !== cuisine)
        : [...state.cuisineExclusions, cuisine],
    })),

  fetchRestaurants: async () => {
    const {
      latitude,
      longitude,
      distance,
      priceRange,
      minRating,
      diningOptions,
      dietaryRestrictions,
      cuisineExclusions,
    } = get();

    if (!latitude || !longitude) {
      set({ error: "Please provide a location first." });
      return;
    }

    set({ isLoading: true, error: null, currentRestaurant: null });

    try {
      const searchParams: SearchParams = {
        latitude,
        longitude,
        radius: Math.min(Math.round(distance * 1609.34), 40000), // Cap at 40km
        rating: minRating > 0 ? minRating : undefined,
      };

      if (priceRange.length > 0) {
        searchParams.price = priceRange.join(",");
      }

      if (dietaryRestrictions.length > 0) {
        searchParams.categories = dietaryRestrictions.join(",");
      }

      if (diningOptions.length > 0) {
        searchParams.transactions = diningOptions.join(",");
      }

      // First, get the full list to know the total
      const initialResult = await searchRestaurants(searchParams);

      // Defensively check if the API response is valid
      if (!initialResult || !Array.isArray(initialResult.businesses)) {
        console.error("Invalid API response received:", initialResult);
        set({
          error: "The API returned an unexpected response. Please try again.",
          isLoading: false,
          restaurants: [],
        });
        return;
      }

      // Apply client-side filtering
      const filteredBusinesses = filterRestaurantsClientSide(
        initialResult.businesses,
        { cuisineExclusions }
      );

      if (filteredBusinesses.length === 0) {
        set({
          error:
            "No restaurants match your criteria. Try expanding your search.",
          isLoading: false,
          restaurants: [],
        });
        return;
      }

      // If we have results, start the spinning animation
      set({
        restaurants: filteredBusinesses,
        isLoading: false,
        isSpinning: true,
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false, restaurants: [] });
    }
  },

  pickNewRandom: () => {
    const { restaurants, currentRestaurant } = get();
    if (restaurants.length <= 1) return;

    let newRestaurant;
    do {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      newRestaurant = restaurants[randomIndex];
    } while (newRestaurant.id === currentRestaurant?.id);

    set({ currentRestaurant: newRestaurant });
  },

  settleRestaurant: () => {
    const { restaurants } = get();
    if (!restaurants.length) return;

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];

    set({
      currentRestaurant: randomRestaurant,
      isSpinning: false,
    });
  },
}));

export default useFiltersStore;
