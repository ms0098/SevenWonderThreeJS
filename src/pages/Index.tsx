import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Globe from "@/components/Globe";
import WonderPanel from "@/components/WonderPanel";
import WonderLabels from "@/components/WonderLabels";
import type { Wonder } from "@/data/wonders";

export default function Index() {
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const handleSelectWonder = useCallback((wonder: Wonder) => {
    setSelectedWonder(wonder);
    setIsTransitioning(true);
    // Show panel after globe has spun and moved
    setTimeout(() => {
      setIsTransitioning(false);
      setShowPanel(true);
    }, 1800);
  }, []);

  const handleBack = useCallback(() => {
    setShowPanel(false);
    // Small delay then clear wonder so globe lerps back to center
    setTimeout(() => {
      setSelectedWonder(null);
      setIsTransitioning(false);
    }, 400);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Globe
        selectedWonder={selectedWonder}
        isTransitioning={isTransitioning}
        onSelectWonder={handleSelectWonder}
      />

      {/* Title */}
      <AnimatePresence>
        {!selectedWonder && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center"
          >
            <h1 className="text-gold-gradient font-display text-3xl font-bold tracking-tight md:text-5xl">
              7 Wonders of the World
            </h1>
            <p className="mt-2 font-body text-sm text-muted-foreground md:text-base">
              Click a marker or label to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom labels */}
      <AnimatePresence>
        <WonderLabels onSelect={handleSelectWonder} visible={!selectedWonder} />
      </AnimatePresence>

      {/* Detail panel */}
      <AnimatePresence>
        {showPanel && selectedWonder && (
          <WonderPanel wonder={selectedWonder} onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
