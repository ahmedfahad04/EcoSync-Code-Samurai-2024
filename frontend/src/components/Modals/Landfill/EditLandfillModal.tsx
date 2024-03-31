import EditLandfillForm from "@/components/Forms/Landfill/EditLandfillForm";
import ModalLayout from "@/layout/ModalLayout";
import { ILandfill } from "@/models/Landfill";
import React from "react";

interface EditLandfillModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  LandfillData: ILandfill | undefined;
}

const EditLandfillModal: React.FC<EditLandfillModalProps> = ({
  isOpen,
  customClass = "w-[550px] flex flex-col justify-center item-center",
  onClose,
  LandfillData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Edit Landfill Details"}
      customClass={customClass}
    >
      <EditLandfillForm landfillData={LandfillData} onClose={onClose} />
    </ModalLayout>
  );
};

export default EditLandfillModal;
