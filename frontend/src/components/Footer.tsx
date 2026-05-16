import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-16 border-t border-border/50 bg-background/50 backdrop-blur-sm z-10 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <span className="font-display font-semibold text-foreground text-lg mb-1">
            SummarizeMate.ai
          </span>
          <span>Precision summaries for professionals.</span>
        </div>
        
        <div>
          &copy; {new Date().getFullYear()} SummarizeMate AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
