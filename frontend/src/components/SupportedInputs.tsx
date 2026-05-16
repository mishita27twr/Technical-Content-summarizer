import { motion } from "framer-motion";
import { FileText, Mail, BookOpen, FileDigit, Code, File } from "lucide-react";

export default function SupportedInputs() {
  const inputs = [
    { icon: <FileText className="h-6 w-6" />, label: "Articles & Blogs" },
    { icon: <BookOpen className="h-6 w-6" />, label: "Research Papers" },
    { icon: <Mail className="h-6 w-6" />, label: "Long Emails" },
    { icon: <FileDigit className="h-6 w-6" />, label: "Documentation" },
    { icon: <Code className="h-6 w-6" />, label: "Stories & Books" },
    { icon: <File className="h-6 w-6" />, label: "Uploaded Files" },
  ];

  return (
    <section className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Works With Any Content</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Paste text or upload your documents. Our AI understands context across any domain.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {inputs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-card-border/50 hover:border-primary/30 transition-colors group"
          >
            <div className="p-4 rounded-xl bg-primary/5 text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-transform">
              {item.icon}
            </div>
            <h3 className="font-semibold">{item.label}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
