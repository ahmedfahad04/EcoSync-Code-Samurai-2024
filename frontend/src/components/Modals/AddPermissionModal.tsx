import { BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { IRole } from "@/models/Users";
import Label from "@/ui/Label";
import { httpClient } from "@/utils/httpClient";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PermissionDropDown from "../PermissionDropDown";

interface AddPermissionModalProps {
  isOpen: boolean;
  customClass?: string;
  permissions: string[];
  role: IRole;
  onClose: () => void;
}

const AddPermissionModal: React.FC<AddPermissionModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  permissions,
  role,
  onClose,
}) => {
  const [selectedPermission, setSelectedPermission] = useState();

  //! submit
  const handleCreateRole = () => {
    console.log(
      "PER: ",
      selectedPermission.map((p) => p.label)
    );

    httpClient
      .put(
        `${BASE_URL}/rbac/roles/${role.role_id}/permissions`,
        {
          permission_names: selectedPermission.map((p) => p.label),
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res role", res);
        toast.success("Permission Updated Successfully");
        onClose();
      })
      .catch((err) => {
        const errMsg = err.request.responseText.split(":")[1];
        const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
        toast.error(trimmedErrMsg);
      });
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedPermission(selectedOptions);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Assign Role"}
      customClass={customClass}
    >
      <div className="w-full">
        <Label title={"Role"} value={role.role_name} />
        <PermissionDropDown
          onSelectChange={handleSelectionChange}
          permissions={permissions}
        />
      </div>

      <button
        onClick={handleCreateRole}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-2/4"
      >
        Create
      </button>
    </ModalLayout>
  );
};

export default AddPermissionModal;
