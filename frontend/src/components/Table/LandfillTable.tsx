import { ILandfill } from "@/models/Landfill";
import { dummyLandfill } from "@/utils/DummyData";
// import { dummyLandfill } from "@/utils/DummyData"; // Importing static data
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import ViewLandfillModal from "../Modals/Landfill/ViewLandfillModal";
// import EditLandfillModal from "../Modals/Landfill/EditLandfillModal";
// import ViewLandfillModal from "../Modals/Landfill/ViewLandfillModal";

const LandfillTable = () => {
  const [showEditLandfillModal, setShowEditLandfillModal] =
    useState<boolean>(false);
  const [showLandfillModal, setShowLandfillModal] = useState<boolean>(false);
  const [LandfillData, setLandfillData] = useState<ILandfill>();
  const [data, setData] = useState<ILandfill[]>([]);

  const handleRowDelete = (index: string, closeWindow: () => void) => {
    if (window.confirm("Are you sure?")) {
      // Create a copy of the current data
      const newData = [...data];
      // Remove the entry at the specified index
      //! api call to delete entry
      newData.splice(parseInt(index), 1);
      // Update the data state
      setData(newData);
      closeWindow();
    }
  };

  useEffect(() => {
    //! fetch using useSWR
    setData(dummyLandfill); // Set static data from dummyLandfill
  }, []); // Empty dependency array to run only once when component mounts

  const columns = useMemo<MRT_ColumnDef<ILandfill>[]>(
    () => [
      {
        accessorKey: "landfillName",
        header: "Landfill NAME",
        size: 180,
      },
      {
        accessorKey: "openingTime",
        header: "OPENING TIME",
        size: 150,
      },
      {
        accessorKey: "endingTime",
        header: "ENDING TIME",
        size: 150,
      },
      {
        accessorKey: "capacity",
        header: "CAPACITY (TON)",
        size: 150,
      },
      {
        accessorKey: "latitude",
        header: "LATITUDE",
        size: 150,
      },
      {
        accessorKey: "longitude",
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
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MRT_ActionMenuItem
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit"
            onClick={() => {
              setLandfillData(row.original);
              setShowEditLandfillModal(true);
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setLandfillData(row.original);
            console.log(row.original)
            setShowLandfillModal(true);
          },
          sx: { cursor: "pointer" },
        })}
      />

      {/* {showEditLandfillModal && (
        <EditLandfillModal
          isOpen={showEditLandfillModal}
          onClose={() => setShowEditLandfillModal(false)}
          LandfillData={LandfillData}
        />
      )} */}

      {showLandfillModal && (
        <ViewLandfillModal
          isOpen={showLandfillModal}
          onClose={() => setShowLandfillModal(false)}
          LandfillData={LandfillData}
        />
      )}
    </div>
  );
};

export default LandfillTable;
