import { IUsers } from "@/models/Users";
import Chip from "@/ui/Chip";
import { dummyUsers } from "@/utils/DummyData";
import { formattedDate } from "@/utils/formatDate";
import { Delete } from "@mui/icons-material";
import { EditIcon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";

const data = dummyUsers;

const NewUserTable = () => {
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
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon />}
            key="edit"
            label="Edit"
            onClick={() => alert(row.original.name)}
            table={table}
            className="bg-blue-200"
          />,
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={() => alert("Delete")}
            table={table}
          />,
        ]}
      />
    </div>
  );
};

export default NewUserTable;
