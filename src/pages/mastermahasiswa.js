import Image from "next/image";
import logo from "/public/logo.png";
import importfile from "/public/import.svg";
import excel from "/public/excel.svg";
import Link from "next/link";
import DropNav from "./dropnav";
import PopupMahasiswa from "./popupmahasiswa";
import PopupProfil from "./popupprofil";
import { signOut } from "next-auth/react";
import TableMasterMahasiswa from "./tablemastermahasiswa";

export default function MasterMahasiswa() {
  return (
    <main className="bg-white h-screen w-[1465px] flex">
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
            <div className="mb-10">
              <Link
                href="/penilaiankelompok"
                className="px-12 text-white font-semibold text-base text-center bg-bluenav hover:bg-bluehover py-2.5 rounded-xl mt-10"
              >
                Hatching
              </Link>
            </div>
            <div>
              <Link
                href="/penilaianadmin"
                className="px-12 text-white font-semibold text-base text-center bg-bluenav hover:bg-bluehover py-2.5 rounded-xl mt-10"
              >
                Penilaian
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pr-5 ml-[218px]">
        <div className="flex items-center pb-[5px] pt-3 border-b border-primary fixed bg-white mb-9">
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
        </div>
        <div className="grid col-2 mt-[110px] space-y-[25px] mb-[35px]">
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold ">Add Mahasiswa :</div>
            <PopupMahasiswa />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold ">Import :</div>
            <div className=" flex border-black border pl-2.5 py-2 items-center gap-5 rounded-xl w-[300px]">
              <button className="bg-black items-center px-3 py-2 rounded-2xl text-white font-semibold text-sm">
                Pilih File
              </button>
              <p className="font-semibold text-xs">Tidak ada File</p>
            </div>
            <button className="flex bg-grey items-center gap-2 px-3 py-2.5 rounded-2xl text-white font-semibold ">
              <Image src={importfile} alt="add" />
              Import
            </button>
            <p className="text-black font-semibold text-base">atau</p>
            <button className="flex bg-excel items-center gap-2 px-3 py-2.5 rounded-2xl text-white font-semibold">
              <Image src={excel} alt="add" />
              Download Template Excel
            </button>
          </div>
        </div>
        <TableMasterMahasiswa />
      </div>
    </main>
  );
}
