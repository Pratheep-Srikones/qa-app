import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignUp";
import LogInPage from "./pages/auth/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
