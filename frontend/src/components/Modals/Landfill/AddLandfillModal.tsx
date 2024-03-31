import AddLandfillForm from "@/components/Forms/Landfill/AddLandfillForm";
import ModalLayout from "@/layout/ModalLayout";
import React from "react";

interface AddLandfillModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddLandfill: React.FC<AddLandfillModalProps> = ({
  isOpen,
  customClass = "w-[550px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add New Landfill"}
      customClass={customClass}
    >
      <AddLandfillForm onClose={onClose} />
    </ModalLayout>
  );
};

export default AddLandfill;
