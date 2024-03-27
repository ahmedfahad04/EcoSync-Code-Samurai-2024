import { IUsers } from "@/models/Users";
import Chip from "@/ui/Chip";
import { dummyUsers } from "@/utils/DummyData";
import { formattedDate } from "@/utils/formatDate";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { EditIcon, TrashIcon } from "lucide-react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import AddUser from "../Modals/AddUser";

const data = dummyUsers;

const NewUserTable = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

  const columns = useMemo<MRT_ColumnDef<IUsers>[]>(
    () => [
      {
        accessorKey: "name",
        header: "USER",
        size: 180,
      },
      {
        accessorKey: "role",
        header: "ROLE",
        size: 150,
        Cell: ({ cell }) => {
          return <Chip data={cell.getValue<string>()} type={"user"} />;
        },
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "PHONE",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "CREATION DATE",
        size: 50,
        type: "date",
        Cell: ({ cell }: { cell: any }) => {
          const dateStr = cell.getValue().toString();
          const onlyDate = formattedDate(dateStr);
          return onlyDate;
        },
      },
    ],
    []
  );

  return (
    <div>
      <p className="mb-5">
        <span className="font-bold">{data.length}</span> in total
      </p>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        // positionActionsColumn="last"
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MenuItem
            key="edit"
            onClick={() => {
              setShowAddUserModal(!showAddUserModal);
              closeMenu();
            }}
            className="flex gap-2"
          >
            <EditIcon size={20} />
            <span>Edit</span>
          </MenuItem>,

          <MenuItem
            key="delete"
            onClick={() => {
              console.info("Delete");
              closeMenu();
            }}
            className="flex gap-2"
          >
            <TrashIcon size={20} />
            <span>Delete</span>
          </MenuItem>,
        ]}
      />
      {showAddUserModal && (
        <AddUser
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
        />
      )}
    </div>
  );
};

export default NewUserTable;
