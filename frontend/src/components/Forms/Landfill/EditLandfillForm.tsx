import LandfillManagerDropdown from "@/components/LandfillManagerDropdown";
import { ILandfill } from "@/models/Landfill";
import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

interface EditLandfillFormProps {
  landfillData: ILandfill | undefined;
  onClose: () => void;
}

const EditLandfillForm: React.FC<EditLandfillFormProps> = ({
  landfillData,
  onClose,
}) => {
  const {
    landfillName,
    openingTime,
    endingTime,
    capacity,
    latitude,
    longitude,
  } = landfillData || {
    landfillName: "",
    openingTime: "",
    endingTime: "",
    capacity: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState({
    landfillName: landfillName,
    openingTime: openingTime,
    endingTime: endingTime,
    capacity: capacity,
    latitude: latitude,
    longitude: longitude,
  });

  const [LandfillManager, setLandfillManagers] = useState([]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handeSaveChanges = () => {
    //! api call
    console.log("Form Data:", formData);
    console.log("MANAGERS: ", LandfillManager);
    onClose();
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
            id="landfillName"
            name="landfillName"
            placeholder="Nikunjo Landfill"
            value={formData.landfillName}
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
              id="openingTime"
              name="openingTime"
              type="time"
              placeholder="10:00"
              value={formData.openingTime}
              label={"Opening Time"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="endingTime"
              name="endingTime"
              type="time"
              placeholder="14:00"
              value={formData.endingTime}
              label={"Ending Time"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

          <div className="mt-3">
            <LandfillManagerDropdown
              managers={LandfillManager}
              setManager={setLandfillManagers}
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

          <div className="flex flex-auto justify-end items-end ">
            <button
              type="submit"
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
