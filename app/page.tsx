import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import {
  MagicWandIcon,
  ArrowRightIcon,
  MixIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex flex-col justify-center items-center py-20 px-4">
        {/* The "Genie Smoke" Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="relative z-10 space-y-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
            <MagicWandIcon className="w-4 h-4" />
            <span>AI-Powered Magic</span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter italic">
            AI.
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600">
              mage
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Wish for it, and it is done. <br />
            <span className="text-white font-normal">
              Recolor, Restore, and Recreate
            </span>{" "}
            images with simple prompts.
          </p>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-[#FFD700] hover:bg-[#FACC15] text-black font-bold h-14 px-8 rounded-full text-lg shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)] transition-all hover:scale-105"
              >
                {user ? "Go to dashboard" : "Try for Free"}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <MixIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold tracking-tight">
            Our Features
          </h2>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              src: "/recolor-example.png",
              label: "Object Recoloring",
              color: "border-cyan-500/20",
            },
            {
              src: "/remove-object-example.png",
              label: "Object Removal",
              color: "border-blue-500/20",
            },
            {
              src: "/restore-example.png",
              label: "Image Restoration",
              color: "border-indigo-500/20",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group bg-slate-900/40 border ${feature.color} p-2 rounded-2xl transition-all hover:bg-slate-900/60`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                <Image
                  src={feature.src}
                  fill
                  alt={feature.label}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-center font-medium pb-4 text-slate-300">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
