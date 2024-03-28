import AddSTSForm from "@/components/Forms/AddSTSForm";
import ModalLayout from "@/layout/ModalLayout";
import React from "react";

interface AddSTSModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddSTSModal: React.FC<AddSTSModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add New STS"}
      customClass={customClass}
    >
      <AddSTSForm />
    </ModalLayout>
  );
};

export default AddSTSModal;
