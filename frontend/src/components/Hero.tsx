import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <section className="w-full pt-20 pb-16 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        className="max-w-3xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Summarize Anything, <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">Instantly</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered summaries for articles, papers, emails, docs, and more — in seconds. Get the clarity you need to move faster.
        </motion.p>
      </motion.div>
    </section>
  );
}
