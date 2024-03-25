import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as yup from "yup";

import { API_END_POINTS } from "@/constants/Service";
import { ISignUpRequest } from "@/models/Auth";
import Button from "@/ui/Button";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { NavLink } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import logo from "../../../public/ecosync-logo.png";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
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

type FieldKeys = "name" | "email" | "phoneNumber" | "password";

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
      email: "",
      phoneNumber: "",
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
            email: data.email,
            phoneNumber: data.phoneNumber, //! need to change according to api var name
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
        <div className="mr-16 2xl:mr-28 ml-16 2xl:ml-28 flex flex-row mt-10 justify-center text-black ">
          <NavLink to="/" className="flex flex-row justify-center items-center">
            <img src={logo} width={70} />
            <p className="font-bold">EcoSync</p>
          </NavLink>
          {/* <p className="text-sm">
            Have an account?&nbsp;
            <span
              className="text-primary text-sm font-medium cursor-pointer"
              onClick={onClickSignIn}
            >
              Sign in!
            </span>
          </p> */}
        </div>

        {/* headline */}
        <div className="mt-4 2xl:mt-16 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-black font-semibold text-center">
            Create
            <p>
              <span className="text-[#14923EFF] font-bold">EcoSync</span>{" "}
              Account
            </p>
          </h2>
        </div>

        {/* Signup Form */}
        <div className="flex flex-col justify-center items-center mt-10">
          <form
            className="flex flex-col gap-5 w-[388px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { name: "name", key: "name", placeholder: "Name" },
              { name: "Email", key: "email", placeholder: "Email" },
              {
                name: "phoneNumber",
                key: "phoneNumber",
                placeholder: "Phone Number",
              },
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

            {isLoading ? (
              <Button
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base h-14 mt-5 text-white hover:bg-secondary bg-primary"
                disabled={true}
              >
                <PuffLoader size={25} color="white" />
              </Button>
            ) : (
              <Button
                buttonType="submit"
                customClass="flex justify-center item-center font-semibold text-base h-14 mt-5 hover:bg-secondary bg-primary"
              >
                Sign Up
              </Button>
            )}
          </form>
        </div>

        {/* bottom section */}
        <p className="text-sm  text-black mt-16 flex justify-center items-center">
          Already Have an account?&nbsp;
          <span
            className="text-primary text-sm font-medium cursor-pointer"
            onClick={onClickSignIn}
          >
            Sign in!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
