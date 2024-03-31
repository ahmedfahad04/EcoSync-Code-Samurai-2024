import STSManagerDropdown from "@/components/STSManagerDropdown";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { ISTS } from "@/models/STS";
import Label from "@/ui/Label";
import { httpClient } from "@/utils/httpClient";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AssignSTSManagerModalProps {
  isOpen: boolean;
  customClass?: string;
  sts: ISTS | undefined;
  onClose: () => void;
}

// const fetcher = (url: string) => fetch(url, { credentials: "include"}).then((res) => res.json()); // Fetcher function for SWR

const AssignSTSManagerModal: React.FC<AssignSTSManagerModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  sts,
  onClose,
}) => {
  const [selectedSTSManagerId, setSelectedSTSManagerId] = useState<string[]>();

  const handleSTSManagerAssign = () => {
    if (selectedSTSManagerId && selectedSTSManagerId.length > 0 && sts) {
      selectedSTSManagerId.forEach((manager) => {
        const managerId = manager.value;

        //! (will check later) Send API request for each selected STS manager
        httpClient
          .put(
            `${BASE_URL}${API_END_POINTS.STS}/${sts?.sts_id}/managers`,
            {
              manager_id: String(managerId),
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("res role", res);
            toast.success("STS Manager Changed");
          })
          .catch((err) => {
            const errMsg = err.request.responseText.split(":")[1];
            const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
            toast.error(trimmedErrMsg);
          });
      });

      // Close modal after successful role change for all selected STS managers
      onClose();
    } else {
      toast.error("Please select at least one STS manager");
    }
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedSTSManagerId(selectedOptions);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Assign STSManager"}
      customClass={customClass}
    >
      <div className="w-full">
        <Label title={"STS Name"} value={sts?.sts_name} />
        <STSManagerDropdown onSelectChange={handleSelectionChange} />
      </div>

      <button
        onClick={handleSTSManagerAssign}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-2/4"
      >
        Assign STSManager
      </button>
    </ModalLayout>
  );
};

export default AssignSTSManagerModal;
