import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { externalSignup } from "../../utils/ExternalSignUp";

export default function GoogleSignup() {
  return (
    <GoogleOAuthProvider clientId="601700555205-3gcj6e54grlpo1i52png7ttqi36cgcji.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googleSignup(jwtDecode(credentialResponse.credential));
        }}
        onError={() => console.log("google login failed")}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
}

async function googleSignup(credentials) {
  const googleSignupData = {
    email: credentials.email,
    username: credentials.name.replace(/\s/g, ""),
    identifier: credentials.sub,
  };
  externalSignup(googleSignupData);
}
