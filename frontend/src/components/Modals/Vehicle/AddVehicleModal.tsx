import ModalLayout from "@/layout/ModalLayout";
import React from "react";
import AddVechileForm from "../../Forms/Vehicle/AddVechileForm";

interface AddVehicleModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const AddVehicle: React.FC<AddVehicleModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Add New Vehicle"}
      customClass={customClass}
    >
      <AddVechileForm onClose={onClose} />
    </ModalLayout>
  );
};

export default AddVehicle;
