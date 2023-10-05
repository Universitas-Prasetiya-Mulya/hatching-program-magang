import Image from "next/image";
import logo from "/public/logo.png";
import React from "react";
import Link from "next/link";
import PopupProfil from "./popupprofil";

import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";

const TableMahasiswa = dynamic(import("./tablemahasiswa"), { ssr: false });

export default function NilaiMahasiswa() {
  return (
    <main className=" bg-white h-screen w-[1465px] flex">
      <div className="w-[200px] pb-[82px] bg-bluenav fixed rounded-r-2xl place-items-center z-10">
        <div className="mt-7 mb-28 border-b border-white">
          <div className="text-white font-bold text-2xl text-center pb-2.5">
            Hatching <br /> Program
          </div>
        </div>
        <div className="px-4 grid grid-col space-y-80">
          <div>
            <div className="mb-8">
              <Link
                href="/dashboardmahasiswa"
                className="px-10 text-white font-semibold text-base text-center bg-bluenav hover:bg-bluehover py-2.5 rounded-xl"
              >
                Dashboard
              </Link>
            </div>
            <div>
              <Link
                href=""
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
      </div>
      <div className="space-y-[35px] mt-[96px] w-[1220px]">
        <div className="flex justify-between w-[1100px]">
          <div className="grid col-2 space-y-[9px]">
            <div className="text-greyfont text-xs font-semibold">
              No Kelompok
            </div>
            <div className="bg-bluefield w-[500px] h-[58px] flex place items-center pl-[15px] rounded-[15px]">
              <div className="text-[20px] text-black font-semibold">00017</div>
            </div>
          </div>
          <div className="grid col-2 space-y-[9px]">
            <div className="text-greyfont text-xs font-semibold">
              Nama Kelompok
            </div>
            <div className="bg-bluefield w-[500px] h-[58px] flex place items-center pl-[15px] rounded-[15px]">
              <div className="text-[20px] text-black font-semibold">
                Kelompok Coding
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-[1100px] mt-[30px]">
          <div className="grid col-2 space-y-[9px]">
            <div className="text-greyfont text-xs font-semibold">
              Dosen Pembimbing 1
            </div>
            <div className="bg-bluefield w-[500px] h-[58px] flex place items-center pl-[15px] rounded-[15px]">
              <div className="text-[20px] text-black font-semibold">
                Bpk. Susilo Yudi Akbar
              </div>
            </div>
          </div>
          <div className="grid col-2 space-y-[9px]">
            <div className="text-greyfont text-xs font-semibold">
              Dosen Pembimbing 2
            </div>
            <div className="bg-bluefield w-[500px] h-[58px] flex place items-center pl-[15px] rounded-[15px]">
              <div className="text-[20px] text-black font-semibold">
                Ibu Siti Khotimah Wijayanti
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-2 space-y-[9px] mt-[30px]">
          <div className="text-greyfont text-xs font-semibold">
            Ide Ringkasan Bisnis
          </div>
          <div className="bg-bluefield w-[1100px] h-[58px] flex place items-center pl-[15px] rounded-[15px]">
            <div className="text-[20px] text-black font-semibold">
              Perancangan dan Pembuatan Bisnis Makanan Modern yang disukai oleh
              semua Kalangan, Baik Tua maupun Muda
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <TableMahasiswa />
        </div>
      </div>
    </main>
  );
}
