import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { summarizeApi, SummaryType } from "@/api/summarizeApi";
import {
  FileText, Upload, Type, Copy, Download, 
CheckCircle2, AlertCircle, Loader2, File, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SummarizerBox() {
  const [activeTab, setActiveTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState<SummaryType>("Short");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setText("");
    setFile(null);
    setResult(null);
    setError(null);
    setCopied(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerate = async () => {
    if (activeTab === "text" && !text.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }

    if (activeTab === "file" && !file) {
      setError("Please select a file to summarize.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let resText = "";

      if (activeTab === "text") {
        resText = await summarizeApi.summarizeText(text, summaryType);
      } else if (activeTab === "file" && file) {
        resText = await summarizeApi.summarizeFile(file, summaryType);
      }

      setResult(resText);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;

    navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
      setError(null);
      setResult(null);
    }
  };

  const hasContent = text || file || result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full bg-card/60 backdrop-blur-xl border border-card-border rounded-2xl shadow-xl overflow-hidden flex flex-col"
    >
      <div className="flex border-b border-border">
        <button
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
            activeTab === "text"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
          onClick={() => {
            setActiveTab("text");
            setResult(null);
            setError(null);
          }}
        >
          <Type className="w-4 h-4" />
          Paste Text
        </button>

        <button
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
            activeTab === "file"
              ? "text-primary border-b-2 border-primary bg-primary/5"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
          onClick={() => {
            setActiveTab("file");
            setResult(null);
            setError(null);
          }}
        >
          <Upload className="w-4 h-4" />
          Upload File
        </button>
      </div>

        <div className="p-6 md:p-8 flex flex-col gap-6 relative">
          {(text || file || result) && (
  <button
    onClick={handleClear}
    className="absolute top-5 right-5 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all"
  >
    <X className="w-4 h-4" />
  </button>
)}

        <AnimatePresence mode="wait">
          {activeTab === "text" ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                placeholder="Paste your article, email, research paper, or notes here..."
                className="min-h-[200px] resize-y bg-background/50 border-border focus:border-primary/50 text-base"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setResult(null);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="min-h-[200px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 bg-background/30 hover:bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".txt,.pdf,.png,.jpg,.jpeg,.doc,.docx"
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-background rounded-full mb-4 group-hover:text-primary transition-colors border border-border group-hover:border-primary/30"
                >
                  {file ? (
                    <File className="w-8 h-8 text-primary" />
                  ) : (
                    <Upload className="w-8 h-8" />
                  )}
                </motion.div>

                <h3 className="font-semibold text-lg mb-1">
                  {file ? file.name : "Drop your file here or click to browse"}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {file
                    ? `${(file.size / 1024).toFixed(1)} KB`
                    : "Supports TXT files"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50 p-2 rounded-xl border border-border/50">
          <div className="flex gap-1 w-full sm:w-auto p-1 bg-muted rounded-lg">
            {(["Short", "Detailed", "Bullets"] as SummaryType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSummaryType(type);
                  setResult(null);
                }}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  summaryType === type
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {type === "Short"
                  ? "Short"
                  : type === "Detailed"
                  ? "Detailed"
                  : "Bullets"}
              </button>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto font-semibold px-8 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Summary
              </span>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg flex items-center gap-2 border border-destructive/20"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 border border-border rounded-xl bg-background/80 overflow-hidden"
            >
              <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                <p className="whitespace-pre-wrap leading-relaxed">{result}</p>
              </div>

              <div className="bg-muted/50 p-4 flex gap-3 border-t border-border">
                <Button variant="secondary" className="flex-1" onClick={handleCopy}>
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>

                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}