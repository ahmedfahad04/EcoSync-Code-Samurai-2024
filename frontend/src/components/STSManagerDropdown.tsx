import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IUsers } from "@/models/Users";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const STSManagerDropdown = ({ onSelectChange }) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const { data: users } = useSWR<IUsers[]>(
    `${BASE_URL}${API_END_POINTS.USER}?role_name=STS Manager`,
    fetcher
  );

  useEffect(() => {
    console.log("USER ", users);
    let temp = [];

    users?.map((user) => {
      temp.push({ label: user.name, value: user.user_id });
    });

    setOptions(temp);
  }, [users]);

  // Function to handle selection change and send both selected value and setSelected function
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    onSelectChange(selectedOptions);
  };

  return (
    <div className="w-full mt-5">
      <h1 className="font-normal">Select STS Manager(s)</h1>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelectChange}
        labelledBy="Select"
      />
    </div>
  );
};

export default STSManagerDropdown;
