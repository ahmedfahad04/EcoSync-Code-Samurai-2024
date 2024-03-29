import { IUsers } from "@/models/Users";
import Chip from "@/ui/Chip";
import { formattedDate } from "@/utils/formatDate";
import { Delete } from "@mui/icons-material";
import { EditIcon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import useSWR from "swr"; // Import useSWR hook
import UpdateUserModal from "../Modals/User/UpdateUserModal";

const fetcher = (url) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const NewUserTable = () => {
  const [showUpdateUserModal, setShowUpdateUserModal] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
    email: string;
    phone: string;
  }>();

  const { data: users } = useSWR<IUsers[]>(
    "http://localhost:3000/api/users",
    fetcher
  ); // Fetch user data using useSWR

  const columns = useMemo<MRT_ColumnDef<IUsers>[]>(
    () => [
      {
        accessorKey: "name",
        header: "USER",
        size: 180,
      },
      {
        accessorKey: "role.role_name",
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
      // {
      //   accessorKey: "phone_number",
      //   header: "PHONE",
      //   size: 150,
      // },
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
        <span className="font-bold">{users ? users.length : 0}</span> in total
      </p>
      <MaterialReactTable
        columns={columns}
        data={users || []}
        enableRowActions
        // positionActionsColumn="last"
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit"
            onClick={() => {
              setUserData({
                name: row.original.name,
                email: row.original.email,
                phone: row.original.phone_number,
                role: row.original.role?.role_name,
              });
              setShowUpdateUserModal(!showUpdateUserModal);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,
          <MRT_ActionMenuItem
            icon={<Delete className="text-red-500" />}
            key="delete"
            label="Delete"
            onClick={() => alert("Delete")}
            table={table}
          />,
        ]}
      />

      {showUpdateUserModal && (
        <UpdateUserModal
          isOpen={showUpdateUserModal}
          onClose={() => setShowUpdateUserModal(false)}
          userData={userData}
        />
      )}
    </div>
  );
};

export default NewUserTable;
