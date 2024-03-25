import { useEffect, useRef, useState } from "react";

import { IActionButtonDropdownOption } from "@/models/Common";
import { ActionButtonIcon } from "@/ui/Icons";

interface ActionButtonProps {
  id: string;
  options: Array<IActionButtonDropdownOption>;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  id = "",
  options,
}: ActionButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isDropdownOpen) document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  return (
    <div className="relative w-max">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="focus:outline-none"
      >
        <ActionButtonIcon />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-2/3 top-0 z-10 w-32 overflow-hidden rounded-md bg-slate-200 shadow-action-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-4 p-3 text-royal-indigo transition-all hover:bg-slate-300"
              onClick={() => option.onClickOption(id)}
            >
              <span>{option.icon}</span>
              <span className="text-xs">{option.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
