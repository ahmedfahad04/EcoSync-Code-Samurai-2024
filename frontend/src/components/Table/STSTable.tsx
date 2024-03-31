import { ROLETYPE } from "@/constants/Global";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { useAuth } from "@/context/AuthContext";
import { ISTS } from "@/models/STS";
import { PersonOutline } from "@mui/icons-material";
import {
  ArrowUpFromDotIcon,
  EditIcon,
  Trash2Icon,
  TruckIcon,
} from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import AssignSTSManagerModal from "../Modals/STS/AssignSTSManagerModal";
import AssignTruckModal from "../Modals/STS/AssignTruckModal";
import DepartureEntryModal from "../Modals/STS/DepartureEntryModal";
import EditSTSModal from "../Modals/STS/EditSTSModal";
import ViewSTSModal from "../Modals/STS/ViewSTSModal";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const STSTable = () => {
  const [showEditSTSModal, setShowEditSTSModal] = useState<boolean>(false);
  const [showSTSModal, setShowSTSModal] = useState<boolean>(false);
  const [showDepartureEntryModal, setShowDepartureEntryModal] =
    useState<boolean>(false);
  const [showAssignSTSManagerModal, setShowAssignSTSManagerModal] =
    useState<boolean>(false);
  const [showAssignTruckModal, setShowAssignTruckModal] =
    useState<boolean>(false);

  const [STSData, setSTSData] = useState<ISTS>();

  const handleRowDelete = (index: string, closeWindow: () => void) => {
    if (window.confirm("Are you sure?")) {
      const newData = [...data];

      //! api call to delete entry
      newData.splice(parseInt(index), 1);
      closeWindow();
    }
  };

  const [url, SetURL] = useState<string>();

  const { user } = useAuth();

  const { data: sts } = useSWR<ISTS[]>(url, fetcher);

  useEffect(() => {
    if (user?.role.role_name == ROLETYPE.ROLE2) {
      SetURL(`${BASE_URL}${API_END_POINTS.STS}/mine`);
    } else {
      SetURL(`${BASE_URL}${API_END_POINTS.STS}`);
    }

    if (sts) {
      localStorage.setItem("sts-id", sts[0]?.sts_id);
      localStorage.setItem("sts-name", sts[0]?.sts_name);
    }
  });

  const columns = useMemo<MRT_ColumnDef<ISTS>[]>(
    () => [
      {
        accessorKey: "sts_name",
        header: "STS NAME",
        size: 180,
      },
      {
        accessorKey: "ward_number",
        header: "WARD NUMBER",
        size: 150,
      },
      {
        accessorKey: "capacity",
        header: "CAPACITY (TON)",
        size: 100,
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
        <span className="font-bold">{sts?.length}</span> in total
      </p>
      <MaterialReactTable
        columns={columns}
        data={sts || []}
        enableRowActions
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MRT_ActionMenuItem
            icon={<TruckIcon className="text-amber-500" />}
            key="truck entry"
            label="Assign Vehicles"
            onClick={() => {
              setSTSData(row.original);
              setShowAssignTruckModal(true);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,
          <MRT_ActionMenuItem
            icon={<ArrowUpFromDotIcon className="text-green-500" />}
            key="departure entry"
            label="Add Departure Entry"
            onClick={() => {
              setSTSData(row.original);
              setShowDepartureEntryModal(true);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,

          <MRT_ActionMenuItem
            icon={<PersonOutline className="text-violet-500" />}
            key="assign manager"
            label="Assign STS Manager"
            onClick={() => {
              setSTSData(row.original);

              setShowAssignSTSManagerModal(true);
              closeMenu();
            }}
            table={table}
            className="bg-blue-200"
          />,

          <MRT_ActionMenuItem
            icon={<EditIcon className="text-blue-500" />}
            key="edit"
            label="Edit STS"
            onClick={() => {
              setSTSData(row.original);
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
              handleRowDelete(row.id, closeMenu);
            }}
            table={table}
          />,
        ]}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            console.log("ACTUAL", row.original);
            setSTSData(row.original);
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

      {showAssignSTSManagerModal && (
        <AssignSTSManagerModal
          isOpen={showAssignSTSManagerModal}
          sts={STSData}
          onClose={() => setShowAssignSTSManagerModal(false)}
        />
      )}

      {showSTSModal && (
        <ViewSTSModal
          isOpen={showSTSModal}
          onClose={() => setShowSTSModal(false)}
          stsData={STSData}
        />
      )}

      {showDepartureEntryModal && (
        <DepartureEntryModal
          isOpen={showDepartureEntryModal}
          onClose={() => setShowDepartureEntryModal(false)}
          stsData={STSData}
        />
      )}

      {showAssignTruckModal && (
        <AssignTruckModal
          isOpen={showAssignTruckModal}
          onClose={() => setShowAssignTruckModal(false)}
          sts={STSData}
        />
      )}
    </div>
  );
};

export default STSTable;
