import { motion } from "framer-motion";
import { wonders, type Wonder } from "@/data/wonders";

interface WonderLabelsProps {
  onSelect: (wonder: Wonder) => void;
  visible: boolean;
}

export default function WonderLabels({ onSelect, visible }: WonderLabelsProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
    >
      <div className="flex flex-wrap items-center justify-center gap-2 px-4">
        {wonders.map((wonder, i) => (
          <motion.button
            key={wonder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            onClick={() => onSelect(wonder)}
            className="rounded-full border border-primary/20 bg-background/40 px-4 py-2 font-body text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary md:text-sm"
          >
            {wonder.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
