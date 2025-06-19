import type { YelpBusiness, YelpSearchResult } from "../types/restaurant";
import yelpApi from "../utils/api";

export interface SearchParams {
  latitude: number;
  longitude: number;
  radius: number; // in meters
  price?: string; // e.g., '1,2,3,4'
  rating?: number;
  limit?: number;
  offset?: number;
  categories?: string;
  transactions?: string;
}

export const searchRestaurants = async (
  params: SearchParams
): Promise<YelpSearchResult> => {
  try {
    const response = await yelpApi.get<YelpSearchResult>("/search", {
      params: {
        ...params,
        limit: params.limit || 50,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "API Error:",
        error.response.data.details || error.response.data
      );
      throw new Error(
        `API Error: ${error.response.data.error || "An unknown error occurred"}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error:", error.request);
      throw new Error("Network error: Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const fetchRandomRestaurant = async (
  params: SearchParams,
  total: number
): Promise<YelpBusiness | null> => {
  const maxOffset = Math.min(total - 1, 999); // Yelp's max offset is 1000
  const randomOffset = Math.floor(Math.random() * maxOffset);

  try {
    const response = await yelpApi.get<YelpSearchResult>("/businesses/search", {
      params: {
        ...params,
        limit: 1,
        offset: randomOffset,
      },
    });
    return response.data.businesses[0] || null;
  } catch {
    return null; // Return null on error to handle gracefully
  }
};
