// EditTableKelompok.js
import React, { useState, useEffect } from "react";
import { Modal, TextField } from "@mui/material";
import Image from "next/image";
import edit from "/public/edit.svg";
import { useSession } from "next-auth/react";
import Select from "react-select";

export default function EditTableKelompok({ data, onUpdate, dataMentor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const { data: session } = useSession();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    onUpdate(editedData);
    handleClose();
  };

  const handleMajorChange = (selectedOption) => {
    setEditedData({
      ...editedData,
      mentor_1: selectedOption ? selectedOption.value : "",
    });
  };

  const handleMajorChange2 = (selectedOption) => {
    setEditedData({
      ...editedData,
      mentor_2: selectedOption ? selectedOption.value : "",
    });
  };

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EEF5FF",
      borderRadius: "5px",
      height: "56px",
    }),
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <Image src={edit} alt="edit" />
      </button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        className="grid place-content-center"
      >
        <div className="p-[15px] bg-white w-[868px] grid place-content-center rounded-xl shadow-md  border-black border-2">
          <div className="bg-white w-[783px] space-y-[25px]">
            <h2 className="text-lg font-bold">Edit Data :</h2>
            <div className="flex gap-5 items-center text-base font-semibold">
              No Kelompok
              <p className="ml-[72px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.team_numb || ""}
                onChange={(event) =>
                  setEditedData({
                    ...editedData,
                    team_numb: event.target.value,
                  })
                }
                placeholder="No Kelompok"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Nama Kelompok
              <p className="ml-14">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.team_name || ""}
                onChange={(event) =>
                  setEditedData({
                    ...editedData,
                    team_name: event.target.value,
                  })
                }
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Ide Ringkasan
              <p className="ml-[60px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.descp || ""}
                onChange={(event) =>
                  setEditedData({ ...editedData, descp: event.target.value })
                }
                placeholder="Ide Ringkasan"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Dosen Pembimbing 1<p className="ml-[48px]">:</p>
              <Select
                className="w-[640px]"
                styles={customStyles}
                options={dataMentor}
                onChange={handleMajorChange}
                value={
                  editedData?.mentor_1
                    ? { value: editedData.mentor_1, label: editedData.mentor_1 }
                    : null
                }
                placeholder="Pilih Dosen Pembimbing 1"
                isClearable
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Dosen Pembimbing 2<p className="ml-[48px]">:</p>
              <Select
                className="w-[640px]"
                styles={customStyles}
                options={dataMentor}
                onChange={handleMajorChange2}
                value={
                  editedData?.mentor_2
                    ? { value: editedData.mentor_2, label: editedData.mentor_2 }
                    : null
                }
                placeholder="Pilih Dosen Pembimbing 2"
                isClearable
              />
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={handleClose}
                className="text-white bg-red rounded-xl w-[160px] h-[42px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary w-[160px] h-[42px] rounded-xl text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
