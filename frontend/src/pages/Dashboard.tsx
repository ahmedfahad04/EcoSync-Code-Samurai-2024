import Layout from "@/layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Top Cards */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border p-4 text-center">
                <h4 className="text-lg font-semibold mb-2">Total STS</h4>
                <p className="text-2xl">200</p>
              </div>
              <div className="border p-4 text-center">
                <h4 className="text-lg font-semibold mb-2">Total Landfills</h4>
                <p className="text-2xl">150</p>
              </div>
              <div className="border p-4 text-center">
                <h4 className="text-lg font-semibold mb-2">
                  Total Vehicle Count
                </h4>
                <p className="text-2xl">300</p>
              </div>
            </div>
          </div>
          {/* Recent Dumping Status */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Recent Dumping Status
            </h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">STS Name</th>
                  <th className="py-2 px-4">Vehicle Name</th>
                  <th className="py-2 px-4">Landfill Name</th>
                  <th className="py-2 px-4">Dumping Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4">Center</td>
                  <td className="py-2 px-4">Vehicle 1</td>
                  <td className="py-2 px-4">Landfill 1</td>
                  <td className="py-2 px-4">2024-03-31 12:00 PM</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          {/* Other Content */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Other Content</h3>
            <p>This is where you can add additional content.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
