import { ISTS } from "@/models/STS";
import Label from "@/ui/Label";
import { dummyUsers } from "@/utils/DummyData";
import { InfoIcon } from "lucide-react";

interface ViewSTSFormProps {
  stsData: ISTS | undefined;
}

const ViewSTSForm: React.FC<ViewSTSFormProps> = ({ stsData }) => {
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
        <Label title={"STS Name"} value={stsData?.STSName} />

        {/* ward & capacity */}

        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Ward Number"} value={stsData?.wardNumber} />
          </div>

          <div className="w-2/4">
            <Label title={"STS Capacity (Ton)"} value={stsData?.capacity} />
          </div>
        </div>
        {/* lat and long */}
        <div className="w-full flex flex-row justify-between items-center gap-5">
          <div className="w-2/4">
            <Label title={"Latitude"} value={stsData?.latitude} />
          </div>

          <div className="w-2/4">
            <Label title={"Longitude"} value={stsData?.longitude} />
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
            STS Managers
          </label>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            {dummyUsers
              .filter((user) => user.role === "STS Manager")
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

export default ViewSTSForm;
