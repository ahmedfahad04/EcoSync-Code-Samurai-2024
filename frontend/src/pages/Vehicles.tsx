import AddVehicle from "@/components/Modals/AddVehicle";
import Layout from "@/layout/Layout";
import { IVehicle } from "@/models/Vehicles";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Vehicles = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedRow, setCheckedRow] = useState<Set<string>>(new Set<string>());

  const [showEditVehicleModal, setShowEditVehicleModal] =
    useState<boolean>(false);

  const handleClickSingleDelete = () => {
    console.log("Delete user");
  };

  const handleClickEdit = () => {
    console.log("Edit user");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const dummyData: IVehicle[] = [
    {
      vid: "1",
      vehicleNumber: "ABC123",
      vehicleType: "Open Truck",
      vehicleCapacity: "3 Ton",
      createdAt: new Date("2022-01-01"),
    },
    {
      vid: "2",
      vehicleNumber: "XYZ456",
      vehicleType: "Dump Truck",
      vehicleCapacity: "5 Ton",
      createdAt: new Date("2022-02-15"),
    },
    {
      vid: "3",
      vehicleNumber: "DEF789",
      vehicleType: "Compactor",
      vehicleCapacity: "7 Ton",
      createdAt: new Date("2022-03-20"),
    },
    {
      vid: "4",
      vehicleNumber: "GHI012",
      vehicleType: "Container Carrier",
      vehicleCapacity: "3 Ton",
      createdAt: new Date("2022-04-10"),
    },
    {
      vid: "5",
      vehicleNumber: "JKL345",
      vehicleType: "Open Truck",
      vehicleCapacity: "7 Ton",
      createdAt: new Date("2022-05-25"),
    },
  ];

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl">Vehicles</p>
          <button
            className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]"
            onClick={() => setShowEditVehicleModal(!showEditVehicleModal)}
          >
            + New Vehicles
          </button>
        </div>

        {showEditVehicleModal && (
          <AddVehicle
            isOpen={showEditVehicleModal}
            onClose={() => setShowEditVehicleModal(false)}
          />
        )}

        {/* search bar */}
        <div className="flex justify-center items-center mt-5">
          <div className="relative">
            <input
              id="searchbar"
              name="searchbar"
              value={searchValue}
              onChange={handleChange}
              placeholder="Search"
              className="w-[550px] pl-10 pr-4 py-2 rounded-md border-2 border-neutral-500 focus:outline-none focus:border-[#9095A1FF] focus:bg-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* vehicle table */}
        <div className="flex-1 mt-10">
          {/* <VehicleTable
            id={"usertable"}
            vehicles={dummyData}
            loading={false}
            lastRowRef={null}
            checkedRow={checkedRow}
            actions={[]}
            options={[
              {
                icon: <Edit3Icon />,
                text: "Edit",
                onClickOption: handleClickEdit,
              },
              {
                icon: <DeleteIcon />,
                text: "Delete",
                onClickOption: handleClickSingleDelete,
              },
            ]}
            setCheckedRow={setCheckedRow}
          /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Vehicles;
