import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const PermissionDropDown = ({ onSelectChange, permissions }) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(["A", "B"]);

  useEffect(() => {
    let temp = [];

    permissions?.map((p) => {
      temp.push({ label: p, value: p });
    });

    setOptions(temp);
  }, [permissions]);

  // Function to handle selection change and send both selected value and setSelected function
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    onSelectChange(selectedOptions);
  };

  return (
    <div className="w-full mt-5 text-black">
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

export default PermissionDropDown;
