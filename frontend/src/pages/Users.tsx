import UserTable from "@/components/UserTable";
import Layout from "@/layout/Layout";
import { SearchIcon } from "@/ui/Icons";
import { dummyUsers } from "@/utils/DummyData";
import { DeleteIcon, Edit3Icon } from "lucide-react";
import { useState } from "react";

const Users = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedRow, setCheckedRow] = useState<Set<string>>(new Set<string>());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClickSingleDelete = () => {
    console.log("Delete user");
  };

  const handleClickEdit = () => {
    console.log("Edit user");
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5 px-10">
        {/* top header */}
        <div className="h-20 flex flex-row justify-between items-center ">
          <p className="font-bold px-2 text-3xl">Users</p>
          <button className="h-8 mr-8 text-center flex items-center p-3 text-sm font-normal bg-[#14923EFF] text-white rounded-md hover:bg-[#177737]">
            + New User
          </button>
        </div>

        {/* search bar */}
        <div className="flex justify-center items-center">
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

        {/* user table */}
        <div className="flex-1 mt-10">
          <UserTable
            id={"usertable"}
            users={dummyUsers}
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
          />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
