import AddSTSFrom from "@/components/Forms/STS/AddSTSForm";
import ModalLayout from "@/layout/ModalLayout";
import React from "react";

interface AddSTSModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddSTSModal: React.FC<AddSTSModalProps> = ({
  isOpen,
  customClass = "w-[600px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add New STS"}
      customClass={customClass}
    >
      <AddSTSFrom />
    </ModalLayout>
  );
};

export default AddSTSModal;
