import { useState } from "react";
import useFiltersStore from "../store/useFiltersStore";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const Location = () => {
  const [feedback, setFeedback] = useState("");
  // Local error state for location-specific errors
  const [locationError, setLocationError] = useState<string | null>(null);

  const setCoordinates = useFiltersStore((state) => state.setCoordinates);
  const setIsLocating = useFiltersStore((state) => state.setIsLocating);
  const isLocating = useFiltersStore((state) => state.isLocating);

  const handleLocationRequest = () => {
    setIsLocating(true);
    setLocationError(null);
    setFeedback("");

    const options = {
      enableHighAccuracy: false,
      timeout: 10000, // 10 seconds
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords.latitude, position.coords.longitude);
        setFeedback("Location Acquired ✓");
        // isLocating will be set to false in the store's setCoordinates
      },
      (err) => {
        let errorMessage = "An unknown error occurred.";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable it in your browser settings.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        setLocationError(errorMessage);
        setIsLocating(false);
      },
      options
    );
  };

  return (
    <section className="w-full">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={feedback}
          readOnly
          placeholder="Let's find your location..."
          className="flex-grow italic text-gray-400"
        />
        <Button
          onClick={handleLocationRequest}
          disabled={isLocating}
          className="whitespace-nowrap"
        >
          {isLocating ? "Locating..." : "Use My Location"}
        </Button>
      </div>
      {locationError && (
        <p className="text-red-400 mt-2 text-sm text-center">{locationError}</p>
      )}
    </section>
  );
};

export default Location;
