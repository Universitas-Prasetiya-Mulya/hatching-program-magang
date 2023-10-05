import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Image from "next/image";
import profil from "/public/profil.png";
import CloseProfil from "./closeprofil";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PopupProfil() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const [userCurrent, setUserCurrent] = useState([]);

  useEffect(() => {
    async function fetchUserCurrent() {
      const resUserCurrent = await fetch(`${API_URL}/user/current`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await resUserCurrent.json();
      console.log("Current User", data.data);
      setUserCurrent(data.data);
    }
    fetchUserCurrent();
  }, [session]);
  return (
    <div>
      <button
        className=" bg-white items-center"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Image src={profil} alt="profil" />
      </button>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        className=" absolute flex place-content-end mr-1 mt-20"
      >
        <div className="p-2.5 bg-white h-[185px] w-[185px] rounded-[15px] shadow-md  border-black border-2">
          <CloseProfil trigger={isOpen} setTrigger={setIsOpen} />
          <div className="flex place-content-center">
            <Image
              className="w-[70px] h-[70px] mb-5"
              src={profil}
              alt="profil"
            />
          </div>
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="text-center text-sm font-semibold mb-[5px]">
                {userCurrent?.name}
              </div>
              <div className=" w-10 text-[10px] text-bluebutton">
                {userCurrent?.email}
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
