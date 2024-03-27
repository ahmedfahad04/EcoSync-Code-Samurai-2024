import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import ImageUpload from "../ImageUpload";

const AddVechileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    //! api call
    console.log("Form Data:", formData);
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
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="phone"
            name="phone"
            placeholder="01766610021"
            value={formData.phone}
            label={"Phone Number"}
            onChange={handleChange}
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
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <Dropdown
            name="Select User Role"
            options={["STS Manager", "Landfill Manager"]}
            label="Vehicle Capacity"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                role: selectedOption,
              }))
            }
          />

          <div className="flex flex-auto justify-end items-end ">
            <button
              type="submit"
              onClick={handleCreate}
              className="p-2 bg-primary hover:bg-secondary hover:text-black text-white rounded-md mt-8"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVechileForm;
