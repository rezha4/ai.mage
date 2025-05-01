import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Button className="text-4xl font-serif" variant="link">
            AI.mage{" "}
          </Button>
        </Link>
        <p className="text-md hidden text-black sm:inline-block">
          transform images with the magic of AI
        </p>
      </div>
      <div className="flex gap-1">
        {!user && (
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
