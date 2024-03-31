import { HouseSiding, LocationCity } from "@mui/icons-material";
import { CarIcon } from "lucide-react";
import { useEffect } from "react";

const BillPage = ({ result }) => {
  const formattedDate = (givenDate) => {
    const date = new Date(givenDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random 6-digit number
    return `D-${randomNumber.toString().padStart(6, "0")}`; // Ensures the number is 6 digits long
  };

  useEffect(() => {
    console.log("BILL: ", result);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Invoice</h1>
            <div className="text-right">
              <p className="text-xs">INVOICE NUMBER</p>
              <p className="font-bold text-sm">{generateInvoiceNumber()}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-xs">INVOICE DATE</p>
              <p className="font-bold text-sm">
                {formattedDate(result.createdAt)}
              </p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <CarIcon className="h-5 w-5 text-gray-500 mr-2" />{" "}
                {/* Lucid Car icon */}
                <div>
                  <p className="text-xs font-bold">Vehicle Number</p>
                  <p className="text-sm text-green-600">
                    {result.vehicle.vehicle_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <HouseSiding className="h-5 w-5 text-gray-500 mr-2" />{" "}
                {/* Lucid UserCircle icon */}
                <div>
                  <p className="text-xs font-bold">STS Name</p>
                  <p className="text-sm text-green-600">{result.sts_name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <LocationCity className="h-5 w-5 text-gray-500 mr-2" />{" "}
                {/* Lucid LocationMarker icon */}
                <div>
                  <p className="text-xs font-bold">Landfill Name</p>
                  <p className="text-sm text-green-600">
                    {result.landfill_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-lg font-bold text-left">Description</th>
                    <th className="text-xs font-bold text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm">Cost Per KM (Loaded)</td>
                    <td className="text-sm text-right">
                      {result.vehicle.cpk_unloaded}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm">Cost Per KM (Un Loaded)</td>
                    <td className="text-sm text-right">
                      {result.vehicle.cpk_loaded}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm">Waste Volume (Ton)</td>
                    <td className="text-sm text-right">
                      {result.waste_volume}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm">Vehicle Capacity (Ton)</td>
                    <td className="text-sm text-right">
                      {result.vehicle.capacity}
                    </td>
                  </tr>

                  <hr className="w-full my-3" />
                  <tr>
                    <td className="text-xl font-bold">Total Cost</td>
                    <td className="text-xl font-bold text-right text-blue-700">
                      {result.total_cost.toFixed(2)} /-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPage;
