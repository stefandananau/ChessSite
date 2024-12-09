import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { externalSignup } from "../../utils/ExternalSignUp";

export default function FacebookSignup() {
  return (
    <LoginSocialFacebook
      appId={1333289161370796}
      onResolve={(response) => {
        facebookSignup(response.data);
      }}
      onReject={(error) => console.log(error)}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

async function facebookSignup(data) {
  const facebookSignupData = {
    email: data.email,
    username: data.name.replace(/\s/g, ""),
    identifier: data.userID,
  };
  externalSignup(facebookSignupData);
}
