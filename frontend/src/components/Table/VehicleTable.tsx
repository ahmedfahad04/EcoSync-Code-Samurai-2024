import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IVehicle } from "@/models/Vehicles";
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
import useSWR from "swr";
import DeleteModal from "../Modals/DeleteModal";
import UpdateVehicleModal from "../Modals/Vehicle/UpdateVehicleModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const NewVehicleTable = () => {
  const [showUpdateVehicleModal, setShowUpdateVehicleModal] =
    useState<boolean>(false);
  const [showDeleteVehicleModal, setShowDeleteVehicleModal] =
    useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle>();

  const { data: vehicles } = useSWR<IVehicle[]>(
    `${BASE_URL}${API_END_POINTS.VEHICLE}`,
    fetcher
  );

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
        accessorKey: "cpk_loaded", //access nested data with dot notation
        header: "FUEL COST (LOADED)",
        size: 150,
      },
      {
        accessorKey: "cpk_unloaded", //access nested data with dot notation
        header: "FUEL COST (UNLOADED)",
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
        <span className="font-bold">{vehicles?.length}</span> in total
      </p>
      <MaterialReactTable
        columns={columns}
        data={vehicles || []}
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
              setSelectedVehicle(row.original);
              setShowUpdateVehicleModal(!showUpdateVehicleModal);
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
              setShowDeleteVehicleModal(true);
              setSelectedVehicle(row.original);
              closeMenu();
            }}
            table={table}
          />,
        ]}
      />

      {showUpdateVehicleModal && (
        <UpdateVehicleModal
          isOpen={showUpdateVehicleModal}
          onClose={() => setShowUpdateVehicleModal(false)}
          vehicleData={selectedVehicle}
        />
      )}

      {showDeleteVehicleModal && (
        <DeleteModal
          url={`${BASE_URL}${API_END_POINTS.VEHICLE}/${selectedVehicle?.vehicle_id}`}
          onClose={() => setShowDeleteVehicleModal(false)}
          successTitle={"Vehicle Removed Successfully!"}
          failureTitle={"Vehical Removal Failed!"}
        />
      )}
    </div>
  );
};

export default NewVehicleTable;
