import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

export const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="container mx-auto flex items-center justify-between gap-8 px-6 py-4 sm:px-4">
      <Link href="/">
        <a className="text-2xl font-bold transition-colors hover:text-contrast-secondary">
          New Words
        </a>
      </Link>

      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg outline-none transition"
            >
              {session.user?.image ? (
                <Image
                  alt={`Avatar of ${session.user?.name}`}
                  src={session.user?.image ?? ""}
                  className="rounded-full object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xl text-blue-900">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </span>
              )}

              <p className="ml-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium">{session.user?.name}</strong>

                <span className="text-gray-300">{session.user?.email}</span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-4 hidden h-5 w-5 text-contrast-secondary transition group-hover:text-contrast-dark sm:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/api/auth/signin">
          <a className="text-sm font-medium transition-colors hover:text-contrast-secondary">
            Sign in
          </a>
        </Link>
      )}
    </nav>
  );
};
