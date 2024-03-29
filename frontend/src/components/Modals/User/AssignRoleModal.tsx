import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { IRole, IUsers } from "@/models/Users";
import Dropdown from "@/ui/Dropdown";
import { httpClient } from "@/utils/httpClient";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface AssignRoleModalProps {
  isOpen: boolean;
  customClass?: string;
  user: IUsers | undefined;
  onClose: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const AssignRoleModal: React.FC<AssignRoleModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  user,
  onClose,
}) => {
  const { data: roles } = useSWR<IRole[]>(`${BASE_URL}/rbac/roles`, fetcher);
  const [roleOptions, setRoleOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleRoleAssign = () => {
    if (selectedRoleId && user) {
      httpClient
        .put(`${BASE_URL}${API_END_POINTS.USER}/${user?.user_id}/roles`, {
          role_id: selectedRoleId,
        })
        .then((res) => {
          console.log("res role", res);
          toast.success("Role Changed");
        })
        .catch((err) => {
          console.log("err: ", err);
          toast.error("Failed to Assign Role");
        });

      onClose();
    } else {
      toast.error("Please select a role");
    }
  };

  useEffect(() => {
    console.log("USER: ", user?.role.role_name);
    if (roles) {
      const filteredRoles = roles.filter(
        (role) => role.role_name !== "System Admin"
      );
      const roleOptionsData = filteredRoles.map((role) => ({
        id: role.role_id,
        name: role.role_name,
      }));
      setRoleOptions(roleOptionsData);
    }
  }, []);

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Change Password"}
      customClass={customClass}
    >
      <Dropdown
        name={user?.role.role_name}
        options={roleOptions.map((role) => role.name)}
        label="Update Role"
        customClass="mt-3 bg-slate-300/6"
        onSelect={(selectedOption) => {
          const selectedRole = roleOptions.find(
            (role) => role.name === selectedOption
          );
          if (selectedRole) {
            setSelectedRoleId(selectedRole.id);
          }
        }}
      />
      <button
        onClick={handleRoleAssign}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded w-2/4"
      >
        Assign Role
      </button>
    </ModalLayout>
  );
};

export default AssignRoleModal;
