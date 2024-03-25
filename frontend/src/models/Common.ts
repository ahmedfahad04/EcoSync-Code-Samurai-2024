export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ICheckboxData {
  name: string;
  checked: boolean;
}

export interface IImageUploadData {
  name: string;
  image: File;
}

export interface IOTPFieldData {
  e: React.KeyboardEvent<HTMLInputElement>;
  index: number;
}

export interface IActionButtonDropdownOption {
  icon: JSX.Element;
  text: string;
  onClickOption: (id: string) => void;
}

export interface ITableHeaderAction {
  icon: JSX.Element;
  onClickAction: () => void;
}
