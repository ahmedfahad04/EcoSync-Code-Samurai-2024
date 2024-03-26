import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  customClass?: string;
  children?: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  customClass = "",
  children,
  onClose,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isOpen || modalRef?.current?.contains(event.target as Node)) {
      return;
    }
    onClose();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={`no-scrollbar fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-55 ${
        isOpen ? "flex flex-col" : "hidden"
      }`}
      onClick={handleModalClick}
      ref={modalRef}
    >
      <div className={`relative m-auto rounded-md bg-white ${customClass}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
