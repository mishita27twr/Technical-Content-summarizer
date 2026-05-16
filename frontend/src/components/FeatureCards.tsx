import { motion } from "framer-motion";
import { Zap, List, UploadCloud, Download } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Get comprehensive summaries in seconds, not minutes. Save hours of reading time every day."
    },
    {
      icon: <List className="h-6 w-6" />,
      title: "Multiple Formats",
      description: "Choose between quick overviews, detailed analyses, or actionable bullet points based on your needs."
    },
    {
      icon: <UploadCloud className="h-6 w-6" />,
      title: "File Upload Support",
      description: "Drop your PDF, TXT, or DOCX files directly into the workspace. No need to copy-paste long documents."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Copy & Download",
      description: "Instantly copy your summaries to the clipboard or download them as text files for your records."
    }
  ];

  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Why SummarizeMate AI?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Built for precision and speed, giving you the edge in information processing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="flex flex-col p-6 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-foreground transform translate-x-4 -translate-y-4">
              {feature.icon}
            </div>
            <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center border border-border text-primary mb-6 shadow-sm">
              {feature.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-muted-foreground flex-1">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
