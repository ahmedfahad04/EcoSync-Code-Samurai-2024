import { getRoleColor, getTruckTypeColor } from "@/utils/helpers";

const Chip = ({ data, type }: { data: string | undefined; type: string }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 font-medium ${
        type == "user" ? getRoleColor(data) : getTruckTypeColor(data)
      }`}
    >
      {data}
    </span>
  );
};

export default Chip;
