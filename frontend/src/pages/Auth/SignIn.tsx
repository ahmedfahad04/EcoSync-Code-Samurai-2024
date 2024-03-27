import SignInForm from "@/components/Forms/Auth/SignInForm";
import AuthLayout from "@/layout/AuthLayout";
import AuthImage from "../../../public/auth-2.jpg";

const SignIn = () => {
  return (
    <AuthLayout imageSource={AuthImage} imagePosition="left">
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
