import { useEffect, useState } from 'react';

import { ICheckboxData } from '@renderer/models/Common';

interface CheckboxProps {
  id: string;
  name: string;
  initialChecked?: boolean;
  customClass?: string;
  onChangeCheckbox: (data: ICheckboxData) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  initialChecked = false,
  customClass = '',
  onChangeCheckbox,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleChangeCheckbox = () => {
    setIsChecked((prevState) => !prevState);
    onChangeCheckbox({ name, checked: !isChecked });
  };

  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={isChecked}
      className={`h-5 w-5 accent-primary ${customClass}`}
      onChange={handleChangeCheckbox}
    />
  );
};

export default Checkbox;
