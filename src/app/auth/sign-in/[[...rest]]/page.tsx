import { SignIn } from "@clerk/nextjs";
import NavLinks from "../../../../components/Navbar"; 

const SignInPage = () => (
  <div style={styles}>
    <NavLinks />
    <SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
  </div>
);

export default SignInPage;

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
