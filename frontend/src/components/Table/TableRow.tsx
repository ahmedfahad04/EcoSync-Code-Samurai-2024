import ActionButton from "@/components/ActionButton";
import { TooltipPosition } from "@/constants/Global";
import { IActionButtonDropdownOption, ICheckboxData } from "@/models/Common";
import Checkbox from "@/ui/Checkbox";

interface TableRowProps {
  id: string;
  observerRef?: React.Ref<HTMLTableRowElement>;
  checkBox?: boolean;
  isChecked?: boolean;
  tooltipPosition?: TooltipPosition;
  options: Array<IActionButtonDropdownOption>;
  customTableRowClass?: string;
  customTableDataClass?: string;
  rowData: Array<React.ReactNode | string>;
  onChangeCheckbox?: (data: ICheckboxData) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  id,
  observerRef,
  checkBox = false,
  isChecked = false,
  options,
  customTableRowClass = "",
  customTableDataClass = "py-3",
  rowData = [],
  onChangeCheckbox = () => null,
}: TableRowProps) => {
  console.log("Data", rowData);
  return (
    <tr
      className={`text-sm font-mono ${customTableRowClass}`}
      ref={observerRef}
    >
      {/* fixed */}
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

      {/* variable */}
      {rowData?.map((item, id) => (
        <td
          key={id}
          className={`pr-2 break-words text-left ${customTableDataClass}`}
        >
          <div className="flex">{item}</div>
        </td>
      ))}

      {/* fixed */}
      <td className={customTableDataClass}>
        <div className="flex items-center justify-center">
          <ActionButton id={id} options={options} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
