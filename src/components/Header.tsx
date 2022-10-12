import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="mx-auto flex max-w-screen-xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
      <Link href="/">
        <a className="text-2xl font-bold transition-colors hover:text-gray-300">New Words</a>
      </Link>

      {session && (
        <button type="button" className="group flex shrink-0 items-center rounded-lg transition">
          <Image
            alt={`Avatar of ${session.user?.name}`}
            src={session.user?.image ?? ""}
            className="rounded-full object-cover"
            width={40}
            height={40}
          />

          <p className="ml-2 hidden text-left text-xs sm:block">
            <strong className="block font-medium">{session.user?.name}</strong>

            <span className="text-gray-300">{session.user?.email}</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 hidden h-5 w-5 text-gray-300 transition group-hover:text-gray-400 sm:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      )}
    </nav>
  );
};
