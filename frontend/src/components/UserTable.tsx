import TableSkeleton from "@/components/Table/TableSkeleton";
import {
  IActionButtonDropdownOption,
  ICheckboxData,
  ITableHeaderAction,
} from "@/models/Common";

import Table from "@/components/Table/Table";
import TableRow from "@/components/Table/TableRow";
import { TooltipPosition } from "@/constants/Global";
import { IUsers } from "@/models/Users";
import { createAvatar } from "@/utils/CreateAvatart";
import avatar from "../../public/avatar.jpeg";

interface ContactTableProps {
  id: string;
  users: Array<IUsers>;
  loading: boolean;
  lastRowRef: React.Ref<HTMLTableRowElement>;
  checkedRow: Set<string>;
  actions: Array<ITableHeaderAction>;
  options: Array<IActionButtonDropdownOption>;
  setCheckedRow: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const ContactTable = ({
  id,
  users,
  loading,
  lastRowRef,
  checkedRow,
  actions,
  options,
  setCheckedRow,
}: ContactTableProps) => {
  const handleChangeHeaderCheckbox = ({ checked }: ICheckboxData) => {
    const temp = new Set<string>();
    if (checked) {
      const result = users?.reduce((acc, contact) => {
        acc.add(contact.userId);
        return acc;
      }, temp);

      setCheckedRow(result);
    } else {
      setCheckedRow(temp);
    }
  };

  const handleChangeRowCheckbox = ({ name, checked }: ICheckboxData) => {
    const temp = new Set(checkedRow);
    checked ? temp.add(name) : temp.delete(name);
    setCheckedRow(temp);
  };

  return (
    <Table
      id={id}
      headerData={["User", "Role", "Email", "Phone", "Create Date"]}
      columnWidth={["28%", "20%", "17%", "20%", "15%"]}
      checkBox={!!users.length}
      customTableClass="contact-table w-full no-scrollbar"
      isChecked={!!users.length && checkedRow.size === users.length}
      isAnyRowChecked={!!checkedRow.size}
      actions={actions}
      onChangeCheckbox={handleChangeHeaderCheckbox}
    >
      {loading || !users
        ? Array.from({ length: 10 }).map((_, index) => (
            <TableSkeleton key={index} />
          ))
        : users?.map((user: IUsers, index: number) => (
            <TableRow
              key={index}
              id={user.userId}
              observerRef={users.length == index + 1 ? lastRowRef : null}
              checkBox={true}
              isChecked={checkedRow.has(user.userId)}
              nameAndDesignation={createAvatar(avatar, user.name, user.role)}
              email={user.email}
              phoneNumber={user.phone}
              tooltipPosition={
                index === users.length - 1
                  ? TooltipPosition.TOP
                  : TooltipPosition.BOTTOM
              }
              options={options}
              onChangeCheckbox={handleChangeRowCheckbox}
            />
          ))}
    </Table>
  );
};

export default ContactTable;
