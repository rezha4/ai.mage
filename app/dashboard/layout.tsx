"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      {showSidebar ? (
        <aside
          className={`flex flex-col gap-4 justify-between items-center p-4 shadow-xl h-screen w-1/4 bg-gradient-to-b from-slate-200 to-slate-400`}
        >
          <div className="space-y-8">
            <h2 className="text-3xl font-serif flex items-center justify-around">
              AI.mage
            </h2>
            <div className="flex flex-col space-y-4">
              <Button className="bg-gray-400" variant="secondary">
                <Link href={"/dashboard"}>Home</Link>
              </Button>
              <Button variant="secondary">
                <Link href={"/dashboard/remove-background"}>Remove Background</Link>
              </Button>
              {/* <Button variant="secondary">
                <Link href={"#"}>Remove Background</Link>
              </Button>
              <Button variant="secondary">
                <Link href={"#"}>Remove Background</Link>
              </Button>
              <Button variant="secondary">
                <Link href={"#"}>Remove Background</Link>
              </Button> */}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Button>Buy more credits</Button>
            <UserButton />
          </div>
        </aside>
      ) : (
        <div className="mt-4 ml-4">
          <Button onClick={() => setShowSidebar((prev) => !prev)}>
            <HamburgerMenuIcon />
          </Button>
        </div>
      )}
      <div onClick={() => setShowSidebar(false)} className="p-4 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
