import { Card } from "./ui/Card";

const RestaurantResultCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <div className="w-full h-48 bg-gray-700 rounded-t-lg"></div>
      <div className="p-6 space-y-4">
        <div className="w-3/4 h-6 bg-gray-700 rounded"></div>
        <div className="w-1/2 h-5 bg-gray-700 rounded"></div>
        <div className="flex justify-between items-center">
          <div className="w-1/3 h-5 bg-gray-700 rounded"></div>
          <div className="w-1/4 h-5 bg-gray-700 rounded"></div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="w-20 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex justify-around pt-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantResultCardSkeleton;
