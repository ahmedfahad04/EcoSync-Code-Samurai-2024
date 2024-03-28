const Label = ({
  title,
  value,
}: {
  title: string;
  value: string | number | undefined;
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{title}</label>
      <p className="bg-gray-200 p-2 rounded-md">{value}</p>
    </div>
  );
};

export default Label;
