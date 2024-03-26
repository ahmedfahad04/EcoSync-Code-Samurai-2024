import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import AddVechileForm from "../AddVechileForm";

interface AddVehicleModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddVehicle: React.FC<AddVehicleModalProps> = ({
  isOpen,
  customClass = "w-[480px] h-[550px]",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add new vehicle"}
      customClass={customClass}
    >
      <AddVechileForm />
    </ModalLayout>
  );
};

export default AddVehicle;
