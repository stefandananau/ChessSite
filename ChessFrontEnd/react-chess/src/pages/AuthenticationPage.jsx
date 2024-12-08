import { redirect } from "react-router-dom";
import AuthenticationForm from "../components/AuthorizationForm/AuthenticationForm";

export default function AuthenticationPage() {
  return <AuthenticationForm />;
}

export async function authenticationAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let x = searchParams;
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();
  if (mode === "login") {
    return login(data);
  } else if (mode === "register") {
    return register(data);
  } else {
    throw new Response(JSON.stringify({ message: "Unsupported page mode" }), {
      status: 500,
    });
  }
}

async function login(data) {
  const loginData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("https://localhost:7080/api/User/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (response.ok) {
    data = await response.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return redirect("/main");
  }
  if (response.status === 400) {
    data = await response.json();
    console.log(data);
    return data;
  }
  throw new Response(
    JSON.stringify({ message: "Could not authenticate user" }),
    {
      status: 500,
    }
  );
}

async function register(data) {
  if (data.get("password") != data.get("confirmPassword")) {
    return { error: "Password should match" };
  }
  const registerData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("https://localhost:7080/api/User/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
  if (response.ok) {
    window.alert("Register succesful");
    return redirect("http://localhost:5173/authorize?mode=login");
  }
  if (response.status === 400) {
    data = await response.json();
    console.log(data);
    return data;
  }
  throw new Response(
    JSON.stringify({ message: "Could not register new user" }),
    {
      status: 500,
    }
  );
}
