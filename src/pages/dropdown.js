import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function DropdownDosen(data) {
  const [selected, setSelected] = React.useState(new Set(["Pilih"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  console.log(data.data);

  const pilihan = data.data;
  return (
    <div className="border border-primary rounded-xl">
      <Dropdown>
        <Dropdown.Button
          className="-z-1"
          flat
          color="White"
          css={{ tt: "capitalize" }}
        >
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="White"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          {pilihan?.map((data, opsi) => (
            <Dropdown.Item key={opsi}>{data.opsi}</Dropdown.Item>
          ))}
          <Dropdown.Item key="Semua">Semua</Dropdown.Item>
          <Dropdown.Item key="Sudah Dinilai">Sudah Dinilai</Dropdown.Item>
          <Dropdown.Item key="Belum Dinilai">Belum Dinilai</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
