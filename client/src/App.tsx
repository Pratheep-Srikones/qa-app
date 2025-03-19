import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SignupPage from "./pages/auth/SignUp";
import LogInPage from "./pages/auth/LogIn";
import Home from "./pages/dashboard/home";
import AskQuestion from "./pages/dashboard/AskQuestion";
import ProfilePage from "./pages/dashboard/Profile";
import ChangePassword from "./pages/dashboard/ChangePassword";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/signup"
          element={
            <motion.div {...pageVariants}>
              <SignupPage />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageVariants}>
              <LogInPage />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <motion.div {...pageVariants}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/ask"
          element={
            <motion.div {...pageVariants}>
              <AskQuestion />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div {...pageVariants}>
              <ProfilePage />
            </motion.div>
          }
        />
        <Route
          path="/change-password"
          element={
            <motion.div {...pageVariants}>
              <ChangePassword />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
