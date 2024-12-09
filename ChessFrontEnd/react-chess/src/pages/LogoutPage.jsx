import { redirect } from "react-router-dom";
import { removeAuthorizationToken } from "../utils/AuthorizationProvider";

export function logoutAction() {
  removeAuthorizationToken();
  return redirect("/");
}
