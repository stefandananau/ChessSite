import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import AuthenticationPage, {
  authenticationAction,
  authenticationLoader,
} from "./pages/AuthenticationPage";
import { refreshToken } from "./utils/AuthorizationProvider";
import { logoutAction } from "./pages/LogoutPage";
const router = createBrowserRouter([
  {
    path: "/main",
    element: <RootLayout />,
    loader: refreshToken,
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
    loader: authenticationLoader,
    action: authenticationAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  { path: "/", element: <Navigate to="/main" /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
