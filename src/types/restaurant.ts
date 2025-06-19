export interface YelpCategory {
  alias: string;
  title: string;
}

export interface YelpCoordinates {
  latitude: number;
  longitude: number;
}

export interface YelpLocation {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface YelpBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: YelpCategory[];
  rating: number;
  coordinates: YelpCoordinates;
  transactions: string[]; // e.g., ['pickup', 'delivery']
  price: string; // e.g., '$$'
  location: YelpLocation;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface YelpSearchResult {
  total: number;
  businesses: YelpBusiness[];
  region: {
    center: YelpCoordinates;
  };
}
