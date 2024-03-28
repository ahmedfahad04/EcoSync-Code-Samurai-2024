import { ReactNode } from 'react';

interface ModalBodyProps {
  customClass?: string;
  children?: ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ customClass = '', children }: ModalBodyProps) => {
  return <div className={`px-10 ${customClass}`}>{children}</div>;
};

export default ModalBody;
