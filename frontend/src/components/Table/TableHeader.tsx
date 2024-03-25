import { ICheckboxData, ITableHeaderAction } from "@/models/Common";
import Checkbox from "@/ui/Checkbox";

export interface TableHeaderProps {
  id: string;
  headerData: Array<string>;
  columnWidth: Array<string>;
  checkBox?: boolean;
  isChecked?: boolean;
  isAnyRowChecked?: boolean;
  customTableHeaderClass?: string;
  actions?: Array<ITableHeaderAction>;
  onChangeCheckbox?: (data: ICheckboxData) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  id,
  headerData,
  columnWidth,
  checkBox = true,
  isChecked = false,
  isAnyRowChecked = false,
  customTableHeaderClass = "",
  actions = [],
  onChangeCheckbox = () => null,
}: TableHeaderProps) => {
  return (
    <thead className="sticky top-[78px] z-10 bg-grayish-blue text-xs font-medium text-dark-blue-gray bg-slate-100 h-16">
      <tr>
        {/* show checkbox */}
        {!!checkBox && (
          <th className={`px-3 py-3.5 ${customTableHeaderClass}`}>
            <Checkbox
              id={`rows-${id}`}
              name={`rows-${id}`}
              initialChecked={isChecked}
              customClass="flex !w-[18px] !h-[18px]"
              onChangeCheckbox={onChangeCheckbox}
            />
          </th>
        )}

        {/* table headers */}

        {headerData.map((item, index) => (
          <th
            key={item}
            className={`whitespace-normal break-words py-3 pr-2 ${
              index === 0 && "pl-2"
            } text-left text-lg  ${
              !checkBox && index === 0 && "pl-3"
            } ${customTableHeaderClass}`}
            style={{ width: columnWidth[index] }}
          >
            {item}
          </th>
        ))}

        {/* delete action */}
        <th className={customTableHeaderClass}>
          <div
            className={`flex w-20 justify-evenly ${
              isAnyRowChecked || isChecked ? "visible" : "invisible"
            }`}
          >
            {actions.map((item, index) => (
              <span key={index} onClick={item.onClickAction}>
                {item.icon}
              </span>
            ))}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
