import {createBrowserRouter, RouterProvider} from "react-router";
import Dashboard from "./components/pages/Dashboard";
import Members from "./components/pages/Members";
import MainLayout from "./components/layouts/MainLayout";
import Memberships from "./components/pages/Memberships";
// import Payments from "./components/pages/Payments";


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
      }
      // {
      //   path: "/payments",
      //   element: <Payments />,
      // }
    ],
  },
]);

  return <RouterProvider router={router}/>;
}

export default App
