import { dummyUsers } from "@/utils/DummyData";
import { MultiSelect, Option } from "react-multi-select-component";

const STSManagerDropdown = ({
  managers,
  setManager,
}: {
  managers: Option[];
  setManager: () => {};
}) => {
  const users = dummyUsers.filter((user) => user.role === "STS Manager");
  const options = users.map((user) => ({
    label: user.name,
    value: user.userId,
  }));

  return (
    <div>
      <h1 className="font-medium mb-1">Assign STS Manager</h1>
      <MultiSelect
        options={options}
        value={managers}
        onChange={setManager}
        labelledBy="Select"
      />
    </div>
  );
};

export default STSManagerDropdown;
