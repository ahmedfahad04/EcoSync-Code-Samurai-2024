import SignUpForm from "@/components/Auth/SignUpForm";
import AuthLayout from "@/layout/AuthLayout";
import AuthImage from "../../../public/auth-image-3.jpg";

const SignUp = () => {
  return (
    <AuthLayout imageSource={AuthImage}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
