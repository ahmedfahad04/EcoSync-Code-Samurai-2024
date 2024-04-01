import MapPointer from "@/components/MapPointer";
import { BASE_URL } from "@/constants/Service";
import Layout from "@/layout/Layout";
import { formattedDate } from "@/utils/formatDate";
import { BusFront, GanttChart } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const Dashboard = () => {
  const { data: sts } = useSWR<any[]>(`${BASE_URL}/sts`, fetcher);
  const { data: landfills } = useSWR<any[]>(`${BASE_URL}/landfills`, fetcher);
  const { data: vehicles } = useSWR<any[]>(`${BASE_URL}/vehicles`, fetcher);
  const { data: trips } = useSWR<any[]>(`${BASE_URL}/trips`, fetcher);
  const { data: stsManagers } = useSWR<any[]>(
    `${BASE_URL}/users?role_name=STS Manager`,
    fetcher
  );
  const { data: landfillManagers } = useSWR<any[]>(
    `${BASE_URL}/users?role_name=Landfill Manager`,
    fetcher
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* map */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 w-full">
          <MapPointer />
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Top Cards */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex flex-row items-center text-purple-500">
              <GanttChart /> Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border p-4 text-center bg-blue-200 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-2 ">Registered STS</h4>
                <p className="text-2xl text-blue-600">{sts?.length}</p>
              </div>
              <div className="border p-4 text-center bg-green-200 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Registered Landfills
                </h4>
                <p className="text-2xl text-green-600">{landfills?.length}</p>
              </div>
              <div className="border p-4 text-center bg-yellow-200 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Registered Vehicles
                </h4>
                <p className="text-2xl text-yellow-600">{vehicles?.length}</p>
              </div>
              <div className="border p-4 text-center bg-purple-200 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Registered STS Managers
                </h4>
                <p className="text-2xl text-purple-600">
                  {stsManagers?.length}
                </p>
              </div>
              <div className="border p-4 text-center bg-red-200 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Registered Landfill Managers
                </h4>
                <p className="text-2xl text-red-600">
                  {landfillManagers?.length}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Dumping Status */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4  flex flex-row items-center text-blue-500 gap-2">
              <BusFront /> Latest Dumpings
            </h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Vehicle Number</th>
                  <th className="py-2 px-4">STS Name</th>
                  <th className="py-2 px-4">STS Departure Time</th>
                  <th className="py-2 px-4">Landfill Name</th>
                  <th className="py-2 px-4">Dumping Time</th>
                </tr>
              </thead>
              <tbody>
                {trips?.map((trips) => {
                  return (
                    <tr>
                      <td className="py-2 px-4">
                        {trips.vehicle.vehicle_number}
                      </td>
                      <td className="py-2 px-4">{trips.sts.sts_name}</td>
                      <td className="py-2 px-4 text-green-500 font-bold">{formattedDate(trips.sts_departure_time)}</td>
                      <td className="py-2 px-4">
                        {trips.landfill.landfill_name}
                      </td>
                      <td className="py-2 px-4">
                        {trips.landfill_dumping_time ? (
                          <p className="text-blue-500 font-bold">
                            {formattedDate(trips.landfill_dumping_time)}
                          </p>
                        ) : (
                          <p className="text-red-500 font-bold">
                            Not Dumped yet
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Other Content */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
