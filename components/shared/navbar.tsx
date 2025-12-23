import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { MagicWandIcon } from "@radix-ui/react-icons";

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-cyan-500/20 p-1.5 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
              <MagicWandIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              AI.<span className="text-cyan-400">mage</span>
            </span>
          </Link>
          <p className="text-sm hidden md:inline-block text-slate-400 font-light border-l border-slate-800 pl-4">
            Transform images with the magic of AI
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!user && (
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/5"
              >
                Login
              </Button>
            </Link>
          )}

          {/* Dashboard shortcut for logged in users */}
          {user && (
            <Link href="/dashboard" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                Dashboard
              </Button>
            </Link>
          )}

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};
