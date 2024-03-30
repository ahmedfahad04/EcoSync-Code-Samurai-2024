interface LabelProps {
  title: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
  customTitleClass?: string;
  customLabelClass?: string;
}

const Label: React.FC<LabelProps> = ({
  title,
  value,
  icon,
  customTitleClass,
  customLabelClass,
}) => {
  return (
    <div>
      <label
        className={`block text-gray-700 font-medium mb-2 ${customTitleClass}`}
      >
        {title}
      </label>
      <p
        className={`bg-gray-200 p-2 rounded-md flex flex-row gap-2 items-center justify-start ${customLabelClass}`}
      >
        {icon} {value}
      </p>
    </div>
  );
};

export default Label;
