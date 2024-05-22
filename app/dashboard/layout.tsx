"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EraserIcon,
  HamburgerMenuIcon,
  HomeIcon,
  MagicWandIcon,
  TransparencyGridIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex w-screen">
      <aside
        className={`flex flex-col gap-4 justify-between items-center p-2 shadow-xl min-h-screen  transition-all ${showSidebar ? "w-60" : "w-14"} `}
      >
        <div className="space-y-8 w-full">
          <div className="flex justify-between items-center">
            <h2 hidden={!showSidebar} className="text-3xl font-serif">AI.mage</h2>
            <Button onClick={() => setShowSidebar(prev => !prev)} size="icon">
              {showSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href={"/dashboard"}>
              <Button
                className={`flex justify-between w-full hover:bg-gray-600 ${
                  pathname === "/dashboard" ? "bg-gray-600" : ""
                }`}
                
              >
                <HomeIcon  />
                <p hidden={!showSidebar} className=" mb-1">Home</p>
              </Button>
            </Link>
            <Link href={"/dashboard/add/remove-background"}>
              <Button
                className={`flex justify-between w-full hover:bg-gray-600 ${
                  pathname === "/dashboard/add/remove-background" ? "bg-gray-600" : ""
                }`}
                
              >
                <TransparencyGridIcon  />
                <p hidden={!showSidebar} className=" mb-1">Remove Background</p>
              </Button>
            </Link>
            <Link href={"/dashboard/add/generative-fill"}>
              <Button
                className={`flex justify-between w-full hover:bg-gray-600 ${
                  pathname === "/dashboard/add/generative-fill" ? "bg-gray-600" : ""
                }`}
                
              >
                <MagicWandIcon width={20} height={20} />
                <p hidden={!showSidebar} className=" mb-1">Generative Fill</p>
              </Button>
            </Link>
            <Link href={"/dashboard/add/remove-object"}>
              <Button
                className={`flex justify-between w-full hover:bg-gray-600 ${
                  pathname === "/dashboard/add/remove-object" ? "bg-gray-600" : ""
                }`}
                
              >
                <EraserIcon width={20} height={20} />
                <p hidden={!showSidebar} className=" mb-1">Remove Object</p>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button className="overflow-hidden">Buy more credits</Button>
          <UserButton />
        </div>
      </aside>
      <div
        className="p-4 min-h-screen w-full overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
