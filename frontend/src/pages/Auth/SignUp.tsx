import SignUpForm from "@/components/Forms/Auth/SignUpForm";
import AuthLayout from "@/layout/AuthLayout";
import AuthImage from "../../../public/auth-2.jpg";

const SignUp = () => {
  return (
    <AuthLayout imageSource={AuthImage}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
