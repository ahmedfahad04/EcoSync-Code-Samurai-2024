import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ILandfill } from "@/models/Landfill";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import MapLocation from "../STS/MapLocation";

interface EditLandfillFormProps {
  landfillData: ILandfill | undefined;
  onClose: () => void;
}

const EditLandfillForm: React.FC<EditLandfillFormProps> = ({
  landfillData,
  onClose,
}) => {
  const {
    landfill_name,
    opening_time,
    closing_time,
    capacity,
    gps_coordinate,
  } = landfillData || {
    landfill_name: "",
    opening_time: "",
    closing_time: "",
    capacity: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState({
    landfill_name: landfill_name,
    opening_time: opening_time,
    closing_time: closing_time,
    capacity: capacity,
    latitude: gps_coordinate[0],
    longitude: gps_coordinate[1],
  });

  const [isLoading, setIsLoading] = useState<boolean>();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handeSaveChanges = () => {
    if (Object.values(formData).every((value) => value !== "")) {
      setIsLoading(true);

      // to update other info
      httpClient
        .put(
          `${BASE_URL}${API_END_POINTS.LANDFILL}/${landfillData?.landfill_id}`,
          {
            landfill_name: formData.landfill_name,
            capacity: formData.capacity,
            opening_time: formData.opening_time,
            closing_time: formData.closing_time,
            // gps_coordinate: `${formData.latitude}, ${formData.longitude}`,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("RES", res);
          toast.success("Landfill updated Successfully");
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
              type="button"
              onClick={handeSaveChanges}
              className="p-2 bg-primary hover:bg-secondary hover:text-black text-white rounded-md mt-8"
            >
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLandfillForm;
