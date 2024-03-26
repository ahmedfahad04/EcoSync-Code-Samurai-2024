import AddVehicle from "@/components/Modals/AddVehicle";
import Layout from "@/layout/Layout";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Vehicles = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showEditVehicleModal, setShowEditVehicleModal] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
      </div>
    </Layout>
  );
};

export default Vehicles;
