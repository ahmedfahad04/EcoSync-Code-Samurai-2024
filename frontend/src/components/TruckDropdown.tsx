import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import { IVehicle } from "@/models/Vehicles";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json()); // Fetcher function for SWR

const TruckDropdown = ({ onSelectChange }) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const { data: vehicles } = useSWR<IVehicle[]>(
    `${BASE_URL}${API_END_POINTS.VEHICLE}/available`,
    fetcher
  );

  useEffect(() => {
    console.log("USER ", vehicles);
    let temp = [];

    vehicles?.map((vehicle) => {
      temp.push({ label: vehicle.vehicle_number, value: vehicle.vehicle_id });
    });

    setOptions(temp);
  }, [vehicles]);

  // Function to handle selection change and send both selected value and setSelected function
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    onSelectChange(selectedOptions);
  };

  return (
    <div className="w-full mt-5">
      <h1 className="font-normal">Select Vehicle(s)</h1>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelectChange}
        labelledBy="Select"
      />
    </div>
  );
};

export default TruckDropdown;
