
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/ui/loading-screen";
import { usePageTransition } from "@/hooks/usePageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Research from "./pages/Research";
import Assessment from "./pages/Assessment";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = usePageTransition();

  if (isLoading) {
    return <LoadingScreen message="Loading page..." />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/research" element={<Research />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
