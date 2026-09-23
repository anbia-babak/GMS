import {createBrowserRouter, RouterProvider} from "react-router";
import Dashboard from "../src/components/pages/Dashboard";
import Members from "./components/pages/Members";
import MainLayout from "./components/layouts/MainLayout";
import Memberships from "./components/pages/Memberships";
import Payments from "../src/components/pages/Payments";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";


function App() {
  const router = createBrowserRouter([
  {
    // path: "/",
    // element: <Dashboard />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/membership",
        element: <Memberships />
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/settings",
        element: <Settings />,
      }
    ],
  },
]);

  return <RouterProvider router={router}/>;
}

export default App
{/* <UserPlus /> add member */}
{/* <UserCheck /> active members */}
{/* <UserX /> expired members */}
{/* <Wallet /> budget */}
{/* <WalletCards /> assign membership */}
{/* <UserRoundGroup /> total members */}
{/* <CalendarDays /> */}
{/* <ChartNoAxesCombined /> income */}