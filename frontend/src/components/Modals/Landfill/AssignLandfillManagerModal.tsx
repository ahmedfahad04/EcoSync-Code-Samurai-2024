import LandfillManagerDropdown from "@/components/LandfillManagerDropdown";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { ILandfill } from "@/models/Landfill";
import Label from "@/ui/Label";
import { httpClient } from "@/utils/httpClient";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AssignLandfillManagerModalProps {
  isOpen: boolean;
  customClass?: string;
  landfll: ILandfill | undefined;
  onClose: () => void;
}

// const fetcher = (url: string) => fetch(url, { credentials: "include"}).then((res) => res.json()); // Fetcher function for SWR

const AssignLandfillManagerModal: React.FC<AssignLandfillManagerModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  landfill,
  onClose,
}) => {
  const [selectedLandfillManagerId, setSelectedLandfillManagerId] =
    useState<string[]>();

  const handleLandfillManagerAssign = () => {
    if (
      selectedLandfillManagerId &&
      selectedLandfillManagerId.length > 0 &&
      landfill
    ) {
      selectedLandfillManagerId.forEach((manager) => {
        const managerId = manager.value;

        //! (will check later) Send API request for each selected Landfill manager
        httpClient
          .put(
            `${BASE_URL}${API_END_POINTS.LANDFILL}/${landfill?.landfill_id}/managers`,
            {
              manager_id: String(managerId),
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("res role", res);
            toast.success("Landfill Manager Changed");
          })
          .catch((err) => {
            const errMsg = err.request.responseText.split(":")[1];
            const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
            toast.error(trimmedErrMsg);
          });
      });

      // Close modal after successful role change for all selected Landfill managers
      onClose();
    } else {
      toast.error("Please select at least one Landfill manager");
    }
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedLandfillManagerId(selectedOptions);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Assign LandfillManager"}
      customClass={customClass}
    >
      <div className="w-full">
        <Label title={"Landfill Name"} value={landfill?.landfill_name} />
        <LandfillManagerDropdown onSelectChange={handleSelectionChange} />
      </div>

      <button
        onClick={handleLandfillManagerAssign}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-2/4"
      >
        Assign LandfillManager
      </button>
    </ModalLayout>
  );
};

export default AssignLandfillManagerModal;
