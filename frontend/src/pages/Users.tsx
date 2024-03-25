import UserTable from "@/components/UserTable";
import Layout from "@/layout/Layout";
import { IUsers } from "@/models/Users";
import { EditIcon, SearchIcon, TrashIcon } from "@/ui/Icons";
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

  const dummyUsers: IUsers[] = [
    {
      name: "John Doe",
      userName: "john_doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      role: "Admin",
      userId: "1",
    },
    {
      name: "Jane Smith",
      userName: "jane_smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      role: "User",
      userId: "2",
    },
    {
      name: "Alice Johnson",
      userName: "alice_johnson",
      email: "alice.johnson@example.com",
      phone: "+1122334455",
      role: "User",
      userId: "3",
    },
    {
      name: "Bob Brown",
      userName: "bob_brown",
      email: "bob.brown@example.com",
      phone: "+1765432987",
      role: "User",
      userId: "4",
    },
    {
      name: "Emily Davis",
      userName: "emily_davis",
      email: "emily.davis@example.com",
      phone: "+1987234567",
      role: "User",
      userId: "5",
    },
  ];

  return (
    <Layout>
      <div className="h-screen flex flex-col w-full p-5">
        {/* top header */}
        <div className="bg-blue-200 h-20 flex flex-row justify-between items-center ">
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
        <div className="bg-green-100 flex-1">
          <UserTable
            id={"usertable"}
            users={dummyUsers}
            loading={false}
            lastRowRef={null}
            checkedRow={checkedRow}
            actions={[]}
            options={[
              {
                icon: <EditIcon />,
                text: "Edit",
                onClickOption: handleClickEdit,
              },
              {
                icon: <TrashIcon />,
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
