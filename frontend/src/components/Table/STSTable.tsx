import { ISTS } from "@/models/STS";
import { dummySTS } from "@/utils/DummyData";
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import EditSTSModal from "../Modals/STS/EditSTSModal";
import ViewSTSModal from "../Modals/STS/ViewSTSModal";

const data = dummySTS;

const STSTable = () => {
  const [showEditSTSModal, setShowEditSTSModal] = useState<boolean>();
  const [showSTSModal, setShowSTSModal] = useState<boolean>();
  const [STSData, setSTSData] = useState<ISTS>();

  const columns = useMemo<MRT_ColumnDef<ISTS>[]>(
    () => [
      {
        accessorKey: "STSName", //access nested data with dot notation
        header: "STS NAME",
        size: 180,
      },
      {
        accessorKey: "wardNumber", //access nested data with dot notation
        header: "WARD NUMBER",
        size: 150,
      },
      {
        accessorKey: "capacity", //access nested data with dot notation
        header: "CAPACITY (TON)",
        size: 150,
      },
      {
        accessorKey: "latitude", //access nested data with dot notation
        header: "LATITUDE",
        size: 150,
      },
      {
        accessorKey: "longitude", //access nested data with dot notation
        header: "LONGITUDE",
        size: 150,
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
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit"
            onClick={() => {
              setSTSData({
                STSName: row.original.STSName,
                wardNumber: row.original.wardNumber,
                capacity: row.original.capacity,
                longitude: row.original.longitude,
                latitude: row.original.latitude,
              });
              setShowEditSTSModal(true);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,
          <MRT_ActionMenuItem
            icon={<Trash2Icon className="text-red-500" />}
            key="delete"
            label="Delete"
            onClick={() => {
              alert("Delete");
              closeMenu();
            }}
            table={table}
          />,
        ]}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSTSData({
              STSName: row.original.STSName,
              wardNumber: row.original.wardNumber,
              capacity: row.original.capacity,
              longitude: row.original.longitude,
              latitude: row.original.latitude,
            });
            setShowSTSModal(true);
          },
          sx: { cursor: "pointer" },
        })}
      />

      {showEditSTSModal && (
        <EditSTSModal
          isOpen={showEditSTSModal}
          onClose={() => setShowEditSTSModal(false)}
          stsData={STSData}
        />
      )}

      {showSTSModal && (
        <ViewSTSModal
          isOpen={showSTSModal}
          onClose={() => setShowSTSModal(false)}
          stsData={STSData}
        />
      )}
    </div>
  );
};

export default STSTable;
