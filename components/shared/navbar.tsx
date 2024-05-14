import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const Navbar = () => {
  const user = auth();

  return (
    <nav className="font-serif flex justify-between items-center p-4 shadow-md">
      <h1 className="text-4xl">
        <Link href="/">
          <Button className="text-4xl" variant="link">
            AI.mage{" "}
          </Button>
        </Link>
        <p className="text-xl hidden text-black sm:inline-block">
          transform images with the magic of AI
        </p>
      </h1>
      <div className="flex gap-1">
        {!user.userId && (
          <Link href="/sign-in">
            <Button className="text-xl" variant="link">
              Login
            </Button>
          </Link>
        )}
        <UserButton />
      </div>
    </nav>
  );
};
