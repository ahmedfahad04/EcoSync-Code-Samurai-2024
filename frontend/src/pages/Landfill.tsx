import AddLandfillModal from "@/components/Modals/Landfill/AddLandfillModal";
import DumpingEntryTable from "@/components/Table/DumpingEntryTable";
import LandfillTable from "@/components/Table/LandfillTable";
import Layout from "@/layout/Layout";
import { Tab } from "@headlessui/react";
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

        {showCreateLandfillModal && (
          <AddLandfillModal
            isOpen={showCreateLandfillModal}
            onClose={() => setShowCreateLandfillModal(false)}
          />
        )}

        <Tab.Group>
          {/* will design if time demands */}
          <Tab.List className={"flex flex-row gap-2 mt-5 text-sm"}>
            <Tab className="ui-selected:bg-[#D9EDBF] ui-selected:rounded-full px-2 py-1 rounded-full ui-selected:text-green-700 ui-not-selected:bg-white ui-not-selected:border-gray-300 ui-not-selected:border-2 ui-selected:active:border-none">
              Landfill Details
            </Tab>
            <Tab className="ui-selected:bg-[#D9EDBF] ui-selected:rounded-full px-2 py-1 rounded-full ui-selected:text-green-700 ui-not-selected:bg-white ui-not-selected:border-gray-300 ui-not-selected:border-2">
              Waste Dumping Entries
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="flex-1 mt-8">
                <LandfillTable />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex-1 mt-8">
                <DumpingEntryTable />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
};

export default Landfill;
