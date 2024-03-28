import LandfillTable from "@/components/Table/LandfillTable";
import Layout from "@/layout/Layout";
import { useState } from "react";

const Landfill = () => {
  const [showCreateLandfillModal, setShowCreateLandfillModal] =
    useState<boolean>(false);

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl break-words">Landfill Sites</p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowCreateLandfillModal(!showCreateLandfillModal)}
          >
            + New Landfill
          </button>
        </div>

        {/* {showCreateLandfillModal && (
          <AddLandfillModal
            isOpen={showCreateLandfillModal}
            onClose={() => setShowCreateLandfillModal(false)}
          />
        )} */}

        <div className="flex-1 mt-10">
          <LandfillTable />
        </div>
      </div>
    </Layout>
  );
};

export default Landfill;
