import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { useAuth } from "@/context/AuthContext";
import InputField from "@/ui/InputField";
import { httpClient } from "@/utils/httpClient";
import { InfoIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import ImageUpload from "../../ImageUpload";
import ChangePasswordModal from "../../Modals/User/ChangePasswordModal";

interface UpdateUserFormProps {
  userData:
    | {
        user_id: string;
        name: string;
        role: string;
        email: string;
        phone_number: string;
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
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();

  //! when user will update it he can't update the Role (be careful)
  const { user_id, name, role, email, phone_number } = userData || {
    name: "",
    role: "",
    email: "",
    phone_number: "",
  };

  const [formData, setFormData] = useState({
    name: name,
    phone_number: phone_number,
    email: email,
    role: role,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validation
    if (name === "name") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: value.length < 2 ? "Name is too short" : "",
      }));
    } else if (name === "phone") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: !/^\d{11}$/.test(value) ? "Invalid phone number" : "",
      }));
    } else if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "",
      }));
    }
  };

  const handleUpdateUser = () => {
    console.log("ID: ", userData);
    if (Object.values(formData).every((value) => value !== "")) {
      setIsLoading(true);

      // to update other info
      httpClient
        .put(`${BASE_URL}${API_END_POINTS.USER}/${user_id}`, {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
        })
        .then(() => {
          toast.success("User updated Successfully");
          mutate(`${BASE_URL}${API_END_POINTS.USER}`);

          onClose();
        })
        .catch((err) => {
          const errMsg = err.request.responseText.split(":")[1];
          const trimmedErrMsg = errMsg.substr(1, errMsg.length - 3);
          console.log("ERR", trimmedErrMsg);
          toast.error(trimmedErrMsg);
        });

      setIsLoading(false);
    } else {
      toast.error("Please fill all required fields");
    }

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
    <div className=" w-full mt-5 z-1010">
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
            error={errors.name}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="phone_number"
            name="phone_number"
            placeholder="01766610021"
            value={formData.phone_number}
            label={"Phone Number"}
            onChange={handleChange}
            error={errors.phone_number}
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
            error={errors.name}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <div className="flex flex-row justify-between items-center ">
            {user?.role?.role_name === userData?.role && (
              <button
                type="button"
                onClick={handleChangePasswordModal}
                className="p-2 bg-green-500 hover:bg-green-600  text-white rounded-md mt-8"
              >
                Change Password
              </button>
            )}

            {isLoading ? (
              <button
                type="button"
                className="p-2 bg-red-800 hover:bg-red-600  text-white rounded-md mt-8"
                disabled={true}
              >
                Updating...
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUpdateUser}
                className="p-2 bg-red-500 hover:bg-red-600  text-white rounded-md mt-8"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>

      {/* only available to personal user */}
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
