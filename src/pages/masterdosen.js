import Image from "next/image";
import logo from "/public/logo.png";
import excel from "/public/excel.svg";
import Link from "next/link";
import DropNav from "./dropnav";
import PopupDosen from "./popupdosen";
import TableMasterDosen from "./tablemasterdosen";
import PopupProfil from "./popupprofil";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MasterDosen() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fetchUserImport = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("Importing file:", selectedFile);
      console.log(formData);

      const resUserImport = await fetch(`${API_URL}/master/user/import`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });

      const data = await resUserImport.json();
      console.log("import", data);
    }
  };

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
        <div className="flex items-center pb-[5px] pt-3 border-b border-primary fixed bg-white mb-9 z-10">
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
            <div className="text-base font-semibold ">Add Dosen :</div>
            <PopupDosen />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold ">Import :</div>
            <div className="flex gap-3">
              <div className="flex border-black border pl-2.5 py-2 items-center gap-5 rounded-xl w-[300px]">
                <input
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".xls, .xlsx"
                  className="text-sm text-black file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-black file:text-white"
                />
              </div>

              <button
                className={`flex ${
                  selectedFile ? "bg-primary" : "bg-gray-300"
                } items-center gap-2 px-3 py-2.5 rounded-2xl text-white font-semibold ${
                  !selectedFile ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={fetchUserImport}
                disabled={!selectedFile}
              >
                Import
              </button>
            </div>
            <p className="text-black font-semibold text-base">atau</p>

            <a
              href="/public/import_master_users.xlsx"
              download="import_master_users.xlsx"
              className="flex bg-excel items-center gap-2 px-3 py-2.5 rounded-2xl text-white font-semibold"
            >
              <Image src={excel} alt="add" />
              Download Template Excel
            </a>
          </div>
        </div>
        <div className="mb-[35px] col-2"></div>
        <TableMasterDosen />
      </div>
    </main>
  );
}
