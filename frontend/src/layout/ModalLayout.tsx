import Modal from "@/components/Modals/ModalSkeleton/Modal";
import ModalBody from "@/components/Modals/ModalSkeleton/ModalBody";
import ModalHeader from "@/components/Modals/ModalSkeleton/ModalHeader";
import React from "react";

interface AddVehicleModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  children: React.ReactNode;
  headline: string;
}

const ModalLayout: React.FC<AddVehicleModalProps> = ({
  isOpen,
  customClass = "max-w-[500px] max-h-96 z-1000",
  onClose,
  children,
  headline,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customClass={`bg-slate-200 ${customClass}`}
    >
      <ModalHeader customClass="pt-5 pr-6 font-bold text-lg" onClose={onClose}>
        {headline}
      </ModalHeader>
      <hr className="my-3" />
      <ModalBody customClass="pb-9 flex flex-col justify-center items-center w-full">
        {children}
      </ModalBody>
    </Modal>
  );
};

export default ModalLayout;
