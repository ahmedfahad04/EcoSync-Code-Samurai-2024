import SignInForm from "@/components/Auth/SignInForm";
import AuthLayout from "@/layout/AuthLayout";
import AuthImage from "../../../public/auth-image-3.jpg";

const SignIn = () => {
  return (
    <AuthLayout imageSource={AuthImage}>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
