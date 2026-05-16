import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SummarizerBox from "@/components/SummarizerBox";
import FeatureCards from "@/components/FeatureCards";
import SupportedInputs from "@/components/SupportedInputs";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center z-10 w-full pb-24">
        <Hero />
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <SummarizerBox />
        </div>
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-32 space-y-32">
          <SupportedInputs />
          <FeatureCards />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
