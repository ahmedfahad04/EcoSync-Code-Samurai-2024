import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ISTS } from "@/models/STS";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import MapLocation from "./MapLocation";

interface EditSTSFormProps {
  stsData: ISTS | undefined;
  onClose: () => void;
}

const EditSTSForm: React.FC<EditSTSFormProps> = ({ stsData, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const { sts_name, ward_number, capacity, gps_coordinate } = stsData || {
    sts_name: "",
    ward_number: "",
    capacity: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState({
    sts_name: sts_name,
    ward_number: ward_number,
    capacity: capacity,
    latitude: gps_coordinate[0],
    longitude: gps_coordinate[1],
  });

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

      console.log({
        sts_name: formData.sts_name,
        ward_number: formData.ward_number,
        capacity: formData.capacity,
        gps_coordinate: [formData.latitude, formData.longitude],
      });

      // to update other info
      httpClient
        .put(
          `${BASE_URL}${API_END_POINTS.STS}/${stsData?.sts_id}`,
          {
            sts_name: formData.sts_name,
            ward_number: formData.ward_number,
            capacity: formData.capacity,
            gps_coordinate: [formData.latitude, formData.longitude],
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("RES", res);
          toast.success("STS updated Successfully");
          mutate(`${BASE_URL}${API_END_POINTS.TRIP}`);

          onClose();
        })
        .catch((err) => {
          const errMsg = err.request.responseText.split(":")[1];
          const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
          console.log("ERR", err);
          toast.error(trimmedErrMsg);
        });

      setIsLoading(false);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  useEffect(() => {
    console.log("GPS ", gps_coordinate[0]);
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
        <span>STS Information</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          <InputField
            id="sts_name"
            name="sts_name"
            placeholder="Nikunjo STS"
            value={formData.sts_name}
            label={"STS Name"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="ward_number"
            name="ward_number"
            type="number"
            placeholder="28"
            value={formData.ward_number}
            label={"Ward Number"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="capacity"
            name="capacity"
            type="number"
            placeholder="300"
            value={formData.capacity.toString()}
            label={"STS Capacity (in tonnes)"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

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

          {isLoading ? (
            <button
              type="button"
              className="p-2 bg-red-800 hover:bg-red-600  text-white rounded-md mt-8"
              disabled={true}
            >
              Updating...
            </button>
          ) : (
            <button
              type="button"
              onClick={handeSaveChanges}
              className="p-2 bg-red-500 hover:bg-red-600  text-white rounded-md mt-8"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditSTSForm;
