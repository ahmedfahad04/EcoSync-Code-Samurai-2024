import ActionButton from "@/components/ActionButton";
import { TooltipPosition } from "@/constants/Global";
import { IActionButtonDropdownOption, ICheckboxData } from "@/models/Common";
import Checkbox from "@/ui/Checkbox";

interface TableRowProps {
  id: string;
  observerRef?: React.Ref<HTMLTableRowElement>;
  checkBox?: boolean;
  isChecked?: boolean;
  nameAndDesignation?: React.ReactNode;
  email: string;
  phoneNumber: string;
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
  nameAndDesignation,
  email,
  phoneNumber,
  tooltipPosition = TooltipPosition.TOP,
  options,
  customTableRowClass = "",
  customTableDataClass = "py-3",
  onChangeCheckbox = () => null,
}: TableRowProps) => {
  return (
    <tr
      className={`text-sm font-semibold ${customTableRowClass}`}
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
        {nameAndDesignation}
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex">{email}</div>
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex">{email}</div>
      </td>
      <td className={`pr-2 ${customTableDataClass}`}>
        <div className="flex">{phoneNumber}</div>
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
