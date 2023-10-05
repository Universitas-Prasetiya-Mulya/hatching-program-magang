import Image from "next/image";
import logo from "/public/logo.png";
import { signOut } from "next-auth/react";

export default function LoginFailed() {
  return (
    <main className="bg-primary h-screen">
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
          <div className="text-black text-xl font-semibold my-16 mx-28">
            Login Failed. You cant login
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-[500px] flex justify-center gap-2 bg-btnsignin px-[50px] py-5 rounded-2xl text-white text-lg font-semibold w-20s"
          >
            Back to login page
          </button>
        </div>
      </div>
    </main>
  );
}
