import TableSkeleton from "@/components/Table/TableSkeleton";
import {
  IActionButtonDropdownOption,
  ICheckboxData,
  ITableHeaderAction,
} from "@/models/Common";

import Table from "@/components/Table/Table";
import TableRow from "@/components/Table/TableRow";
import { IUsers } from "@/models/Users";
import Chip from "@/ui/Chip";
import { createAvatar } from "@/utils/CreateAvatart";
import { formattedDate } from "@/utils/formatDate";
import avatar from "../../public/avatar.png";

interface UserTableProps {
  id: string;
  users: Array<IUsers>;
  loading: boolean;
  lastRowRef: React.Ref<HTMLTableRowElement>;
  checkedRow: Set<string>;
  actions: Array<ITableHeaderAction>;
  options: Array<IActionButtonDropdownOption>;
  setCheckedRow: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const UserTable = ({
  id,
  users,
  loading,
  lastRowRef,
  checkedRow,
  actions,
  options,
  setCheckedRow,
}: UserTableProps) => {
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
      columnWidth={["28%", "15%", "25%", "18%", "15%"]}
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
              rowData={[
                createAvatar(avatar, user.name),
                <Chip data={user.role} type="user" />,
                user.email,
                user.phone,
                formattedDate(user.createdAt.toString()),
              ]}
              options={options}
              onChangeCheckbox={handleChangeRowCheckbox}
            />
          ))}
    </Table>
  );
};

export default UserTable;
