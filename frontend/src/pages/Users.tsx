import AddUserModal from "@/components/Modals/User/AddUserModal";
import NewUserTable from "@/components/Table/UserTable";
import Layout from "@/layout/Layout";
import { useState } from "react";

const Users = () => {
  const [showAddUserModalModal, setShowAddUserModalModal] =
    useState<boolean>(false);

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl">Users</p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowAddUserModalModal(!showAddUserModalModal)}
          >
            + New User
          </button>
        </div>

        {showAddUserModalModal && (
          <AddUserModal
            isOpen={showAddUserModalModal}
            onClose={() => setShowAddUserModalModal(false)}
          />
        )}

        {/* user table */}
        <div className="flex-1 mt-6">
          <NewUserTable />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
