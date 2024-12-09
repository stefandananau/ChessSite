import { setAuthorizationToken } from "./AuthorizationProvider";

export async function externalSignup(signupData) {
  const response = await fetch(
    "https://localhost:7080/api/User/externalSignup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    }
  );
  if (response.ok) {
    const data = await response.json();
    setAuthorizationToken(data);
    window.location.reload();
    return;
  }
  if (response.status === 400) {
    const data = await response.json();
    window.alert(data.error);
    return;
  }
  throw new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 500,
  });
}
