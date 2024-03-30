import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { dummySTS, dummyVehicles } from "@/utils/DummyData";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DumpingEntryFormProps {
  data: any;
  onClose: () => void;
  mode: "Edit" | "Create";
}

const DumpingEntryForm: React.FC<DumpingEntryFormProps> = ({
  data,
  onClose,
  mode,
}) => {
  const [stsData, setSTSData] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);

  const { STSName, vehicle_number, wasteVolume, arrivalTime, departureTime } =
    data || {};

  const [formData, setFormData] = useState(
    mode === "Edit"
      ? {
          STSName: STSName || "",
          vehicle_number: vehicle_number || "",
          wasteVolume: wasteVolume || "",
          arrival: arrivalTime || "",
          departure: departureTime || "",
        }
      : {
          STSName: "",
          vehicle_number: "",
          wasteVolume: "",
          arrival: "",
          departure: "",
        }
  );

  const handleCreate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //! api call & validation
    console.log("Form Data:", formData);
    console.log("LANDFIL: ", data);

    onClose();
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // fetch data
  useEffect(() => {
    const STSData = dummySTS.map((l) => l.STSName);
    const vehicle_numbers = dummyVehicles.map((v) => v.vehicle_number); // Corrected variable name

    setSTSData(STSData);
    setVehicles(vehicle_numbers); // Corrected variable name
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
        <span>Dumping Entry Details</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          {/* will start from here */}

          {/* landfillId should be returned as selected option */}
          <Dropdown
            name={mode == "Edit" ? formData.STSName : "Select STS"}
            options={stsData}
            label="STS Name"
            customClass="mt-5 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                STSName: selectedOption,
              }))
            }
          />

          <Dropdown
            name={mode == "Edit" ? formData.vehicle_number : "Select Vehicle"}
            options={vehicles}
            label="Vehicle Number"
            customClass="mt-5 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                vehicle_number: selectedOption,
              }))
            }
          />

          <InputField
            id="wasteVolume"
            name="wasteVolume"
            placeholder="250"
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
              label={"Time of Arrival (at Landfill)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="departure"
              name="departure"
              type="time"
              placeholder="14:00"
              value={formData.departure}
              label={"Time of Departure (from Landfill)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

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

export default DumpingEntryForm;
