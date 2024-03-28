import DepartureEntryForm from "@/components/Forms/STS/DepartureEntryForm";
import ModalLayout from "@/layout/ModalLayout";
import { IDepartureEntry } from "@/models/STS";
import React from "react";

interface EditDepartureEntryModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  data: IDepartureEntry | undefined;
}

const EditDepartureEntryModal: React.FC<EditDepartureEntryModalProps> = ({
  isOpen,
  customClass = "w-[550px] flex flex-col justify-center item-center",
  onClose,
  data,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add Vehicle Departure Entry"}
      customClass={customClass}
    >
      <DepartureEntryForm data={data} onClose={onClose} mode={"Edit"} />
    </ModalLayout>
  );
};

export default EditDepartureEntryModal;
