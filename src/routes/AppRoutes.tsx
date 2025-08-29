import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const TransactionPage = lazy(() => import("../pages/TransactionPage"));
const HistoryPage = lazy(() => import("../pages/HistoryPage"));


const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transacao"
          element={
            <PrivateRoute>
              <TransactionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
