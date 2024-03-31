import { ILandfill } from "@/models/Landfill";
// import { dummyLandfill } from "@/utils/DummyData"; // Importing static data
import { ROLETYPE } from "@/constants/Global";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { useAuth } from "@/context/AuthContext";
import { PersonOutline } from "@mui/icons-material";
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import AssignLandfillManagerModal from "../Modals/Landfill/AssignLandfillManagerModal";
import EditLandfillModal from "../Modals/Landfill/EditLandfillModal";
import ViewLandfillModal from "../Modals/Landfill/ViewLandfillModal";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const LandfillTable = () => {
  const [showDumpingEntryModal, setShowDumpingEntryModal] =
    useState<boolean>(false);
  const [showEditLandfillModal, setShowEditLandfillModal] =
    useState<boolean>(false);
  const [showLandfillModal, setShowLandfillModal] = useState<boolean>(false);
  const [showAssignLandfillManagerModal, setShowAssignLandfillManagerModal] =
    useState<boolean>(false);
  const [LandfillData, setLandfillData] = useState<ILandfill>();

  const [url, SetURL] = useState<string>(
    `${BASE_URL}${API_END_POINTS.LANDFILL}`
  );

  const { user } = useAuth();

  const { data: landfill } = useSWR<ILandfill[]>(url, fetcher);

  useEffect(() => {
    if (user?.role.role_name == ROLETYPE.ROLE3) {
      SetURL(`${BASE_URL}${API_END_POINTS.LANDFILL}/mine`);
    }
  });

  useEffect(() => {
    console.log("DATA: ", landfill);
  }, [landfill]);

  const handleRowDelete = (index: string, closeWindow: () => void) => {
    if (window.confirm("Are you sure?")) {
      const newData = [...data];
      //! api call to delete entry
      newData.splice(parseInt(index), 1);
      setData(newData);
      closeWindow();
    }
  };

  const columns = useMemo<MRT_ColumnDef<ILandfill>[]>(
    () => [
      {
        accessorKey: "landfill_name",
        header: "Landfill NAME",
        size: 180,
      },
      {
        accessorKey: "opening_time",
        header: "OPENING TIME",
        size: 150,
      },
      {
        accessorKey: "closing_time",
        header: "ENDING TIME",
        size: 150,
      },
      {
        accessorKey: "capacity",
        header: "CAPACITY (TON)",
        size: 150,
      },
      {
        accessorKey: "gps_coordinate",
        header: "GPS Coordinates",
        size: 190,
        Cell: ({ cell }) => {
          const lat = cell.getValue<number[]>()[0].toString();
          const lng = cell.getValue<number[]>()[1].toString();
          // https://www.google.com/maps?q=<latitude>,<longitude>
          return lat + ", " + lng;
        },
      },
    ],
    []
  );

  return (
    <div>
      <p className="mb-5">
        <span className="font-bold">{landfill?.length}</span> in total
      </p>
      <MaterialReactTable
        columns={columns}
        data={landfill || []}
        enableRowActions
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          // <MRT_ActionMenuItem
          //   icon={<ArrowUpFromDotIcon className="text-green-500" />}
          //   key="dumping"
          //   label="Add Waste Dumping Entry"
          //   onClick={() => {
          //     setLandfillData(row.original);
          //     setShowDumpingEntryModal(true);
          //     closeMenu();
          //   }}
          //   table={table}
          //   className="bg-blue-200"
          // />,
          
          user?.role.role_name == ROLETYPE.ROLE1 && (
            <MRT_ActionMenuItem
              icon={<PersonOutline className="text-violet-500" />}
              key="assign manager"
              label="Assign Landfill Manager"
              onClick={() => {
                setLandfillData(row.original);
                setShowAssignLandfillManagerModal(true);
                closeMenu();
              }}
              table={table}
              className="bg-blue-200"
            />
          ),

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
            console.log(row.original);
            setShowLandfillModal(true);
          },
          sx: { cursor: "pointer" },
        })}
      />

      {/* {showDumpingEntryModal && (
        <DumpingEntryModal
          isOpen={showDumpingEntryModal}
          onClose={() => setShowDumpingEntryModal(false)}
          landfillData={LandfillData}
        />
      )} */}

      {showAssignLandfillManagerModal && (
        <AssignLandfillManagerModal
          isOpen={showAssignLandfillManagerModal}
          landfill={LandfillData}
          onClose={() => setShowAssignLandfillManagerModal(false)}
        />
      )}

      {showEditLandfillModal && (
        <EditLandfillModal
          isOpen={showEditLandfillModal}
          onClose={() => setShowEditLandfillModal(false)}
          LandfillData={LandfillData}
        />
      )}

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
