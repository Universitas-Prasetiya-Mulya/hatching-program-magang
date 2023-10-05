import React, { useState } from "react";
import { Modal, TextField } from "@mui/material";
import Image from "next/image";
import add from "/public/add.svg";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PopupDosen() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [requestBody, setRequestBody] = useState({
    nim_nik: "222",
    name: "Mentor2",
    email: "dev.apps@prasetiyamulya.ac.id",
    id_role: "3",
  });
  console.log(requestBody);
  const handleSubmit = async () => {
    const resUserAddNew = await fetch(`${API_URL}/master/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await resUserAddNew.json();
    console.log("dataMentor", data);

    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="flex bg-primary items-center gap-2 px-3 py-2 rounded-2xl"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Image src={add} alt="add" />
        <p className="text-white font-semibold">Add New</p>
      </button>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        className="grid place-content-center"
      >
        <div className="p-[15px] bg-white w-[868px] grid place-content-center rounded-xl shadow-md  border-black border-2">
          <div className="bg-white w-[783px] space-y-[25px]">
            <h2 className="text-lg font-bold">Add Dosen :</h2>
            <div className="flex gap-5 items-center text-base font-semibold">
              NIK
              <p className="ml-[72px]">:</p>
              <TextField
                className="bg-bluefield w-[640px] rounded-xl"
                onChange={(event) => {
                  setRequestBody((prevRequestBody) => ({
                    ...prevRequestBody,
                    nim_nik: event.target.value,
                  }));
                }}
                placeholder="NIK"
                type="number"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Nama
              <p className="ml-14">:</p>
              <TextField
                className="bg-bluefield w-[640px]"
                onChange={(event) => {
                  setRequestBody((prevRequestBody) => ({
                    ...prevRequestBody,
                    name: event.target.value,
                  }));
                }}
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="flex gap-5 items-center text-base font-semibold">
              Email
              <p className="ml-[60px]">:</p>
              <TextField
                className="bg-bluefield w-[640px]"
                onChange={(event) => {
                  setRequestBody((prevRequestBody) => ({
                    ...prevRequestBody,
                    email: event.target.value,
                  }));
                }}
                placeholder="Alamat Email"
              />
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
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
