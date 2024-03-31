import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import ImageUpload from "../../ImageUpload";

const AddVechileForm = ({ onClose }: { onClose: () => {} }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validation
    if (name === "name") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: value.length < 2 ? "Name is too short" : "",
      }));
    } else if (name === "phone") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: !/^\d{11}$/.test(value) ? "Invalid phone number" : "",
      }));
    } else if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "",
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.length < 6 ? "Password is too short" : "",
      }));
    }
  };

  const handleCreate = () => {
    if (Object.values(formData).every((value) => value !== "")) {
      setIsLoading(true);
      httpClient
        .post(
          `${BASE_URL}${API_END_POINTS.USER}`,
          {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            password: formData.password,
          },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("User created Successfully");
          mutate(`${BASE_URL}${API_END_POINTS.USER}`);

          onClose();
        })
        .catch((err) => {
          const errMsg = err.request.responseText.split(":")[1];
          const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
          console.log("ERR", trimmedErrMsg);
          toast.error(trimmedErrMsg);
        });

      setIsLoading(false);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleOnUpload = (data: { image: File }) => {
    console.log(data.image.size);
  };

  return (
    <div className=" w-full mt-5">
      {/* header */}
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>User Information</span>
      </header>

      {/* image */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <ImageUpload name="User Photo" onUpload={handleOnUpload} />
      </div>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          <InputField
            id="name"
            name="name"
            placeholder="Abdul Hadi"
            value={formData.name}
            label={"Full Name"}
            onChange={handleChange}
            error={errors.name}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="phone"
            name="phone"
            placeholder="01766610021"
            value={formData.phone}
            label={"Phone Number"}
            onChange={handleChange}
            error={errors.phone}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="abdulhadi@gmail.com"
            value={formData.email}
            label={"Email"}
            onChange={handleChange}
            error={errors.email}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            label={"Password"}
            onChange={handleChange}
            error={errors.password}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            customPasswordClass="top-7"
          />

          {isLoading ? (
            <div className="flex flex-auto justify-end items-end ">
              <button
                type="button"
                onClick={handleCreate}
                className="p-2 bg-green-800 hover:bg-secondary hover:text-green-200 text-white rounded-md mt-8"
              >
                Creating...
              </button>
            </div>
          ) : (
            <div className="flex flex-auto justify-end items-end ">
              <button
                type="button"
                onClick={handleCreate}
                className="p-2 bg-primary hover:bg-secondary hover:text-black text-white rounded-md mt-8"
              >
                Create
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddVechileForm;
