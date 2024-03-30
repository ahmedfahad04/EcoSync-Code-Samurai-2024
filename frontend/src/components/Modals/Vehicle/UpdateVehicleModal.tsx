import UpdateVehicleForm from "@/components/Forms/Vehicle/UpdateVehicleForm";
import ModalLayout from "@/layout/ModalLayout";
import { IVehicle } from "@/models/Vehicles";
import React from "react";

interface UpdateVehicleModalModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  vehicleData: IVehicle | undefined;
}

const UpdateVehicleModal: React.FC<UpdateVehicleModalModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
  vehicleData,
}) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Update Vehicle"}
      customClass={customClass}
    >
      <UpdateVehicleForm vehicleData={vehicleData} onClose={onClose} />
    </ModalLayout>
  );
};

export default UpdateVehicleModal;
