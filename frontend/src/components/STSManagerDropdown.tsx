import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IUsers } from "@/models/Users";
import { useEffect, useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const STSManagerDropdown = ({ setManager }: { setManager: () => {} }) => {
  const {
    data: fetchedUser,
    error,
    isLoading,
  } = useSWR<IUsers[]>(
    `${BASE_URL}${API_END_POINTS.USER}?role_name=STS Manager`,
    fetcher
  );
  const [loading, setLoading] = useState<boolean>(true);

  const handleSetOptions = (users: IUsers[] | undefined) => {
    if (users) {
      const options = users.map((user) => ({
        label: user.name,
        value: user.role.role_id,
      }));
      setOptions(options);
      setLoading(false);
    }
  };

  const [options, setOptions] = useState<Option[]>([]);

  if (error) return <div>Error loading data</div>;

  useEffect(() => {
    handleSetOptions(fetchedUser);
  }, [fetchedUser]);

  return (
    <div>
      {isLoading ? (
        "Loading ... "
      ) : (
        <div>
          <h1 className="font-medium mb-1">Assign STS Manager</h1>
          <MultiSelect
            options={options}
            value={options.map((option) => option.value)}
            onChange={setManager}
            labelledBy="Select"
          />
        </div>
      )}
    </div>
  );
};

export default STSManagerDropdown;
