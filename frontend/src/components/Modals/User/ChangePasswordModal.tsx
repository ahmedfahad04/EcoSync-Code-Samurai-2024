import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import AddUserForm from "../../Forms/AddUserForm";
import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";

interface ChangePasswordModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Change Password"}
      customClass={customClass}
    >
      <ChangePasswordForm />
    </ModalLayout>
  );
};

export default ChangePasswordModal;