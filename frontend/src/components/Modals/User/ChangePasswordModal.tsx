import ChangePasswordForm from "@/components/Forms/User/ChangePasswordForm";
import ModalLayout from "@/layout/ModalLayout";
import React from "react";

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
      <ChangePasswordForm onClose={onClose} />
    </ModalLayout>
  );
};

export default ChangePasswordModal;
