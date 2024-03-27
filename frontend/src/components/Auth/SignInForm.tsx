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

  const onClickSignUp = () => navigate("/register");

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
        </div>

        {/* Signin Form */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-start w-[450px]">
            <h2 className="text-4xl font-semibold text-black">
              Welcome Back 👋
            </h2>
            <h3 className="mt-2 text-lg text-gray-400">
              Login into your account
            </h3>
          </div>

          {/* form */}
          <form
            className="flex flex-col gap-5 w-[450px] mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              {
                name: "Email",
                key: "email",
                placeholder: "abdurrahman23@gmail.com",
              },
              {
                name: "Password",
                key: "password",
                placeholder: "********",
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
                      label={true}
                      customInputClass="bg-[#F3F4F6] border-none active:border-none h-12 rounded-md"
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

            <div className=" flex justify-end">
              <NavLink to={"/forgot-password"} className="text-sm text-primary">
                Forgot Password
              </NavLink>
            </div>

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

        <p className="text-sm  text-black mt-16 flex justify-center items-center">
          Don't have an account?&nbsp;
          <span
            className="text-primary text-sm font-medium cursor-pointer"
            onClick={onClickSignUp}
          >
            Sign up!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
