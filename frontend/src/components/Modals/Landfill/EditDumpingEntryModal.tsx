import DumpingEntryForm from "@/components/Forms/Landfill/DumpingEntryForm";
import ModalLayout from "@/layout/ModalLayout";
import { IDumpingEntry } from "@/models/Landfill";
import React from "react";

interface EditDumpingEntryModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  data: IDumpingEntry | undefined;
}

const EditDumpingEntryModal: React.FC<EditDumpingEntryModalProps> = ({
  isOpen,
  customClass = "w-[620px] flex flex-col justify-center item-center",
  onClose,
  data,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Confirm Dumping Entry"}
      customClass={customClass}
    >
      <DumpingEntryForm data={data} onClose={onClose} />
    </ModalLayout>
  );
};

export default EditDumpingEntryModal;
