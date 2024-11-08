import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import AddUserForm from "../../Forms/User/AddUserForm";

interface AddUserModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add New User"}
      customClass={customClass}
    >
      <AddUserForm onClose={onClose}/>
    </ModalLayout>
  );
};

export default AddUserModal;
