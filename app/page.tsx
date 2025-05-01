import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <Navbar />
      <main className="space-y-2 sm:space-y-4 text-center flex flex-col justify-center items-center h-[500px]">
        <h1 className="sm:text-9xl text-6xl font-serif">AI.mage</h1>
        <p className="sm:text-2xl mt-4 px-2">
          Change object color, Improve Image Quality, many more...{" "}
          <br />
          Prompt based, with AI.
        </p>
        <Link href="/dashboard">
          <Button>
            {user ? (
              <span>Go to dashboard</span>
            ) : (
              <span>Try now</span>
            )}
          </Button>
        </Link>
      </main>
      <section className="text-center px-2">
      </section>
      <section className="flex flex-col justify-center items-center gap-4 my-4">
        <h2 className="text-2xl text-center">Our features:</h2>
        <Image
          src={"/recolor-example.png"}
          width={400}
          height={800}
          alt="recolor-example"
        />
        <Image
          src={"/remove-object-example.png"}
          width={400}
          height={800}
          alt="recolor-example"
        />
        <Image
          src={"/restore-example.png"}
          width={400}
          height={800}
          alt="recolor-example"
        />
      </section>
      <Footer />
    </div>
  );
}
