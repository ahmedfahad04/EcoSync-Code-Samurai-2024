import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // fetch data
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
          {/* will start from here */}
          <Dropdown
            name="Select Landfill"
            options={landfills}
            label="Lanfill Name"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                landfillName: selectedOption,
              }))
            }
          />

          <Dropdown
            name="Select Vehicle"
            options={vehicles}
            label="Vehicle Number"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                landfillName: selectedOption,
              }))
            }
          />

          <Dropdown
            name="Select Trip"
            options={["1", "2", "3"]}
            label="Trip Number"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                landfillName: selectedOption,
              }))
            }
          />

          <InputField
            id="wasteVolume"
            name="wasteVolume"
            placeholder="DHAKA-D-11-9999"
            value={formData.wasteVolume}
            label={"Weight of wastes (in tonnes)"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <div className="w-full flex flex-row justify-center items-center gap-5">
            <InputField
              id="arrival"
              name="arrival"
              type="time"
              placeholder="10:00"
              value={formData.arrival}
              label={"Time of Arrival (at STS)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="departure"
              name="departure"
              type="time"
              placeholder="14:00"
              value={formData.departure}
              label={"Time of Departure (from STS)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

          {/*!! add map */}

          <div className="flex flex-auto justify-end items-end ">
            <button
              type="submit"
              onClick={handleCreate}
              className="p-2 bg-green-500 hover:bg-green-600  text-white rounded-md mt-8"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartureEntryForm;
