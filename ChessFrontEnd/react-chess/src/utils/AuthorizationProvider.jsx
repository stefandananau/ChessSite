import { redirect } from "react-router-dom";

export function setAuthorizationToken(data) {
  console.log(data);
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
}

export function getAuthorizationToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
}

export function checkAuthorizationToken() {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect("/authorize?mode=login");
  }
}

export function removeAuthorizationToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

export async function refreshToken() {
  const refreshData = {
    accessToken: getAuthorizationToken(),
    refreshToken: getRefreshToken(),
  };
  const response = await fetch("https://localhost:7080/api/User/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshData),
  });
  if (response.ok) {
    const data = await response.json();
    setAuthorizationToken(data);
  } else {
    removeAuthorizationToken();
    return redirect("/authorize?mode=login");
  }
}
