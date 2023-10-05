import React from "react";
import Image from "next/image";
import logo from "/public/logo.png";
import Link from "next/link";
import DropNav from "./dropnav";
import dynamic from "next/dynamic";
import PopupProfil from "./popupprofil";
import { signOut } from "next-auth/react";

const TablePenilaianAdmin = dynamic(import("./tablepenilaianadmin"), {
  ssr: false,
});

export default function PenilaianAdmin() {
  return (
    <main className=" bg-white h-screen w-[1465px] flex">
      <div className="w-[200px] h-full pb-[82px] bg-bluenav fixed rounded-r-2xl place-items-center">
        <div className="mt-7 mb-28 border-b border-white">
          <div className="text-white font-bold text-2xl text-center pb-2.5">
            Hatching <br /> Program
          </div>
        </div>
        <button
          className="  text-white font-semibold text-base w-[158px] ml-4 mt-[430px] fixed text-center bg-red py-2.5 rounded-xl"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
        <div className="px-4 grid grid-col space-y-36">
          <div>
            <div className="mb-10">
              <Link
                href="/dashboardadmin"
                className="px-10 text-white font-semibold text-base text-center bg-bluenav py-2.5 rounded-xl"
              >
                Dashboard
              </Link>
            </div>
            <div className="mb-10">
              <DropNav />
            </div>
            <div className="mb-10"></div>
            <div>
              <Link
                href="/penilaiankelompok"
                className="px-12 text-white font-semibold text-base text-center bg-bluenav py-2.5 rounded-xl mt-10"
              >
                Hatching
              </Link>
            </div>
            <div className="mb-10"></div>
            <div>
              <Link
                href="/penilaianadmin"
                className="px-12 text-white font-semibold text-base text-center bg-primary hover:bg-bluehover py-2.5 rounded-xl mt-10"
              >
                Penilaian
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pr-5 ml-[218px]">
        <nav className="flex items-center pb-[5px] pt-3 border-b border-primary fixed bg-white mb-9 z-10">
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
        <div className="mt-[96px] w-[1220px]">
          <TablePenilaianAdmin />
        </div>
      </div>
    </main>
  );
}
