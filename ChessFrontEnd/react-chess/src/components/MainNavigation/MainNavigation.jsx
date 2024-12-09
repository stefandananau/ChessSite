import { getAuthorizationToken } from "../../utils/AuthorizationProvider";
import { NavLink, useFetcher } from "react-router-dom";
export default function MainNavigation() {
  const fetcher = useFetcher();
  const token = getAuthorizationToken();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/main" end>
              Home
            </NavLink>
          </li>
          {token && (
            <li>
              <fetcher.Form action="/logout" method="post">
                <button>Logout</button>
              </fetcher.Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
