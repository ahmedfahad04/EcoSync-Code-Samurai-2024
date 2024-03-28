import STSTable from "@/components/Table/STSTable";
import Layout from "@/layout/Layout";
import { useState } from "react";

const STS = () => {
  const [showCreateSTSModal, setShowCreateSTSModal] = useState<boolean>(false);

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl break-words">
            Secondary Transfer Station (STS)
          </p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowCreateSTSModal(!showCreateSTSModal)}
          >
            + Create STS
          </button>
        </div>

        {/* {showCreateSTSModal && (
          <AddVehicleModal
            isOpen={showCreateSTSModal}
            onClose={() => setShowCreateSTSModal(false)} useState<boolean>(false);
          />
        )} */}

        {/* vehicle table */}
        <div className="flex-1 mt-10">
          <STSTable />
        </div>
      </div>
    </Layout>
  );
};

export default STS;
