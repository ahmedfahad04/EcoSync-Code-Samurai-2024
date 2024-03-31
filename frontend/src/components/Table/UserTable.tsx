import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IUsers } from "@/models/Users";
import Chip from "@/ui/Chip";
import { formattedDate } from "@/utils/formatDate";
import { Delete } from "@mui/icons-material";
import { EditIcon, UserIcon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import useSWR from "swr"; // Import useSWR hook
import AvatarWithDescription from "../AvatarWithDescription";
import AssignRoleModal from "../Modals/User/AssignRoleModal";
import DeleteUser from "../Modals/User/DeleteUser";
import UpdateUserModal from "../Modals/User/UpdateUserModal";
import avatar from "../../../public/avatar.png";

const fetcher = (url: string) => fetch(url, { credentials: "include"}).then((res) => res.json()); // Fetcher function for SWR

const NewUserTable = () => {
  const [showUpdateUserModal, setShowUpdateUserModal] =
    useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] =
    useState<boolean>(false);
  const [showAssignRoleModal, setShowAssignRoleModal] =
    useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<IUsers>();

  const [userData, setUserData] = useState<{
    name: string;
    role: string;
    email: string;
    phone_number: string;
    user_id: string;
  }>();

  const { data: users } = useSWR<IUsers[]>(
    `${BASE_URL}${API_END_POINTS.USER}`,
    fetcher
  );

  const columns = useMemo<MRT_ColumnDef<IUsers>[]>(
    () => [
      {
        accessorKey: "name",
        header: "USER",
        size: 180,
        Cell: ({ cell }) => {
          return (
            <AvatarWithDescription
              avatar={avatar}
              title={cell.getValue<string>()}
              customTitleClass="font-medium"
            />
          );
        },
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
      {
        accessorKey: "phone_number",
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
          row.original.role.role_name === "System Admin" ? (
            ""
          ) : (
            <MRT_ActionMenuItem
              icon={<UserIcon className="text-green-500" />}
              key="assignRole"
              label="Assign Role"
              onClick={() => {
                setSelectedUser(row.original);
                setShowAssignRoleModal(true);
                closeMenu();
              }}
              table={table}
            />
          ),

          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit"
            onClick={() => {
              setUserData({
                name: row.original.name,
                email: row.original.email,
                phone_number: row.original.phone_number,
                role: row.original.role?.role_name,
                user_id: row.original.user_id,
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
            onClick={() => {
              setShowDeleteUserModal(true);
              setSelectedUser(row.original);
              closeMenu();
            }}
            table={table}
          />,
        ]}
      />

      {showAssignRoleModal && (
        <AssignRoleModal
          isOpen={showAssignRoleModal}
          onClose={() => setShowAssignRoleModal(false)}
          user={selectedUser}
        />
      )}

      {showUpdateUserModal && (
        <UpdateUserModal
          isOpen={showUpdateUserModal}
          onClose={() => setShowUpdateUserModal(false)}
          userData={userData}
        />
      )}

      {showDeleteUserModal && (
        <DeleteUser
          url={`${BASE_URL}${API_END_POINTS.USER}/${selectedUser?.user_id}`}
          onClose={() => setShowDeleteUserModal(false)}
        />
      )}
    </div>
  );
};

export default NewUserTable;
