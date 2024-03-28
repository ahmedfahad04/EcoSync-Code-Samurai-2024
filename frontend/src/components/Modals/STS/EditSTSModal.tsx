import EditSTSForm from "@/components/Forms/STS/EditSTSForm";
import ModalLayout from "@/layout/ModalLayout";
import { ISTS } from "@/models/STS";
import React from "react";

interface EditSTSModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  stsData: ISTS | undefined;
}

const EditSTSModal: React.FC<EditSTSModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
  stsData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Edit STS Details"}
      customClass={customClass}
    >
      <EditSTSForm stsData={stsData} onClose={onClose} />
    </ModalLayout>
  );
};

export default EditSTSModal;
