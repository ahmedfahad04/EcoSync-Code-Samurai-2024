import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import AddUserForm from "../Forms/AddUserForm";

interface AddUserModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddUser: React.FC<AddUserModalProps> = ({
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
      <AddUserForm />
    </ModalLayout>
  );
};

export default AddUser;
