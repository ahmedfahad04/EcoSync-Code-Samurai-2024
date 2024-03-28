import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

const AddSTSForm = () => {
  const [formData, setFormData] = useState({
    STSName: "",
    wardNumber: "",
    capacity: "",
    latitude: "",
    longitude: "",
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

  return (
    <div className=" w-full mt-5">
      {/* header */}
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>STS Information</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          <InputField
            id="STSName"
            name="STSName"
            placeholder="Nikunjo STS"
            value={formData.STSName}
            label={"STS Name"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="wardNumber"
            name="wardNumber"
            placeholder="28"
            value={formData.wardNumber}
            label={"Ward Number"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="capacity"
            name="capacity"
            type="number"
            placeholder="300"
            value={formData.capacity}
            label={"STS Capacity (in tonnes)"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <div className="w-full flex flex-row justify-center items-center gap-5">
            <InputField
              id="latitude"
              name="latitude"
              placeholder="21.1478 W"
              value={formData.latitude}
              label={"Latitude"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="longitude"
              name="longitude"
              placeholder="22.1478 E"
              value={formData.longitude}
              label={"Longitude"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

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

export default AddSTSForm;
