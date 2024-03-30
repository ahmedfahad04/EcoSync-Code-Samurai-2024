import { IVehicle } from "@/models/Vehicles";
import Chip from "@/ui/Chip";
import { dummyVehicles } from "@/utils/DummyData";
import { formattedDate } from "@/utils/formatDate";
import { Delete } from "@mui/icons-material";
import { EditIcon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";

const data = dummyVehicles;

const NewVehicleTable = () => {
  const columns = useMemo<MRT_ColumnDef<IVehicle>[]>(
    () => [
      {
        accessorKey: "vehicle_number", //access nested data with dot notation
        header: "VEHICLE NUMBER",
        size: 180,
      },
      {
        accessorKey: "type", //access nested data with dot notation
        header: "TYPE",
        size: 150,
        Cell: ({ cell }) => {
          return <Chip data={cell.getValue<string>()} type={"vehicle"} />;
        },
      },
      {
        accessorKey: "capacity", //access nested data with dot notation
        header: "CAPACITY",
        size: 150,
      },
      {
        accessorKey: "createdAt", //access nested data with dot notation
        header: "REGISTERED DATE",
        size: 80,
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
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon />}
            key="edit"
            label="Edit"
            onClick={() => {
              alert(row.original.vehicle_number);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={() => {
              alert("Delete");
              closeMenu();
            }}
            table={table}
          />,
        ]}
      />
    </div>
  );
};

export default NewVehicleTable;
