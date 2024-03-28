import Dropdown from "@/ui/Dropdown";
import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import React, { useState } from "react";
import ImageUpload from "../ImageUpload";
import ChangePasswordModal from "../Modals/User/ChangePasswordModal";

interface UpdateUserFormProps {
  userData:
    | {
        name: string;
        role: string;
        email: string;
        phone: string;
      }
    | undefined;
  onClose: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  userData,
  onClose,
}) => {
  const [showChangePasswordModal, setShowChagngePasswordModal] =
    useState<boolean>(false);

  //! when user will update it he can't update the Role (be careful)
  const { name, role, email, phone } = userData || {
    name: "",
    role: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState({
    name: name,
    phone: phone,
    email: email,
    role: role,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateUser = () => {
    //! api call
    onClose();
    console.log("Form Data:", formData);
  };

  const handleOnImageUpload = (data: { image: File }) => {
    console.log(data.image.size);
  };

  const handleChangePasswordModal = () => {
    console.log("MODAL ", showChangePasswordModal);
    setShowChagngePasswordModal(true);
    // onClose();
  };

  return (
    <div className=" w-full mt-5">
      {/* header */}
      <header className="font-bold text-xl flex flex-row gap-2 items-center">
        <InfoIcon
          width={28}
          height={28}
          className="bg-primary text-white rounded-md p-2"
        />
        <span>User Information</span>
      </header>

      {/* image */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <ImageUpload name="User Photo" onUpload={handleOnImageUpload} />
      </div>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full">
          <InputField
            id="name"
            name="name"
            placeholder="Abdul Hadi"
            value={formData.name}
            label={"Full Name"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="phone"
            name="phone"
            placeholder="01766610021"
            value={formData.phone}
            label={"Phone Number"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="abdulhadi@gmail.com"
            value={formData.email}
            label={"Email"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <Dropdown
            name="Select User Role"
            options={["STS Manager", "Landfill Manager"]}
            label="Update Role"
            customClass="mt-3 bg-slate-300/6"
            onSelect={(selectedOption) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                role: selectedOption,
              }))
            }
          />

          <div className="flex flex-row justify-between items-center ">
            <button
              type="button"
              onClick={handleChangePasswordModal}
              className="p-2 bg-green-500 hover:bg-green-600  text-white rounded-md mt-8"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={handleUpdateUser}
              className="p-2 bg-red-500 hover:bg-red-600  text-white rounded-md mt-8"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {showChangePasswordModal && (
        <ChangePasswordModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChagngePasswordModal(false)}
        />
      )}
    </div>
  );
};

export default UpdateUserForm;
