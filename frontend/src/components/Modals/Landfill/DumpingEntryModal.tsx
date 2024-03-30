import DumpingEntryForm from "@/components/Forms/Landfill/DumpingEntryForm";
import ModalLayout from "@/layout/ModalLayout";
import { ILandfill } from "@/models/Landfill";
import React, { useEffect } from "react";

interface DumpingEntryModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  landfillData: ILandfill | undefined;
}

const DumpingEntryModal: React.FC<DumpingEntryModalProps> = ({
  isOpen,
  customClass = "w-[620px] flex flex-col justify-center item-center",
  onClose,
  landfillData,
}) => {
  useEffect(() => {
    console.log("...", landfillData);
  }, []);
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add Waste Dumping Entry"}
      customClass={customClass}
    >
      <DumpingEntryForm data={landfillData} onClose={onClose} mode={"Create"} />
    </ModalLayout>
  );
};

export default DumpingEntryModal;
