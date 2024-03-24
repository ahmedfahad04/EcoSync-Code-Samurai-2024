import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

import { API_END_POINTS } from "@/constants/Service";
import { ISignUpRequest } from "@/models/Auth";
import Button from "@/ui/Button";
import { LeftArrow } from "@/ui/Icons";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { PuffLoader } from "react-spinners";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  userName: yup.string().required("User Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8)
    .max(20)
    .test("lowercase", "must contain lowercase letter", (value) =>
      value ? /[a-z]/.test(value) : false
    )
    .test("uppercase", "must contain uppercase letter", (value) =>
      value ? /[A-Z]/.test(value) : false
    )
    .test("number", "must contain number", (value) =>
      value ? /\d/.test(value) : false
    )
    .test("special", "must contain special character", (value) =>
      value ? /[^\w\d\s:]/.test(value) : false
    )
    .required("Password is required"),
});

type FieldKeys = "name" | "userName" | "email" | "password";

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ISignUpRequest> = async (data) => {
    setIsLoading(true);

    try {
      await httpClient
        .post(
          `${API_END_POINTS.REGISTER}`,
          {
            name: data.name,
            userName: data.userName,
            email: data.email,
            password: data.password,
            role: 1,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("RES: ", res);
          navigate("/auth/signin");
          toast.success("Registration Successful!");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log("Error in user creation: ", err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSignIn = () => navigate("/auth/signin");

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
          <p className="text-sm">
            Have an account?&nbsp;
            <span
              className="text-primary text-sm font-medium cursor-pointer"
              onClick={onClickSignIn}
            >
              Sign in!
            </span>
          </p>
        </div>

        {/* headline */}
        <div className="mt-6 2xl:mt-16 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white font-semibold">
            Get Started With <span className="text-primary">BlogBit</span>
          </h2>
          <h3 className="mt-2 text-slate-100 text-sm">
            Getting Started is easy
          </h3>

          {/* Google & Facebook Buttons */}
          {/* <div className="mt-10 flex flex-row justify-center items-center gap-3">
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

        {/* divider */}
        {/* <div className="flex justify-center items-center mt-4 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="1"
            viewBox="0 0 130 1"
            fill="none"
          >
            <path d="M0 0.5H130" stroke="#DBDBDB" />
          </svg>
          <span className="px-3 text-xs font-normal text-black">
            Or continue with
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="1"
            viewBox="0 0 130 1"
            fill="none"
          >
            <path d="M0 0.5H130" stroke="#DBDBDB" />
          </svg>
        </div> */}

        {/* Signup Form */}
        <div className="flex flex-col justify-center items-center mt-10">
          <form
            className="flex flex-col gap-5 w-[388px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { name: "name", key: "name", placeholder: "Name" },
              { name: "userName", key: "userName", placeholder: "UserName" },
              { name: "Email", key: "email", placeholder: "Email" },
              {
                name: "Password",
                key: "password",
                placeholder: "New password",
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
                Create Account
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
