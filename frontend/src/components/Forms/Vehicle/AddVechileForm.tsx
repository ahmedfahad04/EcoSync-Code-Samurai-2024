import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AddVechileForm = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    vehicle_number: "",
    type: "",
    capacity: "",
    cpk_loaded: "",
    cpk_unloaded: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setIsLoading(true)
    if (Object.values(formData).every((value) => value !== "")) {
      httpClient
        .post(`${BASE_URL}${API_END_POINTS.VEHICLE}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("VEHICLE : ", res);
          toast.success("Vehicle created successfully");
          onClose();
        })
        .catch((err) => {
          console.log("ERR Ve: ", err);
          toast.error("Failed to Create vehicle");
        });
    } else {
      toast.error("Please fill all required fields");
    }
    setIsLoading(false)

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
      <form className="mt-10 w-full">
        <InputField
          id="vehicle_number"
          name="vehicle_number"
          placeholder="DHAKA-D-11-9999"
          value={formData.vehicle_number}
          label={"Vehicle Number"}
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
          customClass="mt-3"
          onSelect={(selectedOption) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              type: selectedOption,
            }))
          }
        />

        <Dropdown
          name="Select Capacity (Ton)"
          options={["3", "5", "7"]}
          label="Vehicle Capacity"
          customClass="mt-3 bg-slate-300/6"
          onSelect={(selectedOption) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              capacity: selectedOption,
            }))
          }
        />

        <InputField
          id="cpk_loaded"
          name="cpk_loaded"
          type="number"
          placeholder="250"
          value={formData.cpk_loaded}
          label={"Fuel Cost Loaded (per km /-)"}
          onChange={handleChange}
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
        />

        <InputField
          id="cpk_unloaded"
          name="cpk_unloaded"
          placeholder="180"
          type="number"
          value={formData.cpk_unloaded}
          label={"Fuel Cost Unloaded (per km /-)"}
          onChange={handleChange}
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
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
  );
};

export default AddVechileForm;
