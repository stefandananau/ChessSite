import { redirect } from "react-router-dom";

export function setAuthorizationToken(token) {
  localStorage.setItem("token", token);
}

export function getAuthorizationToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthorizationToken() {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect("/authorize?mode=login");
  }
}
