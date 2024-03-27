import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "./Icons";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  customInputClass?: string;
  id: string;
  name: string;
  value: string;
  label?: string;
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
      <div className="relative mt-3">
        {/* Label for input field */}
        {label.length > 0 && (
          <label htmlFor={id} className="text-black text-md font-medium">
            {label}
          </label>
        )}

        <input
          id={id}
          className={`w-full h-10 text-sm rounded-lg px-4 py-2.5 text-black placeholder:text-gray-400 placeholder:text-base focus:border-0 placeholder:font-light ${customInputClass}`}
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
      {label.length > 0 && (
        <label
          htmlFor={id}
          className="text-black w-full mb-1 mt-3 text-md font-medium"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full h-10 text-sm rounded-lg px-4 py-2.5 text-black placeholder:text-gray-400 placeholder:text-base focus:border-0 placeholder:font-light ${customInputClass}`}
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
