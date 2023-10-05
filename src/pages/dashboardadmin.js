import Image from "next/image";
import logo from "/public/logo.png";
import cover from "/public/cover.png";
import Link from "next/link";
import dynamic from "next/dynamic";
import DropNav from "./dropnav";
import PopupProfil from "./popupprofil";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Chart = dynamic(import("./chart"), { ssr: false });

export default function DashboardAdmin() {
  const { data: session } = useSession();
  const [userLogout, setUserLogout] = useState(null);

  async function fetchLogout() {
    const resLogout = await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await resLogout.json();
    console.log(data?.meta?.status);
    setUserLogout(data);
  }

  useEffect(() => {
    fetchLogout();
    console.log(fetchLogout, "metuo2");
  }, [session]);

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
          onClick={() => {
            signOut({ callbackUrl: "/login" });
            fetchLogout();
          }}
        >
          Logout
        </button>
        <div className="px-4 grid grid-col space-y-36">
          <div>
            <div className="mb-10">
              <Link
                href="/dashboardadmin"
                className="px-10 text-white font-semibold text-base text-center bg-primary py-2.5 rounded-xl"
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
        <div className="space-y-[35px] mt-[96px]">
          <div>
            <Image className="w-[1224px]" alt="cover" src={cover} />
          </div>
          <div className="flex flex-col-2 gap-5">
            <div className="bg-primary grid grid-col-2 rounded-2xl px-10 pt-[10px] pb-[15px] place-items-center space-y-6">
              <div className="text-center text-xl text-white font-semibold ">
                Jumlah <br /> Mahasiswa
              </div>
              <div className="h-[120px] w-[120px] grid place-items-center rounded-full border-yellow border-8">
                <div className="text-white text-2xl font-semibold">2.500</div>
              </div>
            </div>
            <div className=" w-[1000px] px-5 py-[10px] place-items-center border rounded-2xl space-y-3 border-primary">
              <div className="text-black text-xl font-semibold text-center pb-2 border-b border-grey">
                Stage
              </div>
              <div className="gap-8 flex">
                <div className="bg-primary rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 1
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      2.500
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-black rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 2
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      2.000
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-greenstage rounded-2xl w-[110px] h-[148px] pt-2.5 text-center place-items-center space-y-1">
                  <div className="text-black text-base font-semibold">
                    Stage 3
                  </div>
                  <div className="text-black text-sm font-normal">Now</div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-black text-[32px] font-semibold">
                      500
                    </div>
                    <div className="text-black text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-grey rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 4
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      -
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-grey rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 5
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      -
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-grey rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 6
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      -
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
                <div className="bg-grey rounded-2xl w-[110px] h-[148px] grid place-items-center">
                  <div className="text-white text-base font-semibold">
                    Stage 7
                  </div>
                  <div className="grid place-items-center gap-y-0.5">
                    <div className="text-white text-[32px] font-semibold">
                      -
                    </div>
                    <div className="text-white text-sm font-normal">
                      Mahasiswa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-primary rounded-2xl py-5 pr-[43px] space-y-25px">
            <div className="space-y-2.5">
              <div className="pl-5 text-black text-xl font-semibold">
                Detail Stage 3
              </div>
              <div className="pl-5 text-black text-base font-normal">
                Jumlah perolehan Mahasiswa yang sudah mengikuti Tugas Akhir pada
                hari ini
              </div>
            </div>
            <div className="flex">
              <div className="text-center">
                <Chart
                  data={[
                    { name: "Stage Clear", value: 3 },
                    { name: "Stage Coming", value: 4 },
                  ]}
                  chartColor={["#171717", "#D1D1D6"]}
                />
                <div className="text-black text-base font-semibold">Stage</div>
                <div className="text-black text-[38px] font-semibold">3</div>
              </div>
              <div className="text-center">
                <Chart
                  data={[
                    { name: "Proses", value: 0 },
                    { name: "Lulus", value: 500 },
                  ]}
                  chartColor={["#D1D1D6", "#6BF954"]}
                />
                <div className="text-black text-base font-semibold">Proses</div>
                <div className="text-black text-[38px] font-semibold">0</div>
              </div>
              <div className="text-center">
                <Chart
                  data={[
                    { name: "Mengikuti", value: 500 },
                    { name: "Belum ikut", value: 2000 },
                  ]}
                  chartColor={["#6BF954", "#D1D1D6"]}
                />
                <div className="text-black text-base font-semibold">Lulus</div>
                <div className="text-black text-[38px] font-semibold">500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
