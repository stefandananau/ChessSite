import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import AuthenticationPage, {
  authenticationAction,
} from "./pages/AuthenticationPage";
import { checkAuthorizationToken } from "./utils/AuthorizationProvider";
const router = createBrowserRouter([
  {
    path: "/main",
    element: <RootLayout />,
    loader: checkAuthorizationToken,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/authorize",
    element: <AuthenticationPage />,
    action: authenticationAction,
  },
  { path: "/", element: <Navigate to="/main" /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
