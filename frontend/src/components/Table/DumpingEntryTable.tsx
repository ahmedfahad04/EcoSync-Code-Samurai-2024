import { ROLETYPE } from "@/constants/Global";
import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { useAuth } from "@/context/AuthContext";
import { IDumpingEntry } from "@/models/Landfill";
import { formattedDate } from "@/utils/formatDate";
import { CurrencyBitcoin, MoneyOutlined } from "@mui/icons-material";
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import BillPageModal from "../Modals/Landfill/BillPageModal";
import EditDumpingEntryModal from "../Modals/Landfill/EditDumpingEntryModal";
import { CurrencyBangladeshiIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const DumpingEntryTable = () => {
  const [showDumpingEntryEditModal, setShowDumpingEntryEditModal] =
    useState<boolean>(false);

  const [dumpingEntry, setDumpingEntry] = useState<IDumpingEntry>();
  const [data, setData] = useState<IDumpingEntry[]>([]);
  const [billpage, showBillPage] = useState<boolean>(false);

  const [url, SetURL] = useState<string>();
  const { user } = useAuth();
  const { data: tripEntry } = useSWR<IDumpingEntry[]>(url, fetcher);

  useEffect(() => {
    if (user?.role.role_name == ROLETYPE.ROLE3) {
      // SetURL(`${BASE_URL}${API_END_POINTS.LANDFILL}/mine`);
      SetURL(`${BASE_URL}${API_END_POINTS.TRIP}`);
    } else {
      SetURL(`${BASE_URL}${API_END_POINTS.TRIP}`);
    }
  });

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
    console.log("FETCH DATA: ", tripEntry, user?.role);
  }, []);

  const columns = useMemo<MRT_ColumnDef<IDumpingEntry>[]>(
    () => [
      {
        accessorKey: "sts.sts_name",
        header: "STS NAME",
        size: 150,
      },
      {
        accessorKey: "landfill.landfill_name",
        header: "LANDFILL NAME",
        size: 150,
      },
      {
        accessorKey: "vehicle.vehicle_number",
        header: "VEHICLE NUMBER",
        size: 180,
      },
      {
        accessorKey: "waste_volume",
        header: "WASTE VOLUME (TON)",
        size: 150,
      },
      {
        accessorKey: "landfill_arrival_time",
        header: "ARRIVAL TIME",
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const dateStr = cell.getValue()?.toString();
          const onlyDate = dateStr ? formattedDate(dateStr) : "";
          return onlyDate;
        },
      },
      {
        accessorKey: "landfill_dumping_time",
        header: "DEPARTURE TIME",
        size: 150,
        Cell: ({ cell }: { cell: any }) => {
          const dateStr = cell.getValue()?.toString();
          const onlyDate = dateStr ? formattedDate(dateStr) : "";
          return onlyDate;
        },
      },
    ],
    []
  );

  return (
    <div>
      <p className="mb-5">
        <span className="font-bold">{tripEntry?.length}</span> in total
      </p>

      {user?.role.role_name == ROLETYPE.ROLE3 ? (
        <MaterialReactTable
          columns={columns}
          data={tripEntry || []}
          enableRowActions
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
          renderRowActionMenuItems={({ closeMenu, row, table }) => [
            <MRT_ActionMenuItem
              icon={<EditIcon className="text-blue-500" />}
              key="edit"
              label="Confirm Dumping"
              onClick={() => {
                setDumpingEntry(row.original);
                setShowDumpingEntryEditModal(true);
                closeMenu();
              }}
              table={table}
              className="bg-blue-200"
            />,
            <MRT_ActionMenuItem
              icon={<CurrencyDollarIcon width={20} className="text-green-500" />}
              key="bill"
              label="Generate Bills"
              onClick={() => {
                setDumpingEntry(row.original);
                showBillPage(true);
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
        />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={tripEntry || []}
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        />
      )}

      {showDumpingEntryEditModal && (
        <EditDumpingEntryModal
          isOpen={showDumpingEntryEditModal}
          onClose={() => setShowDumpingEntryEditModal(false)}
          data={dumpingEntry}
        />
      )}

      {billpage && (
        <BillPageModal
          isOpen={billpage}
          onClose={() => showBillPage(false)}
          data={dumpingEntry}
        />
      )}
    </div>
  );
};

export default DumpingEntryTable;
