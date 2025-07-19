import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./providers/ProtectedRoute";
import LoginPage from "./pages/Login/LoginPage";
import PetListPage from "./pages/PetList/PetListPage";
import PetDetailsPage from "./pages/PetDetails/PetDetailsPage";
import PetEditPage from "./pages/PetEdit/PetEditPage";
import Header from "./components/Header/Header";
import "./styles/global.scss";

function AppRoutes() {
  const location = useLocation();
  const showHeader = location.pathname !== "/login";
  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PetListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pet/:id"
          element={
            <ProtectedRoute>
              <PetDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pet/:id/edit"
          element={
            <ProtectedRoute>
              <PetEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
