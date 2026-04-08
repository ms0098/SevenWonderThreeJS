import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Sparkles } from "lucide-react";
import type { Wonder } from "@/data/wonders";

interface WonderPanelProps {
  wonder: Wonder;
  onBack: () => void;
}

export default function WonderPanel({ wonder, onBack }: WonderPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-0 z-20 flex h-full w-full flex-col overflow-y-auto bg-background/90 backdrop-blur-xl md:w-[480px]"
    >
      {/* Image */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden">
        <img
          src={wonder.image}
          alt={wonder.name}
          className="h-full w-full object-cover"
          width={896}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <button
          onClick={onBack}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/60 px-4 py-2 font-body text-sm font-medium text-primary backdrop-blur-md transition-colors hover:bg-background/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Globe
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-3xl font-bold text-gold-gradient md:text-4xl">
            {wonder.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {wonder.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {wonder.year}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-body text-base leading-relaxed text-secondary-foreground"
        >
          {wonder.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="rounded-lg border border-primary/20 bg-primary/5 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold text-primary">
              Did you know?
            </span>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {wonder.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
