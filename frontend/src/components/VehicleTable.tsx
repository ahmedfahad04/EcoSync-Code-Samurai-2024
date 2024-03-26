import TableSkeleton from "@/components/Table/TableSkeleton";
import {
  IActionButtonDropdownOption,
  ICheckboxData,
  ITableHeaderAction,
} from "@/models/Common";

import Table from "@/components/Table/Table";
import TableRow from "@/components/Table/TableRow";
import { IVehicle } from "@/models/Vehicles";
import Chip from "@/ui/Chip";
import { formattedDate } from "@/utils/formatDate";

interface VehicleTableProps {
  id: string;
  vehicles: Array<IVehicle>;
  loading: boolean;
  lastRowRef: React.Ref<HTMLTableRowElement>;
  checkedRow: Set<string>;
  actions: Array<ITableHeaderAction>;
  options: Array<IActionButtonDropdownOption>;
  setCheckedRow: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const VehicleTable = ({
  id,
  vehicles,
  loading,
  lastRowRef,
  checkedRow,
  actions,
  options,
  setCheckedRow,
}: VehicleTableProps) => {
  const handleChangeHeaderCheckbox = ({ checked }: ICheckboxData) => {
    const temp = new Set<string>();
    if (checked) {
      const result = vehicles?.reduce((acc, contact) => {
        acc.add(contact.vid);
        return acc;
      }, temp);

      setCheckedRow(result);
    } else {
      setCheckedRow(temp);
    }
  };

  const handleChangeRowCheckbox = ({ name, checked }: ICheckboxData) => {
    const temp = new Set(checkedRow);
    checked ? temp.add(name) : temp.delete(name);
    setCheckedRow(temp);
  };

  return (
    <Table
      id={id}
      headerData={["Vehicle Number", "Type", "Capaity", "Registered Date"]}
      columnWidth={["35%", "25%", "25%", "15%"]}
      checkBox={!!vehicles.length}
      customTableClass="contact-table w-full no-scrollbar"
      isChecked={!!vehicles.length && checkedRow.size === vehicles.length}
      isAnyRowChecked={!!checkedRow.size}
      actions={actions}
      onChangeCheckbox={handleChangeHeaderCheckbox}
    >
      {loading || !vehicles
        ? Array.from({ length: 10 }).map((_, index) => (
            <TableSkeleton key={index} />
          ))
        : vehicles?.map((vehicle: IVehicle, index: number) => (
            <TableRow
              key={index}
              id={vehicle.vid}
              observerRef={vehicles.length == index + 1 ? lastRowRef : null}
              checkBox={true}
              isChecked={checkedRow.has(vehicle.vehicleNumber)}
              options={options}
              onChangeCheckbox={handleChangeRowCheckbox}
              rowData={[
                vehicle.vehicleNumber,
                <Chip data={vehicle.vehicleType} type="vehicle" />,
                vehicle.vehicleCapacity,
                formattedDate(vehicle.createdAt.toString()),
              ]}
            />
          ))}
    </Table>
  );
};

export default VehicleTable;
