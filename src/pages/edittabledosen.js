import React, { useState, useEffect } from "react";
import { Modal, TextField } from "@mui/material";
import Image from "next/image";
import edit from "/public/edit.svg";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditTableDosen({ data, onUpdate, id_user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const { data: session } = useSession();

  const handleOpen = () => {
    setIsOpen(true);
    // setEditedData({ ...editedData, email: "" });
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  console.log(editedData?.id_user);
  console.log(editedData);

  const handleSubmit = async () => {
    const resUserUpdate = await fetch(
      `${API_URL}/master/user/${editedData?.id_user}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(editedData),
      }
    );

    const updatedData = await resUserUpdate.json();
    console.log("update", updatedData);

    onUpdate(updatedData);
    handleClose();
  };

  useEffect(() => {
    setEditedData(data);
  }, [data]);

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
              NIK
              <p className="ml-[72px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.nim_nik || ""}
                onChange={(event) =>
                  setEditedData({ ...editedData, nim_nik: event.target.value })
                }
                placeholder="NIK"
                type="number"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Nama
              <p className="ml-14">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.name || ""}
                onChange={(event) =>
                  setEditedData({ ...editedData, name: event.target.value })
                }
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Email
              <p className="ml-[60px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                value={editedData?.email || ""}
                onChange={(event) =>
                  setEditedData({ ...editedData, email: event.target.value })
                }
                placeholder="Email"
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
