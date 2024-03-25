import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "./Icons";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  customInputClass?: string;
  id: string;
  name: string;
  value: string;
  label?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  customInputClass = "",
  id,
  name,
  value,
  label = false,
  onChange,
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  if (type === "password") {
    return (
      <div className="relative">
        {/* Label for input field */}
        {label && (
          <label htmlFor={id} className="text-black text-md">
            {placeholder}
          </label>
        )}

        <input
          id={id}
          className={`w-full h-12 mt-1 rounded-lg px-4 py-2.5 text-black text-base border-2 border-[#9095A1FF] placeholder:text-gray-400 placeholder:text-base focus:border-0 placeholder:font-light ${customInputClass}`}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />

        {/* Icon for toggling password visibility */}
        {isPasswordVisible ? (
          <ShowPasswordIcon
            className="absolute top-2/3 right-4 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <HidePasswordIcon
            className="absolute top-2/3 right-4 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Label for input field */}
      {label && (
        <label htmlFor={id} className="text-black w-full mb-1 text-md">
          {placeholder}
        </label>
      )}

      <input
        id={id}
        className={`w-full h-12 rounded-lg px-4 py-2.5 text-black text-base border-2 border-[#9095A1FF] placeholder:text-gray-400 placeholder:text-base focus:border-0 placeholder:font-light ${customInputClass}`}
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
