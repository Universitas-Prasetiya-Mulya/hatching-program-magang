import React, { useState } from "react";
import Select from "react-select";

const InfiniteScrollDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EEF5FF",
      borderRadius: "5px",
      height: "56px",
    }),
  };

  const options = [
    { value: "option1", label: "Pak AJi" },
    { value: "option2", label: "Pak Irawan" },
    { value: "option3", label: "Pak Heru" },
    { value: "option4", label: "Pak Irvan" },
    { value: "option5", label: "Pak Wafi" },
    { value: "option6", label: "Melvin Yusuf Adrea" },
    { value: "option7", label: "Bapak" },
    { value: "option8", label: "Ayah" },
    { value: "option9", label: "Papa" },
  ];

  return (
    <div>
      <Select
        className="w-[645px]"
        styles={customStyles}
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          setSelectedOption(event.target.value);
        }}
        placeholder="Pilih Dosen"
        isClearable
      />
    </div>
  );
};

export default InfiniteScrollDropdown;
