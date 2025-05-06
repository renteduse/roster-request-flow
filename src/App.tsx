
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ShiftProvider } from "./contexts/ShiftContext";
import AppLayout from "./components/Layout/AppLayout";
import AuthLayout from "./components/Layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SwapBoard from "./pages/SwapBoard";
import ApprovalQueue from "./pages/ApprovalQueue";
import RequestHistory from "./pages/RequestHistory";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ShiftProvider>
            <BrowserRouter>
              <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                </Route>
                
                {/* App Routes */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/swap-board" element={<SwapBoard />} />
                  <Route path="/approve" element={<ApprovalQueue />} />
                  <Route path="/history" element={<RequestHistory />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ShiftProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
