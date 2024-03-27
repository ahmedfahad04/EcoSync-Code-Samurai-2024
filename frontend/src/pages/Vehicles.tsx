import AddVehicle from "@/components/Modals/AddVehicle";
import NewVehicleTable from "@/components/Table/VehicleTable";
import Layout from "@/layout/Layout";
import { useState } from "react";

const Vehicles = () => {
  const [showEditVehicleModal, setShowEditVehicleModal] =
    useState<boolean>(false);

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl">Vehicles</p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowEditVehicleModal(!showEditVehicleModal)}
          >
            + New Vehicles
          </button>
        </div>

        {showEditVehicleModal && (
          <AddVehicle
            isOpen={showEditVehicleModal}
            onClose={() => setShowEditVehicleModal(false)}
          />
        )}

        {/* vehicle table */}
        <div className="flex-1 mt-10">
          <NewVehicleTable />
        </div>
      </div>
    </Layout>
  );
};

export default Vehicles;
