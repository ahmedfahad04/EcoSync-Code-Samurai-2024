import { CrossIcon } from "@/ui/Icons";
import { ReactNode } from "react";

interface ModalHeaderProps {
  children?: ReactNode;
  customClass?: string;
  closeButtonPosition?: "right" | "left";
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  customClass = "",
  closeButtonPosition = "right",
  onClose,
}: ModalHeaderProps) => {
  return (
    <header
      className={`flex items-center justify-between px-4 ${
        closeButtonPosition === "left" ? "flex-row-reverse" : ""
      } ${customClass}`}
    >
      <div>{children}</div>
      <span
        className="flex cursor-pointer items-center justify-center"
        onClick={onClose}
      >
        <CrossIcon />
      </span>
    </header>
  );
};

export default ModalHeader;
