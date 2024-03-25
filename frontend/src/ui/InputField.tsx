import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "./Icons";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  customInputClass?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  customInputClass = "",
  id,
  name,
  value,
  onChange,
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  if (type === "password") {
    return (
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-lg px-4 py-2.5 text-black text-base border-2 border-[#9095A1FF] placeholder:text-gray-300 placeholder:text-base focus:border-primary ${customInputClass}`}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />

        {/* Icon for toggling password visibility */}
        {isPasswordVisible ? (
          <ShowPasswordIcon
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <HidePasswordIcon
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <input
        id={id}
        className={`w-[550px] h-9 rounded-[4px] px-4 py-2.5 text-black text-base border-2 border-[#9095A1FF] placeholder:text-gray-300 placeholder:text-base focus:border-primary ${customInputClass}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};

export default InputField;
