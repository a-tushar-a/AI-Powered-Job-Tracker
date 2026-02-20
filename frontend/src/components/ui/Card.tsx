import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Card = ({
  title,
  value,
  children,
  className,
}: {
  title: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className={cn(
        "bg-white dark:bg-dark-card rounded-lg shadow-soft p-6",
        className
      )}
    >
      <h3 className="text-neutral-500 dark:text-neutral-300 text-sm font-medium">
        {title}
      </h3>
      {value && (
        <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
          {value}
        </p>
      )}
      {children}
    </motion.div>
  );
};

export default Card;
