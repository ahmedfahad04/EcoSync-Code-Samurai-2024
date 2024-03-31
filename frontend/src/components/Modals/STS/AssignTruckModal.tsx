import TruckDropdown from "@/components/TruckDropdown";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { ISTS } from "@/models/STS";
import Label from "@/ui/Label";
import { httpClient } from "@/utils/httpClient";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AssignTruckModalProps {
  isOpen: boolean;
  customClass?: string;
  sts: ISTS | undefined;
  onClose: () => void;
}

const AssignTruckModal: React.FC<AssignTruckModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  sts,
  onClose,
}) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string[]>();

  //! submit
  const handleTruckAssign = () => {
    if (selectedTruckId && selectedTruckId.length > 0 && sts) {
      selectedTruckId.forEach((truck) => {
        const truckId = truck.value;

        httpClient
          .put(
            `${BASE_URL}${API_END_POINTS.STS}/${sts?.sts_id}/vehicles`,
            {
              vehicle_id: String(truckId),
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("res role", res);
            toast.success("Vehicle Added to STS");
          })
          .catch((err) => {
            const errMsg = err.request.responseText.split(":")[1];
            const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
            toast.error(trimmedErrMsg);
          });
      });

      // Close modal after successful role change for all selected STS trucks
      onClose();
    } else {
      toast.error("Please select at least one STS truck");
    }
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedTruckId(selectedOptions);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Assign Truck"}
      customClass={customClass}
    >
      <div className="w-full">
        <Label title={"STS Name"} value={sts?.sts_name} />
        <TruckDropdown onSelectChange={handleSelectionChange} />
      </div>

      <button
        onClick={handleTruckAssign}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-2/4"
      >
        Assign Truck
      </button>
    </ModalLayout>
  );
};

export default AssignTruckModal;
