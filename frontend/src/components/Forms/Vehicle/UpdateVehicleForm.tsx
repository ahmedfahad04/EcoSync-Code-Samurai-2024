import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IVehicle } from "@/models/Vehicles";
import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface UpdateVehicleFormProps {
  vehicleData: IVehicle | undefined;
  onClose: () => void;
}

const UpdateVehicleForm: React.FC<UpdateVehicleFormProps> = ({
  vehicleData,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { vehicle_number, type, capacity, cpk_loaded, cpk_unloaded } =
    vehicleData || {
      vehicle_number: "",
      type: "",
      capacity: "",
      cpk_loaded: "",
      cpk_unloaded: "",
    };

  const [formData, setFormData] = useState({
    vehicle_number: vehicle_number,
    type: type,
    capacity: capacity,
    cpk_loaded: cpk_loaded,
    cpk_unloaded: cpk_unloaded,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateVehicle = () => {
    setIsLoading(true);
    if (Object.values(formData).every((value) => value !== "")) {
      httpClient
        .put(
          `${BASE_URL}${API_END_POINTS.VEHICLE}/${vehicleData?.vehicle_id}`,
          {
            type: formData.type,
            capacity: formData.capacity,
            cpk_loaded: formData.cpk_loaded,
            cpk_unloaded: formData.cpk_unloaded,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("VEHICLE : ", res);
          toast.success("Vehicle updated successfully");

          mutate(`${BASE_URL}${API_END_POINTS.VEHICLE}`);
          onClose();
        })
        .catch((err) => {

          console.log("ERR Ve: ", err);
          toast.error("Failed to Update vehicle");
          
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please fill all required fields");
    }
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
          disabled={true}
          customInputClass="bg-gray-400 text-white rounded-md h-10 w-[400px]"
        />

        <Dropdown
          name={type}
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
          name={capacity}
          options={["3", "5", "7", "15"]}
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
          value={formData.cpk_loaded.toString()}
          label={"Fuel Cost Loaded (per km /-)"}
          onChange={handleChange}
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
        />

        <InputField
          id="cpk_unloaded"
          name="cpk_unloaded"
          placeholder="180"
          type="number"
          value={formData.cpk_unloaded.toString()}
          label={"Fuel Cost Unloaded (per km /-)"}
          onChange={handleChange}
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
        />

        {isLoading ? (
          <div className="flex flex-auto justify-end items-end ">
            <button
              type="button"
              onClick={handleUpdateVehicle}
              className="p-2 bg-green-800 hover:bg-secondary hover:text-green-200 text-white rounded-md mt-8"
            >
              Updating...
            </button>
          </div>
        ) : (
          <div className="flex flex-auto justify-end items-end ">
            <button
              type="button"
              onClick={handleUpdateVehicle}
              className="p-2 bg-primary hover:bg-secondary hover:text-black text-white rounded-md mt-8"
            >
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateVehicleForm;
