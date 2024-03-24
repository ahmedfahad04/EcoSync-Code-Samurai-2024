import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import * as yup from "yup";

import { API_END_POINTS } from "@/constants/Service";
import { useAuth } from "@/context/AuthContext";
import { ISignInRequest } from "@/models/Auth";
import Button from "@/ui/Button";
import { LeftArrow } from "@/ui/Icons";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { PuffLoader } from "react-spinners";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).max(20).required("Password is required"),
});

type FieldKeys = "email" | "password";

const SignInForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ISignInRequest> = async (data) => {
    setIsLoading(true);

    try {
      await httpClient
        .post(
          `${API_END_POINTS.LOGIN}`,
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setUser(res.data.user);
          navigate(location.state || "/");
          toast.success("Login successfull");
        })
        .catch((err) => {
          const errMsg = err.response?.data.message;

          if (errMsg) {
            toast.error(errMsg);
          } else {
            toast.error(err.response?.data.password);
          }
          console.error("ERROR>>>: ", err.response.data.message);
        });
    } catch (error) {
      // toaster will be added later
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSignUp = () => navigate("/auth/signup");

  return (
    <div className="text-white">
      <div className="py-8 2xl:py-12">
        {/* message top */}
        <div className="mr-16 2xl:mr-28 ml-16 2xl:ml-28 flex flex-row mt-10 justify-between ">
          <NavLink to="/">
            <p className="flex ">
              <LeftArrow width={26} className="mr-1 mt-1/2" />
              <span className="font-normal text-base">Back to Home Page</span>
            </p>
          </NavLink>
          <p className="flex justify-end text-sm">
            Don't have an account?&nbsp;
            <span
              className=" text-primary text-sm font-medium cursor-pointer"
              onClick={onClickSignUp}
            >
              Sign Up!
            </span>
          </p>
        </div>

        {/* headline */}
        <div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-semibold">Welcome Back</h2>
          <h3 className="mt-2 text-lg">Login into your account</h3>

          {/* Google & Facebook Buttons */}
          {/* <div className="mt-12 flex flex-row justify-center items-center gap-3">
            <Button
              buttonVariant="secondary"
              customClass="flex justify-center item-center py-2 px-6 text-black text-xs font-medium border-vibrant-green !rounded-md"
              icon={{
                iconFile: <GoogleIcon />,
                iconCustomClass: "w-[26px] h-[26px]",
              }}
            >
              Google
            </Button>
            <Button
              buttonVariant="secondary"
              customClass="flex justify-center item-center py-2 px-6 text-black text-xs font-medium !rounded-md"
              icon={{
                iconFile: <FacebookIcon />,
                iconCustomClass: "w-[26px] h-[26px]",
              }}
            >
              Facebook
            </Button>
          </div> */}
        </div>

        {/* Signin Form */}
        <div className="flex flex-col justify-center items-center mt-10">
          <form
            className="flex flex-col gap-5 w-[388px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { name: "Email", key: "email", placeholder: "Email" },
              {
                name: "Password",
                key: "password",
                placeholder: "Password",
              },
            ].map((field) => (
              <div key={field.key}>
                <Controller
                  name={field.key as FieldKeys}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      type={
                        field.key.toLocaleLowerCase().includes("password")
                          ? "password"
                          : field.key == "email"
                          ? "email"
                          : "text"
                      }
                      value={value}
                      onChange={onChange}
                      id={value}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  )}
                />
                {errors[field.key as FieldKeys] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.key as FieldKeys]?.message}
                  </p>
                )}
              </div>
            ))}

            {isLoading ? (
              <Button
                buttonVariant="primary"
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base h-14 mt-5 hover:bg-secondary text-white"
                disabled={true}
              >
                <PuffLoader size={25} color="white" />
              </Button>
            ) : (
              <Button
                buttonVariant="primary"
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base h-14 mt-5 hover:bg-secondary"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
