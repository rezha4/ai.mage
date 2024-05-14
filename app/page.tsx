import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const user = auth();

  return (
    <div>
      <Navbar />
      <main className="space-y-2 sm:space-y-4 text-center flex flex-col justify-center items-center h-[500px]">
        <h1 className="sm:text-9xl text-6xl font-serif">AI.mage</h1>
        <p className="sm:text-2xl mt-4">
          Remove background, generative fill, change color, many
          more... <br />
          Prompt based, with AI.
        </p>
        <Link href="/dashboard">
          <Button>
            {user.userId ? (
              <span>Go to dashboard</span>
            ) : (
              <span>Try now</span>
            )}
          </Button>
        </Link>
      </main>
      <section>
        <p>lmao</p>
      </section>
    </div>
  );
}
