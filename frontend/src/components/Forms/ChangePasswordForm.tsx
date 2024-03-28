import InputField from "@/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
  });

  const [captchaValue, setCaptchaValue] = useState();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangePassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if(formData.oldPass.length == 0) alert('Enter Old Password')
    if(formData.newPass.length == 0) alert('Enter New Password')

    //! logic to ensure change password
    console.log(formData)
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
        <span>Change Your Password</span>
      </header>

      {/* form */}
      <div className="flex flex-col justify-start items-start">
        <form className="mt-5 w-full" onSubmit={handleChangePassword}>
          <InputField
            id="oldPass"
            name="oldPass"
            type="password"
            placeholder="********"
            value={formData.oldPass}
            label={"Old Password"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          <InputField
            id="newPass"
            name="newPass"
            type="password"
            placeholder="********"
            value={formData.newPass}
            label={"New Password"}
            onChange={handleChange}
            customInputClass="bg-[#F3F4F6] border-b-3 rounded-tl-sm rounded-tr-sm rounded-bl-none rounded-br-none focus:border-none active:border-none h-10 rounded-md w-[400px] border-b border-solid border-black"
          />

          {/* captcha */}
          {/* To create yours goto: https://www.google.com/recaptcha/admin/create */}
          <div className="mt-3">
            <ReCAPTCHA
              sitekey="6LeMNqcpAAAAACH3HnZacYtsSyQDQF-G1a-MBJzm"
              onChange={(val) => setCaptchaValue(val)}
            />
          </div>

          <div className="flex flex-auto justify-end items-end ">
            <button
              type="submit"
              className={`p-2  rounded-md mt-8 ${
                !captchaValue
                  ? "bg-gray-500 text-white"
                  : "bg-green-500 hover:bg-green-600  text-white"
              }`}
              disabled={!captchaValue}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
