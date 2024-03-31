import DepartureEntryForm from "@/components/Forms/STS/DepartureEntryForm";
import ModalLayout from "@/layout/ModalLayout";
import { ISTS } from "@/models/STS";
import React from "react";

interface DepartureEntryModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  stsData: ISTS | undefined;
}

const DepartureEntryModal: React.FC<DepartureEntryModalProps> = ({
  isOpen,
  customClass = "w-[550px] flex flex-col justify-center item-center",
  onClose,
  stsData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add Vehicle Departure Entry"}
      customClass={customClass}
    >
      <DepartureEntryForm data={stsData} onClose={onClose} mode={"Create"} />
    </ModalLayout>
  );
};

export default DepartureEntryModal;
