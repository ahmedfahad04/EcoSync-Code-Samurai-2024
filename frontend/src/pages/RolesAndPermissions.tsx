import CreateRoleModal from "@/components/Modals/CreateRoleModal";
import Layout from "@/layout/Layout";
import { useState } from "react";

const RolesAndPermissions = () => {
  const [showRoleCreationModal, setShowRoleCreationModal] =
    useState<boolean>(false);

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl">Roles & Permissions</p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowRoleCreationModal(true)}
          >
            + Create New Role
          </button>
        </div>

        {showRoleCreationModal && (
          <CreateRoleModal
            isOpen={showRoleCreationModal}
            onClose={() => setShowRoleCreationModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default RolesAndPermissions;
