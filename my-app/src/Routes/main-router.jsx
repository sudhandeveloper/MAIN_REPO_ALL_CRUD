import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../auth-pages/login";
import Register from "../auth-pages/Register";
import Dashboard from "../Dashborad/Dashboard";
import { PrivateRoute } from "./Privateroutes/Mainroute";
import Leads from "../Dashborad/Leads";
import SettingsPage from "../Dashborad/SettingsPage";
import EnrollmentPage from "../Dashborad/EnrollmentPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard", // Example private route
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/leads",
        element: <Leads />,
      },
      {
        path: "/dashboard/settings",
        element: <SettingsPage />,
      },
      {
        path: "/dashboard/enrollment",
        element: <EnrollmentPage />,
      },
    ],
  },
]);