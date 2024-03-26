import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

const AddVechileForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    truckType: "",
    capacity: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full mt-5">
      {/* header */}
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>Vehicle Information</span>
      </header>

      {/* form */}
      <form action="" className="mt-10">
        <InputField
          id="vid"
          name="vehicleNumber"
          placeholder="DHAKA-D-11-9999"
          value={formData.vehicleNumber}
          label={true}
          onChange={handleChange}
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
        />
        <Dropdown
          name="Select Truck Type"
          options={[
            "Open Truck",
            "Dump Truck",
            "Compactor",
            "Container Carrier",
          ]}
          label="Vehicle Type"
          customClass="mt-5"
          onSelect={(selectedOption) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              truckType: selectedOption,
            }))
          }
        />

        <Dropdown
          name="Select Capacity"
          options={["3 Ton", "5 Ton", "7 Ton"]}
          label="Vehicle Capacity"
          customClass="mt-5 bg-slate-300/6"
          onSelect={(selectedOption) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              capacity: selectedOption,
            }))
          }
        />

        <div className="flex flex-auto justify-end items-end ">
          <button
            type="button"
            onClick={handleCreate}
            className="p-2 bg-primary hover:bg-secondary hover:text-black text-white rounded-md mt-8"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVechileForm;
