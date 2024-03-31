import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import InputField from "@/ui/InputField";
import Label from "@/ui/Label";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DumpingEntryFormProps {
  data: any;
  onClose: () => void;
}

const DumpingEntryForm: React.FC<DumpingEntryFormProps> = ({
  data,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    arrival: "",
    departure: "",
  });

  const handleCreate = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    httpClient
      .put(
        `${BASE_URL}${API_END_POINTS.TRIP}/${data.trip_id}/dumping`,
        {
          landfill_arrival_time: formData.arrival,
          landfill_dumping_time: formData.departure,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RES", res);
        toast.success("Dumping Confirmed");
        onClose();
      })
      .catch((err) => {
        const errMsg = err.request.responseText.split(":")[1];
        const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
        console.log("ERR", trimmedErrMsg);
        toast.error(trimmedErrMsg);
      });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("DATA: ", data);
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

          <Label title={"STS Name"} value={data.sts.sts_name} />
          <Label title={"Vehicle Number"} value={data.vehicle.vehicle_number} />
          <Label title={"Waste Volume (Ton)"} value={data.waste_volume} />

          <div className="w-full flex flex-row justify-center items-center gap-5">
            <InputField
              id="arrival"
              name="arrival"
              type="datetime-local"
              placeholder="10:00"
              value={formData.arrival}
              label={"Time of Arrival (at Landfill)"}
              onChange={handleChange}
              customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
            />
            <InputField
              id="departure"
              name="departure"
              type="datetime-local"
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
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DumpingEntryForm;
