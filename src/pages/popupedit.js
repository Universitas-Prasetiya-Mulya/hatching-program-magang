import React, { useEffect, useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import Image from "next/image";
import edit from "/public/edit.svg";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PopupEdit({ data, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [editedMentor1Score, setEditedMentor1Score] = useState(
    data.mentor1_score || ""
  );
  const [editedMentor2Score, setEditedMentor2Score] = useState(
    data.mentor2_score || ""
  );
  const [editedIdMember, setEditedIdMember] = useState(data.id_member);
  const { data: session } = useSession();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { mentor } = data;

  const handleSubmit = async () => {
    const updatedScore =
      mentor === "mentor1"
        ? parseFloat(editedMentor1Score)
        : parseFloat(editedMentor2Score);

    const updateData = {
      id_hatching: editedData.id_hatching,
      id_member: editedData?.id_member,
      stage: editedData.stage,
      score: updatedScore,
    };

    console.log(editedData?.id_hatching);

    const resUserUpdate = await fetch(`${API_URL}/hatching/eval`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const updatedData = await resUserUpdate.json();
    console.log(updateData);
    onUpdate(updatedData);
    handleClose();
  };

  useEffect(() => {
    setEditedData(data);
    setEditedMentor1Score(data?.mentor1_score || "");
    setEditedMentor2Score(data?.mentor2_score || "");
    setEditedIdMember(data?.id_member);
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
        <div className="p-[15px] bg-white w-[868px] grid place-content-center rounded-xl shadow-md border-black border-2">
          <div className="bg-white w-[783px] space-y-[25px]">
            <h2 className="text-lg font-bold">Edit Nilai :</h2>
            <div className="flex gap-5 items-center text-base font-semibold">
              Nilai
              {editedData?.id_hatching}
              <p className="ml-[18px]">:</p>
              <TextField
                className="bg-bluefield w-[700px] rounded-xl"
                value={
                  mentor === "mentor1" ? editedMentor1Score : editedMentor2Score
                }
                onChange={(event) =>
                  mentor === "mentor1"
                    ? setEditedMentor1Score(event.target.value)
                    : setEditedMentor2Score(event.target.value)
                }
                placeholder="Nilai"
              />
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={handleClose}
                className="text-white bg-red rounded-xl w-[160px] h-[42px]"
              >
                Batal
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
