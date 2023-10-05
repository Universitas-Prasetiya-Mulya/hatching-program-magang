import React, { useState } from "react";
import Select from "react-select";

const DropStage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "10px",
      height: "28px",
      borderColor: "black",
    }),
  };

  const options = [
    { value: "option1", label: "1" },
    { value: "option2", label: "2" },
    { value: "option3", label: "3" },
    { value: "option4", label: "4" },
    { value: "option5", label: "5" },
    { value: "option6", label: "6" },
    { value: "option7", label: "7" },
  ];

  // const data = [
  //   { id: 1, name: 'Pak Aji', age: 25 },
  //   { id: 2, name: 'Pak Irvan', age: 30 },
  //   { id: 3, name: 'Pak Aji', age: 35 },

  // ];

  // const filteredData = selectedOption
  //   ? data.filter((item) => item.name.includes(selectedOption.label))
  //   : data;

  return (
    <div>
      <Select
        className="w-[140px] text-center"
        styles={customStyles}
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          setSelectedOption(selected);
        }}
        placeholder="Pilih Stage"
        isClearable
      />
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default DropStage;
