import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import InvoiceUpload from "./pages/InvoiceUpload";
import Renewals from "./pages/Renewals";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/invoice-upload" element={<InvoiceUpload />} />
        <Route path="/renewals" element={<Renewals />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;