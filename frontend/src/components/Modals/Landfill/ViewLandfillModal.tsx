import ViewLandfillForm from "@/components/Forms/Landfill/ViewLandfillForm";
import ModalLayout from "@/layout/ModalLayout";
import { ILandfill } from "@/models/Landfill";
import React from "react";

interface ViewLandfillModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  LandfillData: ILandfill | undefined;
}

const ViewLandfillModal: React.FC<ViewLandfillModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
  LandfillData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"View Landfill"}
      customClass={customClass}
    >
      <ViewLandfillForm landfillData={LandfillData} />
    </ModalLayout>
  );
};

export default ViewLandfillModal;
