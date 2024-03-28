import ViewSTSForm from "@/components/Forms/STS/ViewSTSForm";
import ModalLayout from "@/layout/ModalLayout";
import { ISTS } from "@/models/STS";
import React from "react";

interface ViewSTSModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  stsData: ISTS | undefined;
}

const ViewSTSModal: React.FC<ViewSTSModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
  stsData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"View STS"}
      customClass={customClass}
    >
      <ViewSTSForm stsData={stsData} />
    </ModalLayout>
  );
};

export default ViewSTSModal;
