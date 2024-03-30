import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import MapLocation from "../STS/MapLocation";

const AddLandfillForm = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const [formData, setFormData] = useState({
    landfill_name: "",
    opening_time: "",
    closing_time: "",
    capacity: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({
    landfill_name: "",
    opening_time: "",
    closing_time: "",
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

  const handleCreate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (Object.values(formData).every((value) => value !== "")) {
      setIsLoading(true);
      httpClient
        .post(
          `${BASE_URL}${API_END_POINTS.LANDFILL}`,
          {
            landfill_name: formData.landfill_name,
            gps_coordinate: [formData.latitude, formData.longitude],
            capacity: formData.capacity,
            opening_time: formData.opening_time.toString() + ":00",
            closing_time: formData.closing_time.toString() + ":00",
          },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Landfill created Successfully");
          onClose();
        })
        .catch((err) => {
          console.log("ERR: ", err);
          toast.error(err.response.data.email);
        });

      setIsLoading(false);
    } else {
      toast.error("Please fill all required fields");
    }
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
        <span>Landfill Information</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          <InputField
            id="landfill_name"
            name="landfill_name"
            placeholder="Nikunjo Landfill"
            value={formData.landfill_name}
            label={"Landfill Name"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="capacity"
            name="capacity"
            type="number"
            placeholder="300"
            value={formData.capacity}
            label={"Landfill Capacity (in tonnes)"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <div className="w-full flex flex-row justify-center items-center gap-5">
            <InputField
              id="opening_time"
              name="opening_time"
              type="time"
              placeholder="10:00"
              value={formData.opening_time}
              label={"Opening Time"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="closing_time"
              name="closing_time"
              type="time"
              placeholder="14:00"
              value={formData.closing_time}
              label={"Ending Time"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

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

          {/*!! add map */}
          <div className="mt-3 border-2 border-black cursor-text flex flex-col justify-center items-center">
            <p className="text-red-500">Click on map for Lat & Lng</p>
            <MapLocation formData={formData} setFormData={setFormData} />
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

export default AddLandfillForm;
