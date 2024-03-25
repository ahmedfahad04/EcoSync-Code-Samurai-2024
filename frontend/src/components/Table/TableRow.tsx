import ActionButton from "@/components/ActionButton";
import { TooltipPosition } from "@/constants/Global";
import { IActionButtonDropdownOption, ICheckboxData } from "@/models/Common";
import Checkbox from "@/ui/Checkbox";
import { formattedDate } from "@/utils/formatDate";

interface TableRowProps {
  id: string;
  observerRef?: React.Ref<HTMLTableRowElement>;
  checkBox?: boolean;
  isChecked?: boolean;
  name?: React.ReactNode;
  role?: string;
  email: string;
  phoneNumber: string;
  createDate: Date;
  tooltipPosition?: TooltipPosition;
  options: Array<IActionButtonDropdownOption>;
  customTableRowClass?: string;
  customTableDataClass?: string;
  onChangeCheckbox?: (data: ICheckboxData) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  id,
  observerRef,
  checkBox = false,
  isChecked = false,
  name,
  role,
  email,
  phoneNumber,
  createDate,
  options,
  customTableRowClass = "",
  customTableDataClass = "py-3",
  onChangeCheckbox = () => null,
}: TableRowProps) => {
  const getRoleColor = (role: string | undefined): string => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "STS Manager":
        return "bg-green-100 text-green-800";
      case "Landfil Manager":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-yellow-100 text-yellow-800"; // Default color
    }
  };

  return (
    <tr
      className={`text-sm font-mono ${customTableRowClass}`}
      ref={observerRef}
    >
      {!!checkBox && (
        <td className={`px-3 ${customTableDataClass}`}>
          <Checkbox
            id={`rows-${id}`}
            name={id}
            initialChecked={isChecked}
            customClass="flex !w-[18px] !h-[18px]"
            onChangeCheckbox={onChangeCheckbox}
          />
        </td>
      )}

      <td className={`pr-2 ${!checkBox && "pl-3"} ${customTableDataClass}`}>
        {name}
      </td>
      <td className={`pr-2 break-words text-left ${customTableDataClass}`}>
        <div className="flex">
          <span className={`rounded-full px-3 py-1 ${getRoleColor(role)}`}>
            {role}
          </span>
        </div>
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex">{email}</div>
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex ">{phoneNumber}</div>
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex ">{formattedDate(createDate.toString())}</div>
      </td>

      <td className={customTableDataClass}>
        <div className="flex items-center justify-center">
          <ActionButton id={id} options={options} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
