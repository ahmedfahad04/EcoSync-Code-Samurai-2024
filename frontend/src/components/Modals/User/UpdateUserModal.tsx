import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import UpdateUserForm from "../../Forms/UpdateUserForm";

interface UpdateUserModalModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  userData:
    | {
        name: string;
        role: string;
        email: string;
        phone: string;
      }
    | undefined;
}

const UpdateUserModal: React.FC<UpdateUserModalModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
  userData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Update User"}
      customClass={customClass}
    >
      <UpdateUserForm userData={userData} onClose={onClose} />
    </ModalLayout>
  );
};

export default UpdateUserModal;
