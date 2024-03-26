import { useState } from "react";

import { ICheckboxData } from "@/models/Common";

interface ToggleProps {
  customClass?: string;
  checkedOnLabel?: string;
  checkedOffLabel?: string;
  id: string;
  name: string;
  initialChecked: boolean;
  onChangeToggle: (data: ICheckboxData) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  customClass = "",
  checkedOnLabel = "",
  checkedOffLabel = "",
  id,
  name,
  initialChecked = false,
  onChangeToggle,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const handleChangeToggle = () => {
    setIsChecked((prevState) => !prevState);
    onChangeToggle({ name, checked: !isChecked });
  };

  return (
    <label htmlFor={id} className={`flex items-center ${customClass}`}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChangeToggle}
        />
        <div
          className={`h-5 w-10 cursor-pointer rounded-full border-0.5 border-[#C9C9C9] transition-all duration-500 ${
            isChecked ? "bg-primary" : "bg-secondary"
          }`}
        />
        <div
          className={`absolute left-0.5 top-0.5 h-4 w-4 cursor-pointer rounded-xl bg-white shadow-toggle transition-all duration-500 ${
            isChecked ? "translate-x-5" : ""
          }`}
        />
      </div>
      <span className="ml-2">
        {isChecked ? checkedOnLabel : checkedOffLabel}
      </span>
    </label>
  );
};

export default Toggle;
