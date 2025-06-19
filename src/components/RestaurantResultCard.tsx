import type { YelpBusiness } from "../types/restaurant";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";
import { StarRating } from "./ui/StarRating";

interface RestaurantResultCardProps {
  restaurant: YelpBusiness;
}

const RestaurantResultCard = ({ restaurant }: RestaurantResultCardProps) => {
  const distanceInMiles = (restaurant.distance / 1609.34).toFixed(1);

  // Helper to create tags for key features
  const getFeatureTags = () => {
    const tags = new Set<string>();
    restaurant.transactions.forEach((t) => {
      if (t === "delivery") tags.add("Delivery");
      if (t === "pickup") tags.add("Takeout");
    });
    restaurant.categories.forEach((c) => {
      if (["vegetarian", "vegan", "gluten_free"].includes(c.alias)) {
        tags.add(c.title);
      }
    });
    return Array.from(tags);
  };

  const featureTags = getFeatureTags();
  const addressQuery = encodeURIComponent(
    restaurant.location.display_address.join(", ")
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  return (
    <Card className="text-left">
      {restaurant.image_url && (
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-xl -mt-6 -mx-6 mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400 mb-4">
        <StarRating rating={restaurant.rating} />
        <span>({restaurant.review_count} reviews)</span>
        <span>{restaurant.price}</span>
        <span>{distanceInMiles} mi away</span>
      </div>

      <div className="space-y-3 text-gray-300">
        <div className="flex items-center">
          {/* Address Icon */}
          <svg
            className="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{restaurant.location.display_address.join(", ")}</span>
        </div>
        {restaurant.display_phone && (
          <div className="flex items-center">
            {/* Phone Icon */}
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a href={`tel:${restaurant.phone}`} className="hover:underline">
              {restaurant.display_phone}
            </a>
          </div>
        )}
      </div>

      {featureTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {featureTags.map((tag) => (
            <Chip key={tag} size="sm" className="bg-gray-800">
              {tag}
            </Chip>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-600 flex justify-between items-center gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="secondary" className="w-full">
            Directions
          </Button>
        </a>
        {restaurant.phone && (
          <a href={`tel:${restaurant.phone}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              Call
            </Button>
          </a>
        )}
        <a
          href={restaurant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="secondary" className="w-full">
            Website
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default RestaurantResultCard;
