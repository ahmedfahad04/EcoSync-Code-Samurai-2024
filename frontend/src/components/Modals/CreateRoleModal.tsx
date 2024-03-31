import { BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CreateRoleModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  isOpen,
  customClass = "w-[500px] flex flex-col justify-center item-center",
  onClose,
}) => {
  const [formData, setFormData] = useState({
    role_name: "",
  });

  //! submit
  const handleCreateRole = () => {
    httpClient
      .post(
        `${BASE_URL}/rbac/roles`,
        {
          role_name: formData.role_name,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res role", res);
        toast.success("Role Created Successfully");
        onClose();
      })
      .catch((err) => {
        const errMsg = err.request.responseText.split(":")[1];
        const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
        toast.error(trimmedErrMsg);
      });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Assign Role"}
      customClass={customClass}
    >
      <div className="w-full">
        <InputField
          id="role_name"
          name="role_name"
          placeholder="Bill Auditor"
          value={formData.role_name}
          label={"New Role"}
          onChange={(event) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              role_name: event.target.value,
            }))
          }
          customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
        />
      </div>

      <button
        onClick={handleCreateRole}
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-2/4"
      >
        Create
      </button>
    </ModalLayout>
  );
};

export default CreateRoleModal;
