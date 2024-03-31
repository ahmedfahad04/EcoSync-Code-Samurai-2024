import DepartureEntryForm from "@/components/Forms/STS/DepartureEntryForm";
import ModalLayout from "@/layout/ModalLayout";
import React, { useEffect } from "react";

interface EditDepartureEntryModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  data: any;
}

const EditDepartureEntryModal: React.FC<EditDepartureEntryModalProps> = ({
  isOpen,
  customClass = "w-[550px] flex flex-col justify-center item-center",
  onClose,
  data,
}) => {
  useEffect(() => {
    console.log("DATA: ", data.vehicle);
  }, []);
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Update Vehicle Departure Entry"}
      customClass={customClass}
    >
      <DepartureEntryForm data={data} onClose={onClose} mode={"Edit"} />
    </ModalLayout>
  );
};

export default EditDepartureEntryModal;
