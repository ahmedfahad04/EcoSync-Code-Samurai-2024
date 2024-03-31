import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ILandfill } from "@/models/Landfill";
import { IVehicle } from "@/models/Vehicles";
import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface DepartureEntryFormProps {
  data: any;
  onClose: () => void;
  mode: "Edit" | "Create";
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const DepartureEntryForm: React.FC<DepartureEntryFormProps> = ({
  data,
  onClose,
  mode,
}) => {
  const [landfills, setLandfills] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [vcapacity, setVCapacity] = useState<string>();

  const [formData, setFormData] = useState(
    mode == "Edit"
      ? {
          landfill_name: data.landfill.landfill_name || "",
          vehicle_number: data.vehicle.vehicle_number || "",
          trip: data.trip_number || "",
          wasteVolume: data.waste_volume || "",
          arrival: data.sts_arrival_time || "",
          departure: data.sts_departure_time || "",
        }
      : {
          landfill_name: "",
          vehicle_number: "",
          trip: "",
          wasteVolume: "",
          arrival: "",
          departure: "",
        }
  );

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // fetch data
  const { data: fetchedLandfills } = useSWR<ILandfill[]>(
    `${BASE_URL}${API_END_POINTS.LANDFILL}`,
    fetcher
  );

  const { data: fetchedVehicles } = useSWR<IVehicle[]>(
    `${BASE_URL}${API_END_POINTS.STS}/${data?.sts_id}/vehicles`,
    fetcher
  );

  // submit
  const handleCreate = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("FORM DATA: ", formData);

    // extract ids from name
    const landfillID = fetchedLandfills
      ?.filter((l) => l.landfill_name === formData.landfill_name)
      .map((l) => l.landfill_id);

    const vehicleID = fetchedVehicles
      ?.filter((v) => v.vehicle_number == formData.vehicle_number)
      .map((v) => v.vehicle_id);

    httpClient
      .post(
        `${BASE_URL}${API_END_POINTS.STS}/${data?.sts_id}/trips`,
        {
          vehicle_id: String(vehicleID),
          landfill_id: String(landfillID),
          waste_volume: formData.wasteVolume,
          trip_number: formData.trip,
          sts_arrival_time: formData.arrival,
          sts_departure_time: formData.departure,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RES", res);
        toast.success("Departure Entry added Successfully");
        onClose();
      })
      .catch((err) => {
        const errMsg = err.request.responseText.split(":")[1];
        const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
        console.log("ERR", trimmedErrMsg);
        toast.error(trimmedErrMsg);
      });
  };

  useEffect(() => {
    // console.log("DEPT: ", fetchedLandfills, fetchedVehicles);
    console.log("VEHICLE: ", data.vehicle_number);

    if (fetchedLandfills) {
      const names = fetchedLandfills.map((l) => l.landfill_name);
      setLandfills(names);
    }

    if (fetchedVehicles) {
      const vehicleNumbers = fetchedVehicles.map((v) => v.vehicle_number);
      setVehicles(vehicleNumbers);
    }

    setLandfills(fetchedLandfills?.map((l) => l.landfill_name));
    setVehicles(fetchedVehicles?.map((v) => v.vehicle_number));
  }, []);

  useEffect(() => {
    const vehicle_capacity = fetchedVehicles
      ?.filter((v) => v.vehicle_number == formData.vehicle_number)
      .map((v) => v.capacity);

    setVCapacity(vehicle_capacity);
  }, [formData]);

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
            name={
              mode == "Edit" ? data.vehicle.vehicle_number : "Select Vehicle"
            }
            options={vehicles}
            label="Vehicle Number"
            customClass="mt-5 bg-slate-300/6"
            onSelect={(selectedOption) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                vehicle_number: selectedOption,
              }));
            }}
          />

          <Dropdown
            name={mode == "Edit" ? formData.trip : "Select Trip"}
            options={["1", "2", "3"]}
            label="Trip Number"
            customClass="mt-5 mb-4 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                trip: selectedOption,
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

          <div className="w-full flex flex-row justify-center items-center gap-5 mt-5">
            <InputField
              id="arrival"
              name="arrival"
              type="datetime-local"
              placeholder="10:00"
              value={formData.arrival}
              label={"Time of Arrival (at STS)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="departure"
              name="departure"
              type="datetime-local"
              placeholder="14:00"
              value={formData.departure}
              label={"Time of Departure (from STS)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
          </div>

          {/*!! add map */}
          {/* landfillId should be returned as selected option */}
          <Dropdown
            name={mode === "Edit" ? formData.landfill_name : "Select Landfill"}
            options={landfills}
            label="Landfill Name"
            customClass="mt-5 bg-slate-300/6"
            onSelect={(selectedOption) => {
              // Set the selected landfill name and ID in the formData
              setFormData((prevFormData) => ({
                ...prevFormData,
                landfill_name: selectedOption,
              }));
            }}
          />

          {vcapacity?.length != 0 && (
            <div className="w-full flex items-center justify-center">
              <p className="mt-3 font-medium text-gray-700 flex flex-row justify-center p-2 gap-2 bg-gray-100 w-full">
                <InfoIcon width={16} /> Waste weight should be less than{" "}
                <span className="font-bold text-red-500">
                  {" "}
                  {vcapacity} Ton
                </span>
              </p>
            </div>
          )}

          <div className="flex flex-auto justify-end items-end ">
            <button
              type="button"
              onClick={handleCreate}
              className="p-2 bg-green-500 hover:bg-green-600  text-white rounded-md mt-8"
            >
              {mode == "Edit" ? "Update Entry" : "Add Entrys"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartureEntryForm;
