import { ISTS } from "@/models/STS";
import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import STSManagerDropdown from "../../STSManagerDropdown";

interface EditSTSFormProps {
  stsData: ISTS | undefined;
  onClose: () => void;
}

const EditSTSForm: React.FC<EditSTSFormProps> = ({ stsData, onClose }) => {
  const { STSName, wardNumber, capacity, latitude, longitude } = stsData || {
    STSName: "",
    wardNumber: "",
    capacity: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState({
    STSName: STSName,
    wardNumber: wardNumber,
    capacity: capacity,
    latitude: latitude,
    longitude: longitude,
  });

  const [stsManager, setSTSManagers] = useState([]);

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
    console.log("MANAGERS: ", stsManager);
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
            type="number"
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

          {/* sts dropdown */}
          <div className="mt-3">
            <STSManagerDropdown
              managers={stsManager}
              setManager={setSTSManagers}
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
              className="p-2 bg-green-500 hover:bg-green-600  text-white rounded-md mt-8"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSTSForm;
