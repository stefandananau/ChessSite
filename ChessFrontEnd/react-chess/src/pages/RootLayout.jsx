import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import { useEffect } from "react";
import { refreshToken } from "../utils/AuthorizationProvider";

export default function RootLayout() {
  const MINUTE_MS = 9 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
      console.log("token was refreshed");
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
