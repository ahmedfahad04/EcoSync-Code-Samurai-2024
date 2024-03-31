import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ISTS } from "@/models/STS";
import { IUsers } from "@/models/Users";
import { IVehicle } from "@/models/Vehicles";
import Label from "@/ui/Label";
import { InfoIcon } from "lucide-react";
import useSWR from "swr";

interface ViewSTSFormProps {
  stsData: ISTS | undefined;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const ViewSTSForm: React.FC<ViewSTSFormProps> = ({ stsData }) => {
  const { data: managers } = useSWR<IUsers[]>(
    `${BASE_URL}${API_END_POINTS.STS}/${stsData?.sts_id}/managers`,
    fetcher
  );

  const { data: vehicles } = useSWR<IVehicle[]>(
    `${BASE_URL}${API_END_POINTS.STS}/${stsData?.sts_id}/vehicles`,
    fetcher
  );

  return (
    <div className="container mx-auto p-4">
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>STS Information</span>
      </header>

      <div className="flex flex-col text-md gap-4 mt-5">
        <Label title={"STS Name"} value={stsData?.sts_name} />

        {/* ward & capacity */}

        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Ward Number"} value={stsData?.ward_number} />
          </div>

          <div className="w-2/4">
            <Label title={"STS Capacity (Ton)"} value={stsData?.capacity} />
          </div>
        </div>
        {/* lat and long */}
        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Latitude"} value={stsData?.gps_coordinate[0]} />
          </div>

          <div className="w-2/4">
            <Label title={"Longitude"} value={stsData?.gps_coordinate[1]} />
          </div>
        </div>

        {/* insert map */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Map</label>
          {/* <img src={MapImage} alt="Map" className="h-40" /> */}
        </div>

        {/* manager list */}
        <div className="flex flex-row gap-2 justify-between w-full">
          <div className="w-2/4">
            <label className="block text-gray-700 font-bold mb-2">
              STS Managers
            </label>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              {managers
                ?.filter((user) => user.name)
                .map((manager, index) => (
                  <div key={index} className="flex text-sm mr-4 w-full">
                    <p className="bg-green-200 w-full p-2 font-semibold text-black hover:bg-green-300 ">
                      {manager.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-2/4">
            <label className="block text-gray-700 font-bold mb-2">
              Assigned Vehicles
            </label>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              {vehicles
                ?.filter((vehicle) => vehicle.vehicle_number)
                .map((vehicle, index) => (
                  <div key={index} className="flex text-sm mr-4 w-full">
                    <p className="bg-amber-200 w-full p-2 font-semibold text-black hover:bg-amber-300 ">
                      {vehicle.vehicle_number}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSTSForm;
