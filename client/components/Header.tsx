"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("token");
    router.push("/signin");
  };

  return (
    <div>
      <nav className="bg-gray-50 dark:border-gray-300 border-b-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/">
              <span className="self-center text-2xl whitespace-nowrap dark:text-gray-600">
                Task Manager <b className="font-semibold">Coally</b>
              </span>
            </Link>
          </div>
          <div
            className=" bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300
             py-2 px-3 text-white font-sans cursor-pointer"
            onClick={signOut}
          >
            <span>Sign Out</span>
          </div>
        </div>
      </nav>
    </div>
  );
};
