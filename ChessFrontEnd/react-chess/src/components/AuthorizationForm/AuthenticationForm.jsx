import {
  Link,
  useActionData,
  useFetcher,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export default function AuthenticationForm() {
  const fetcher = useFetcher();
  const data = fetcher.data;
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = mode === "login";
  const isSubmitting = fetcher.state === "submitting";
  return (
    <>
      <fetcher.Form method="post" action={"/authorize?mode=" + mode}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="username">Username</label>
            <input id="username" type="username" name="username" required />
          </p>
        )}
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
          </p>
        )}
        {data && data.error && <p>{data.error}</p>}
        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting ..." : isLogin ? "Login" : "Register"}
          </button>
          <p>
            <Link to={`?mode=${isLogin ? "register" : "login"}`}>
              {isLogin ? "Or click here to register" : "Or click here to login"}
            </Link>
          </p>
        </div>
      </fetcher.Form>
    </>
  );
}
