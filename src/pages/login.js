import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import prasmul from "/public/prasmul.png";
import logo from "/public/logo.png";
import micrsft from "/public/microsoft.png";
import { RaceBy } from "@uiball/loaders";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const auth = session?.authSuccess;
  const userRoleId = session?.data?.data?.id_role;

  console.log(session?.azureToken);
  console.log(session?.data?.data);
  console.log(session?.authSuccess);
  console.log(auth, "masuk");

  useEffect(() => {
    if (status === "authenticated") {
      if (auth) {
        if (userRoleId === 1) {
          router.push("/dashboardadmin");
        } else if (userRoleId === 2 || userRoleId === 3) {
          router.push("/dashboarddosen");
        } else if (userRoleId === 4) {
          router.push("/dashboardmahasiswa");
        }
      } else {
        router.replace("/loginfailed");
      }
    } else {
    }
  }, [auth, router, status, userRoleId]);

  console.log(session?.data?.data);

  const PopupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  return (
    <>
      {!session?.authSuccess ? (
        <main className="bg-primary h-screen">
          <div className="grid place-items-center h-screen fixed w-screen">
            <Image
              className="w-screen"
              src={prasmul}
              alt="Universitas Prasetiya Mulya"
            />
          </div>
          <div className="grid place-items-center h-screen fixed w-screen">
            <div className="rounded-xl bg-cardlogin fixed py-12 px-12">
              <div className="space-y-4">
                <div className="flex justify-center gap-3 items-center pb-5 border-b-2 border-b-black">
                  <Image alt="logo" src={logo} />
                  <div className="col-2">
                    <div className="text-primary text-xs font-bold">
                      UNIVERSITAS
                    </div>
                    <div className="text-primary text-2xl font-bold">
                      PRASETIYA MULYA
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-black font-xl font-semibold my-16 mx-28">
                DASHBOARD
              </div>
              <button
                className="flex justify-center gap-2 bg-btnsignin px-[50px] py-5 rounded-2xl text-white text-sm font-semibold"
                onClick={() => PopupCenter("./signin", "Sign In")}
              >
                <Image alt="mic" src={micrsft} />
                Sign In with Microsoft Account
              </button>
            </div>
          </div>
        </main>
      ) : (
        <div className="bg-white h-screen grid place-content-center w-screen gap-3">
          <div className="space-y-4">
            <div className="flex justify-center gap-3 items-center pb-5 ">
              <Image alt="logo" src={logo} />
              <div className="col-2">
                <div className="text-primary text-xs font-bold">
                  UNIVERSITAS
                </div>
                <div className="text-primary text-2xl font-bold">
                  PRASETIYA MULYA
                </div>
              </div>
            </div>
          </div>
          <RaceBy size={300} lineWeight={5} speed={1.4} color="#082658" />
        </div>
      )}
    </>
  );
}
