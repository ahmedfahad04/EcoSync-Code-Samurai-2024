import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ILandfill } from "@/models/Landfill";
import { IUsers } from "@/models/Users";
import Label from "@/ui/Label";
import { ClockIcon, InfoIcon } from "lucide-react";
import useSWR from "swr";

interface ViewLandfillFormProps {
  landfillData: ILandfill | undefined;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const ViewLandfillForm: React.FC<ViewLandfillFormProps> = ({
  landfillData,
}) => {
  
  const { data: managers } = useSWR<IUsers[]>(
    `${BASE_URL}${API_END_POINTS.LANDFILL}/${landfillData?.landfill_id}/managers`,
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
        <span>Landfill Information</span>
      </header>

      <div className="flex flex-col text-md gap-4 mt-5">
        <Label title={"Landfill Name"} value={landfillData?.landfill_name} />
        <Label title={"Landfill Capacity"} value={landfillData?.capacity} />

        {/* open & end */}

        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label
              title={"Opening Time"}
              value={landfillData?.opening_time}
              icon={
                <ClockIcon width={18} height={18} className="text-gray-500" />
              }
            />
          </div>

          <div className="w-2/4">
            <Label
              title={"Ending Time"}
              value={landfillData?.closing_time}
              icon={
                <ClockIcon width={18} height={18} className="text-gray-500" />
              }
            />
          </div>
        </div>

        {/* lat and long */}
        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Latitude"} value={landfillData?.gps_coordinate[0]} />
          </div>

          <div className="w-2/4">
            <Label title={"Longitude"} value={landfillData?.gps_coordinate[1]} />
          </div>
        </div>

        {/* insert map */}
        {/* <div>
          <label className="block text-gray-700 font-bold mb-2">Map</label>
          <img src={MapImage} alt="Map" className="h-40" />
        </div> */}

        {/* manager list */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">
            Landfill Managers
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
      </div>
    </div>
  );
};

export default ViewLandfillForm;
