"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Trello } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


export default function Navber() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const isBoardPage = pathname.startsWith("/boards/");
  return (
    <header className="border-b-0  bg-white/80 backdrop-blur-sm top-0 z-50">
      <div className="container mx-auto px-4 py3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trello className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          <span className=" text-xl sm:text-2xl font-bold  text-gray-900">
            trello clnoe
          </span>
        </div>
        <div className="flex items-center space-x-2  sm:space-x-4 ">
          {isSignedIn ? (
            <div className="flex  flex-col  sm:flex-row items-end  sm:itmes-center space-y-1 sm:space-y-0 sm:space-x-4">
              <span className="text-sm sm:text-sm text-gray-600 hidden sm:block">
                welcome, {user.firstName ?? user.emailAddresses[0].emailAddress}
              </span>
              <Link href={"/dashboard"}>
                <Button size="sm" className=" text-xs sm:text-sm">
                  go to  Dashboard <ArrowRight />
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className=" text-xs sm:text-sm"
                >
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" className=" text-xs sm:text-sm">
                  Sign up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
