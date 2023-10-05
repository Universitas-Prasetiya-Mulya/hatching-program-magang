import React, { useState } from "react";
import dropdown from "/public/dropdown.svg";
import Image from "next/image";
import Link from "next/link";

export default function DropNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex place-content-center text-center items-center gap-3 w-[158px] rounded-md py-2 bg-bluenav text-sm font-medium text-white hover:bg-bluehover focus:outline-none focus:ring-2 focus:ring-offset-2 "
          onClick={toggleDropdown}
        >
          {selectedOption || "Master"}
          <Image width={12} height={10} src={dropdown} alt="drop" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right  mt-2  rounded-md ring-1  ring-black ring-opacity-5">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href="/mastermahasiswa"
              className="block py-2 text-base bg-white text-black mb-2 w-[158px] text-center font-semibold border hover:to-bluehover  rounded-[10px]"
              role="menuitem"
              onClick={() => handleSelectOption("Mahasiswa")}
            >
              Mahasiswa
            </Link>
            <Link
              href="/masterdosen"
              className="block  py-2 text-base bg-white text-black w-[158px] border text-center font-semibold hover:to-bluehover  rounded-[10px]"
              role="menuitem"
              onClick={() => handleSelectOption("Dosen")}
            >
              Dosen
            </Link>
            <Link
              href="/masterjurusan"
              className="block  py-2 text-base bg-white text-black mt-2 border w-[158px] text-center font-semibold hover:to-bluehover hover:text-gray-900 rounded-[10px]"
              role="menuitem"
              onClick={() => handleSelectOption("Jurusan")}
            >
              Jurusan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
