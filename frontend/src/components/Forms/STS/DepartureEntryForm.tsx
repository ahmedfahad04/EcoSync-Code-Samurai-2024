import Dropdown from "@/ui/Dropdown";
import { dummyLandfill, dummyVehicles } from "@/utils/DummyData";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DepartureEntryFormProps {
  stsData: ISTS | undefined;
  onClose: () => void;
}

const DepartureEntryForm: React.FC<DepartureEntryFormProps> = ({
  stsData,
  onClose,
}) => {
  const [landfills, setLandfills] = useState<string[]>();
  const [vehicles, setVehicles] = useState<string[]>();
  const [wasteVolume, setWasteVolume] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  const [formData, setFormData] = useState({
    landfillName: "",
    vehiceleNumber: "",
    tripNumber: "",
    wasteVolume: "",
    arrival: "",
    departure: "",
  });

  const handleCreate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //! api call & validation
    console.log("Form Data:", formData);
    onClose();
  };

  useEffect(() => {
    const landfillNames = dummyLandfill.map((l) => l.landfillName);
    const vehicleNubers = dummyVehicles.map((v) => v.vehicleNumber);

    setLandfills(landfillNames);
    setVehicles(vehicleNubers);
  }, []);

  return (
    <div className=" w-full mt-5">
      {/* header */}
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>Departure Entry Details</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          {/* <InputField
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
          </div> */}

          {/* will start from here */}
          <Dropdown
            name="Select Landfill"
            options={landfills}
            label="Select Landfill Name"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                landfillName: selectedOption,
              }))
            }
          />

          {/*!! add map */}

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

export default DepartureEntryForm;
