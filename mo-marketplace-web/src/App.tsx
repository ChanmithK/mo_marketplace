import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import LoginPage from "./pages/LoginPage";
import "./App.css";

// Main App Content
const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
