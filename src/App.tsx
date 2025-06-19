import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import Location from "./components/Location";
import RestaurantResultCard from "./components/RestaurantResultCard";
import RestaurantResultCardSkeleton from "./components/RestaurantResultCardSkeleton";
import RestaurantSlotSpinner from "./components/RestaurantSlotSpinner";
import { Button } from "./components/ui/Button";
import ConfettiCelebration from "./components/ui/ConfettiCelebration";
import ErrorDisplay from "./components/ui/ErrorDisplay";
import useFiltersStore from "./store/useFiltersStore";

function App() {
  const fetchRestaurants = useFiltersStore((state) => state.fetchRestaurants);
  const pickNewRandom = useFiltersStore((state) => state.pickNewRandom);
  const settleRestaurant = useFiltersStore((state) => state.settleRestaurant);
  const currentRestaurant = useFiltersStore((state) => state.currentRestaurant);
  const isLoading = useFiltersStore((state) => state.isLoading);
  const isLocating = useFiltersStore((state) => state.isLocating);
  const isSpinning = useFiltersStore((state) => state.isSpinning);
  const error = useFiltersStore((state) => state.error);
  const restaurants = useFiltersStore((state) => state.restaurants);
  const latitude = useFiltersStore((state) => state.latitude);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFindRestaurant = () => {
    setShowConfetti(false);
    fetchRestaurants();
  };

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        settleRestaurant();
        setShowConfetti(true);
      }, 3000); // Let it spin for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isSpinning, settleRestaurant]);

  const isNoResultsError =
    error === "No restaurants match your criteria. Try expanding your search.";

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-animated-gradient bg-400% animate-gradient-flow">
      <ConfettiCelebration active={showConfetti} />
      <div className="w-full max-w-lg mx-auto">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-animated-text-gradient bg-400% animate-text-gradient-flow bg-clip-text text-transparent">
            Restaurant Roulette
          </h1>
          <p className="text-gray-400 mt-2">
            No more 'I don't know, what do you want?'
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {/* Section 1: Location */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">
              1. Where are you?
            </h2>
            <Location />
          </section>

          <hr className="border-gray-700" />

          {/* Section 2: Preferences */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">
              2. What are you feeling?
            </h2>
            <Filters />
          </section>

          <hr className="border-gray-700" />

          {/* Section 3: Action */}
          <section className="pt-4">
            <div className="perspective-1000">
              <Button
                onClick={handleFindRestaurant}
                className="w-full text-2xl tracking-widest font-bold"
                size="lg"
                disabled={isLoading || isLocating || isSpinning || !latitude}
                whileTap={{ scale: 0.9, y: 5, rotateX: 15 }}
              >
                {isLocating
                  ? "LOCATING..."
                  : isLoading
                  ? "LOADING..."
                  : isSpinning
                  ? "SPINNING..."
                  : "SPIN"}
              </Button>
            </div>
            {!latitude && !isLocating && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Please provide your location to start a search.
              </p>
            )}
          </section>
        </div>

        {/* Section 4: Result */}
        <footer className="mt-10 text-center text-gray-400 min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading && !error && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RestaurantResultCardSkeleton />
              </motion.div>
            )}

            {isSpinning && (
              <motion.div key="spinner">
                <RestaurantSlotSpinner />
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ErrorDisplay
                  message={error}
                  onRetry={isNoResultsError ? undefined : fetchRestaurants}
                />
              </motion.div>
            )}

            {currentRestaurant && !isLoading && !isSpinning && !error && (
              <motion.div
                key="result"
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <RestaurantResultCard restaurant={currentRestaurant} />
                <Button
                  onClick={pickNewRandom}
                  variant="secondary"
                  disabled={restaurants.length <= 1 || isSpinning}
                >
                  Try another
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      </div>
    </div>
  );
}

export default App;
