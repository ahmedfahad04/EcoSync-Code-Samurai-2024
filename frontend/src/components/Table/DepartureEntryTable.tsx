import { dummyDepartureData } from "@/utils/DummyData";
// import { dummyLandfill } from "@/utils/DummyData"; // Importing static data
import { IDepartureEntry } from "@/models/STS";
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import EditDepartureEntryModal from "../Modals/STS/EditDepartureEntryModal";

const DepartureEntryTable = () => {
  const [showDepartureEntryEditModal, setShowDepartureEntryEditModal] =
    useState<boolean>(false);
  //   const [showLandfillModal, setShowLandfillModal] = useState<boolean>(false);

  const [departureEntry, setDepartureEntry] = useState<IDepartureEntry>();
  const [data, setData] = useState<IDepartureEntry[]>([]);

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
    setData(dummyDepartureData); // Set static data from dummyLandfill
  }, []); // Empty dependency array to run only once when component mounts

  const columns = useMemo<MRT_ColumnDef<IDepartureEntry>[]>(
    () => [
      {
        accessorKey: "vehicleNumber",
        header: "VEHICLE NUMBER",
        size: 150,
      },
      {
        accessorKey: "landfillName",
        header: "LANDFILL NAME",
        size: 180,
      },
      {
        accessorKey: "trip",
        header: "TRIP",
        size: 150,
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
              setDepartureEntry(row.original);
              setShowDepartureEntryEditModal(true);
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
        //     setDepartureEntry(row.original);
        //     console.log(row.original);
        //     // setShowLandfillModal(true);
        //   },
        //   sx: { cursor: "pointer" },
        // })}
      />

      {showDepartureEntryEditModal && (
        <EditDepartureEntryModal
          isOpen={showDepartureEntryEditModal}
          onClose={() => setShowDepartureEntryEditModal(false)}
          data={departureEntry}
        />
      )}

      {/* {showLandfillModal && (
        <ViewLandfillModal
          isOpen={showLandfillModal}
          onClose={() => setShowLandfillModal(false)}
          departureEntry={departureEntry}
        />
      )} */}
    </div>
  );
};

export default DepartureEntryTable;
