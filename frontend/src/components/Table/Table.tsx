import TableHeader, { TableHeaderProps } from "@/components/Table/TableHeader";

interface TableProps extends TableHeaderProps {
  children: React.ReactNode;
  customTableClass?: string;
  isAnyRowChecked?: boolean;
}

const Table: React.FC<TableProps> = ({
  id,
  headerData,
  columnWidth,
  checkBox,
  isChecked,
  isAnyRowChecked,
  actions,
  customTableClass = "",
  children,
  onChangeCheckbox,
}: TableProps) => {
  return (
    <table className={customTableClass}>
      <TableHeader
        id={id}
        headerData={headerData}
        columnWidth={columnWidth}
        checkBox={checkBox}
        isChecked={isChecked}
        isAnyRowChecked={isAnyRowChecked}
        actions={actions}
        onChangeCheckbox={onChangeCheckbox}
      />
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
