import { ILandfill } from "@/models/Landfill";
import Label from "@/ui/Label";
import { dummyUsers } from "@/utils/DummyData";
import { InfoIcon } from "lucide-react";

interface ViewLandfillFormProps {
  landfillData: ILandfill | undefined;
}

const ViewLandfillForm: React.FC<ViewLandfillFormProps> = ({
  landfillData,
}) => {
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
        <Label title={"Landfill Name"} value={landfillData?.landfillName} />
        <Label title={"Landfill Capacity"} value={landfillData?.capacity} />

        {/* open & end */}

        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Opening Time"} value={landfillData?.openingTime} />
          </div>

          <div className="w-2/4">
            <Label title={"Ending Time"} value={landfillData?.endingTime} />
          </div>
        </div>

        {/* lat and long */}
        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Latitude"} value={landfillData?.latitude} />
          </div>

          <div className="w-2/4">
            <Label title={"Longitude"} value={landfillData?.longitude} />
          </div>
        </div>

        {/* insert map */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Map</label>
          {/* <img src={MapImage} alt="Map" className="h-40" /> */}
        </div>

        {/* manager list */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">
            Landfill Managers
          </label>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            {dummyUsers
              .filter((user) => user.role === "Landfill Manager")
              .map((manager, index) => (
                <div key={index} className="flex text-sm mr-4 w-full">
                  <p className="bg-gray-200 w-full p-2 font-semibold text-slate-500 hover:bg-slate-300 cursor-pointer">
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
