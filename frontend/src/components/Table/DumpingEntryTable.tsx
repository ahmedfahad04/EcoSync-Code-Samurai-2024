import { IDumpingEntry } from "@/models/Landfill";
import { dummyDumpingData } from "@/utils/DummyData";
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import EditDumpingEntryModal from "../Modals/Landfill/EditDumpingEntryModal";

const DumpingEntryTable = () => {
  const [showDumpingEntryEditModal, setShowDumpingEntryEditModal] =
    useState<boolean>(false);

  const [dumpingEntry, setDumpingEntry] = useState<IDumpingEntry>();
  const [data, setData] = useState<IDumpingEntry[]>([]);

  const handleRowDelete = (index: string, closeWindow: () => void) => {
    if (window.confirm("Are you sure?")) {
      const newData = [...data];

      //! api call to delete entry
      newData.splice(parseInt(index), 1);
      setData(newData);
      closeWindow();
    }
  };

  useEffect(() => {
    //! fetch using useSWR
    setData(dummyDumpingData);
  }, []);

  const columns = useMemo<MRT_ColumnDef<IDumpingEntry>[]>(
    () => [
      {
        accessorKey: "STSName",
        header: "STS NAME",
        size: 150,
      },
      {
        accessorKey: "vehicleNumber",
        header: "VEHICLE NUMBER",
        size: 180,
      },
      {
        accessorKey: "wasteVolume",
        header: "WASTE VOLUME (TON)",
        size: 150,
      },
      {
        accessorKey: "arrivalTime",
        header: "ARRIVAL TIME",
        size: 150,
      },
      {
        accessorKey: "departureTime",
        header: "DEPARTURE TIME",
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
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MRT_ActionMenuItem
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit"
            onClick={() => {
              setDumpingEntry(row.original);
              setShowDumpingEntryEditModal(true);
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
              handleRowDelete(row.id, closeMenu);
            }}
            table={table}
          />,
        ]}
        // muiTableBodyRowProps={({ row }) => ({
        //   onClick: () => {
        //     setDumpingEntry(row.original);
        //     console.log(row.original);
        //     // setShowLandfillModal(true);
        //   },
        //   sx: { cursor: "pointer" },
        // })}
      />

      {showDumpingEntryEditModal && (
        <EditDumpingEntryModal
          isOpen={showDumpingEntryEditModal}
          onClose={() => setShowDumpingEntryEditModal(false)}
          data={dumpingEntry}
        />
      )}

      {/* {showLandfillModal && (
        <ViewLandfillModal
          isOpen={showLandfillModal}
          onClose={() => setShowLandfillModal(false)}
          dumpingEntry={dumpingEntry}
        />
      )} */}
    </div>
  );
};

export default DumpingEntryTable;
