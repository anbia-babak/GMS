import {createBrowserRouter, RouterProvider} from "react-router";
import Dashboard from "../src/components/pages/Dashboard";
import Members from "./components/pages/Members";
import MainLayout from "./components/layouts/MainLayout";
import Memberships from "./components/pages/Memberships";
import Payments from "../src/components/pages/Payments";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RouteError from "./components/pages/RouteError";

function App() {
//   const router = createBrowserRouter([
//     {
//       // Standalone pages (NO sidebar / NO mainLayout)
//       path: "/logout",
//       element: <Login />
//     },
//     {
//       //Main layout wrapper (HAS sidebar and <Outlet />)
//       path: "/",
//       element: <MainLayout />,
//       children: [
//         {
//           index: true,
//           element: <Dashboard />,
//         },
//         {
//           path: "/dashboard",
//           element: <Dashboard />,
//         },
//         {
//           path: "/members",
//           element: <Members />,
//         },
//         {
//           path: "/memberships",
//           element: <Memberships />
//         },
//         {
//           path: "/payments",
//           element: <Payments />,
//         },
//         {
//           path: "/reports",
//           element: <Reports />,
//         },
//         {
//           path: "/settings",
//           element: <Settings />,
//         }
//       ],
//   },
// ]);
  const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouteError />,
  },
  {
    path: "/",
    errorElement: <RouteError />,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/members", element: <Members /> },
      { path: "/memberships", element: <Memberships /> },
      { path: "/payments", element: <Payments /> },
      { path: "/reports", element: <Reports /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <RouteError notFound /> },
]);

  return <RouterProvider router={router}/>;
}

export default App
