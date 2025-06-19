import { motion, type Variants } from "framer-motion";
import CuisineExclusionFilter from "./CuisineExclusionFilter";
import DietaryRestrictionsFilter from "./DietaryRestrictionsFilter";
import DiningOptionsFilter from "./DiningOptionsFilter";
import DistanceFilter from "./DistanceFilter";
import PartySizeFilter from "./PartySizeFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import StarRatingFilter from "./StarRatingFilter";
import { Card } from "./ui/Card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Filters = () => {
  return (
    <Card>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <PartySizeFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DistanceFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PriceRangeFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StarRatingFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DiningOptionsFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DietaryRestrictionsFilter />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CuisineExclusionFilter />
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default Filters;
