import React, { useState } from 'react';
import linedrop from '/public/linedrop.svg';
import Image from 'next/image'

export default function DropMaster() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
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
            className="flex text-center items-center justify-between w-[540px] rounded-md py-2 px-3 bg-white border border-black text-sm font-medium text-black "
            onClick={toggleDropdown}
          >
            {selectedOption || 'Cari Jurusan'}
            <Image 
                  width={12} 
                  height={12}
                  src={linedrop}
                  alt='drop'
                  />
          </button>
        </div>
  
        {isOpen && (
          <div className="absolute z-10 origin-top-right  mt-2  rounded-md ring-1  ring-black ring-opacity-5">
            <div
              
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className="block py-2 text-sm bg-white text-black mb-2 w-[540px] text-start pl-3 font-semibold border rounded-[10px]"
                role="menuitem"
                onClick={() => handleSelectOption('Teknologi Informasi')}
              >
                Teknologi Informasi
              </button>
              <button
                className="block  py-2 text-sm bg-white text-black w-[540px] border text-start pl-3 font-semibold  rounded-[10px]"
                role="menuitem"
                onClick={() => handleSelectOption('Manajemen Keuangan')}
              >
                Manajemen Keuangan
              </button>
              <button
                className="block  py-2 text-sm bg-white text-black mt-2 border w-[540px] text-start pl-3 font-semibold  rounded-[10px]"
                role="menuitem"
                onClick={() => handleSelectOption('Teknik Industri')}
              >
                Teknik Industri
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };