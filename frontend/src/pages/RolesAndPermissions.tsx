import AddPermissionModal from "@/components/Modals/AddPermissionModal";
import CreateRoleModal from "@/components/Modals/CreateRoleModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import { BASE_URL } from "@/constants/Service";
import Layout from "@/layout/Layout";
import { IPermission } from "@/models/Roles";
import { IRole } from "@/models/Users";
import { formattedDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const RolesAndPermissions = () => {
  const [showRoleCreationModal, setShowRoleCreationModal] =
    useState<boolean>(false);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<
    IPermission[]
  >([]);
  const [addPermissionModal, setAddPermissionModal] = useState<boolean>(false);
  const [unAssignedPermission, setUnAssignedPermission] = useState<string[]>(
    []
  );
  const [selecteRole, setSelectedRole] = useState<IRole>();
  const [selectePermission, setSelectedPermission] = useState<IPermission>();
  const [showDeletePermissionModal, setShowDeletePermissionModal] =
    useState<boolean>(false);

  const { data: userRoles } = useSWR<IRole[]>(
    `${BASE_URL}/rbac/roles`,
    fetcher
  );

  const { data: permissions } = useSWR<IPermission[]>(
    `${BASE_URL}/rbac/permissions`,
    fetcher
  );

  useEffect(() => {}, [selectedRolePermissions, permissions]);

  const handleShowPermission = async (role: IRole) => {
    const response = await fetch(
      `${BASE_URL}/rbac/roles/${role.role_id}/permissions`,
      { credentials: "include" }
    );
    if (response.ok) {
      const roleWisePermission: IPermission[] = await response.json();
      console.log(roleWisePermission);
      setSelectedRolePermissions(roleWisePermission);
      setSelectedRole(role);
    }
  };

  const handleAddPermission = async (role: IRole) => {
    const response = await fetch(
      `${BASE_URL}/rbac/roles/${role.role_id}/permissions`,
      { credentials: "include" }
    );
    if (response.ok) {
      const roleWisePermission: IPermission[] = await response.json();

      const unAssigned: IPermission[] = permissions?.filter((p) => {
        return !roleWisePermission.some(
          (roleP) => roleP.permission_id === p.permission_id
        );
      });

      console.log(
        "PER: ",
        unAssigned.map((p) => p.permission_name)
      );

      setSelectedRole(role);
      setUnAssignedPermission(unAssigned.map((p) => p.permission_name));
      setAddPermissionModal(true);
    }
  };

  const handleDeletePermission = (pid: string) => {
    setShowDeletePermissionModal(true);
    setSelectedPermission(pid);
  };

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

        {/* display the roles */}

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Available Roles
          </h2>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap space-x-4 py-4">
              {userRoles?.map((role) => (
                <div
                  key={role.role_id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {role.role_name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-4">
                    {formattedDate(role.createdAt)}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded"
                      onClick={() => handleAddPermission(role)}
                    >
                      Add Permissions
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold p-2 rounded"
                      onClick={() => handleShowPermission(role)}
                    >
                      View Permissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* permission */}
        <div className="container  mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            Permissions (
            {selectedRolePermissions.length >= 0
              ? selectedRolePermissions.length
              : permissions?.length}
            )
          </h2>
          <ul className="divide-y overflow-auto h-[400px] border-2 border-gray-300 p-3 divide-gray-200">
            {selectedRolePermissions.length >= 0
              ? selectedRolePermissions?.map((p) => (
                  <li key={p.permission_id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        {p.permission_name}
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeletePermission(p.permission_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              : permissions?.map((p) => (
                  <li key={p.permission_id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">
                        {p.permission_name}
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeletePermission(p.permission_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
        </div>

        {showRoleCreationModal && (
          <CreateRoleModal
            isOpen={showRoleCreationModal}
            onClose={() => setShowRoleCreationModal(false)}
          />
        )}

        {addPermissionModal && (
          <AddPermissionModal
            isOpen={addPermissionModal}
            onClose={() => setAddPermissionModal(false)}
            permissions={unAssignedPermission}
            role={selecteRole}
          />
        )}

        {/* url={`${BASE_URL}/rbac/roles/${selecteRole?.role_id}/permissions/${pid}`},
successTitle={ "Permission Removed"},
failureTitle={"Failed to remove permission"} */}
        {showDeletePermissionModal && (
          <DeleteModal
            url={`${BASE_URL}/rbac/roles/${selecteRole?.role_id}/permissions/${selectePermission?.permission_id}`}
            successTitle={"Permission Removed"}
            failureTitle={"Failed to remove permission"}
            onClose={() => setShowDeletePermissionModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default RolesAndPermissions;
