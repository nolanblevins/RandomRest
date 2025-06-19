import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useFiltersStore from "../store/useFiltersStore";
import { Card } from "./ui/Card";

const RestaurantSlotSpinner = () => {
  const restaurants = useFiltersStore((state) => state.restaurants);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (restaurants.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length);
      }, 150); // Speed of the spin

      return () => clearInterval(interval);
    }
  }, [restaurants.length]);

  if (!restaurants.length) {
    return null;
  }

  const displayedRestaurant = restaurants[currentIndex];

  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <AnimatePresence>
          <motion.div
            key={displayedRestaurant.id}
            className="absolute inset-0"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={displayedRestaurant.image_url}
              alt={displayedRestaurant.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-xl font-bold text-white">
                {displayedRestaurant.name}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default RestaurantSlotSpinner;
