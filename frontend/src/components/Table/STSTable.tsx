import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { ISTS } from "@/models/STS";
import { ArrowUpFromDotIcon, EditIcon, Trash2Icon } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import useSWR from "swr";
import DepartureEntryModal from "../Modals/STS/DepartureEntryModal";
import EditSTSModal from "../Modals/STS/EditSTSModal";
import ViewSTSModal from "../Modals/STS/ViewSTSModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const STSTable = () => {
  const [showEditSTSModal, setShowEditSTSModal] = useState<boolean>(false);
  const [showSTSModal, setShowSTSModal] = useState<boolean>(false);
  const [showDepartureEntryModal, setShowDepartureEntryModal] =
    useState<boolean>(false);
  const [STSData, setSTSData] = useState<ISTS>();
  const [data, setData] = useState<ISTS[]>([]);

  const handleRowDelete = (index: string, closeWindow: () => void) => {
    if (window.confirm("Are you sure?")) {
      const newData = [...data];

      //! api call to delete entry
      newData.splice(parseInt(index), 1);
      setData(newData);
      closeWindow();
    }
  };

  const { data: sts } = useSWR<ISTS[]>(
    `${BASE_URL}${API_END_POINTS.STS}`,
    fetcher
  );

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
        size: 150,
      },
      {
        accessorKey: "gps_coordinate",
        header: "LATITUDE",
        size: 150,
        Cell: ({ cell }) => {
          return cell.getValue<number[]>()[0];
        },
      },
      {
        accessorKey: "gps_coordinate",
        header: "LONGITUDE",
        size: 150,
        Cell: ({ cell }) => {
          return cell.getValue<number[]>()[1];
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
        data={sts || ""}
        enableRowActions
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MRT_ActionMenuItem
            icon={<ArrowUpFromDotIcon className="text-green-500" />}
            key="edit"
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
    </div>
  );
};

export default STSTable;
