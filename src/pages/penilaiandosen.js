import Image from "next/image";
import logo from "/public/logo.png";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PopupProfil from "./popupprofil";
import { signOut } from "next-auth/react";

const TablePenilaianDosen = dynamic(import("./tablepenilaiandosen"), {
  ssr: false,
});

export default function PenilaianDosen() {
  return (
    <main className=" bg-white h-screen w-[1465px] flex">
      <div className="w-[200px] h-full pb-[82px] bg-bluenav fixed rounded-r-2xl place-items-center">
        <div className="mt-7 mb-28 border-b border-white">
          <div className="text-white font-bold text-2xl text-center pb-2.5">
            Hatching <br /> Program
          </div>
        </div>
        <div className="px-4 grid grid-col space-y-80">
          <div>
            <div className="mb-8">
              <Link
                href="/dashboarddosen"
                className="px-10 text-white font-semibold text-base text-center bg-bluenav hover:bg-bluehover py-2.5 rounded-xl"
              >
                Dashboard
              </Link>
            </div>
            <div>
              <Link
                href="/penilaianmahasiswa"
                className="px-12 text-white font-semibold text-base text-center bg-primary py-2.5 rounded-xl"
              >
                Penilaian
              </Link>
            </div>
          </div>
          <button
            className="text-white font-semibold text-base text-center bg-red py-2.5 rounded-xl"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white pr-5 ml-[218px]">
        <nav className="flex items-center pb-[5px] pt-3 border-b border-primary fixed bg-white mb-9 z-20">
          <div className="flex justify-center gap-3 items-center w-[300px] mr-[870px]">
            <Image alt="logo" src={logo} />
            <div className="col-2">
              <div className="text-primary text-xs font-bold">UNIVERSITAS</div>
              <div className="text-primary text-2xl font-bold">
                PRASETIYA MULYA
              </div>
            </div>
          </div>
          <PopupProfil />
        </nav>
        <div className="space-y-[35px] mt-[96px] w-[1220px]">
          <TablePenilaianDosen />
        </div>
      </div>
    </main>
  );
}
