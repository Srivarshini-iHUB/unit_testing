import { Routes, Route, Navigate } from "react-router-dom";

/* Imports for auth routes */
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import NotFoundPage from "../pages/NotFound";
import CheckAuth from "@/utils/checkAuth";
import DevloperLogin from "../pages/developer/login";
import { useAuthStore } from "@/store/authStore";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";

/* Imports for Co-ordinator routes */
import CoordinatorLayout from "../components/coordinator/layout";
import CoordinatorDashboard from "../pages/coordinator/Dashboard";
import CoordinatorTasks from "../pages/coordinator/Task";
import CoordinatorReports from "../pages/coordinator/Report";
import NaacCriteria from "@/pages/coordinator/NaacCriteria";
import InstitutionProfile from "@/pages/coordinator/InstitutionProfile";
import CoordinatorProfile from "@/pages/coordinator/Profile";

/* Imports for contributor routes */
import ContributorLayout from "../components/contributor/layout";
import ContributorDashboard from "../pages/contributor/Dashboard";
import ContributorTasks from "../pages/contributor/Task";
import InstitutionProfilePage from "@/pages/contributor/InstitutionProfile";
import ContributorProfile from "@/pages/contributor/Profile";

/* Imports for developer routes */
import DeveloperLayout from "@/components/developer/layout";
import DeveloperDashboard from "@/pages/developer/Dashboard";
import UsersManagement from "@/pages/developer/usersManagement";


const AppRouter = () => {
  const { user } = useAuthStore();
  const isAuthenticated = Boolean(user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dev-login" element={<DevloperLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword /> } />

      {/* Coordinator Protected Routes */}
      <Route
        path="/coordinator"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <CoordinatorLayout />
          </CheckAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CoordinatorDashboard />} />
        <Route path="tasks" element={<CoordinatorTasks />} />
        <Route path="reports" element={<CoordinatorReports />} />
        <Route path="naac-criteria" element={<NaacCriteria />} />
        <Route path="institution" element={<InstitutionProfile />} />
        <Route path="user-profile" element={<CoordinatorProfile/>} />
      </Route>

      {/* Contributor Protected Routes */}
      <Route
        path="/contributor"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ContributorLayout />
          </CheckAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ContributorDashboard />} />
        <Route path="tasks" element={<ContributorTasks />} />
      <Route path="institution" element={<InstitutionProfilePage />} />
        <Route path="user-profile" element={<ContributorProfile/>} />
      </Route>


      {/* Dashboard Routes */}
      <Route
        path="/developer"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <DeveloperLayout />
           </CheckAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DeveloperDashboard />} />
        <Route path="users" element={<UsersManagement />} />
      </Route>

      {/* Catch-All for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
