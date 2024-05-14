import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <nav className="font-serif flex justify-between items-center p-4 shadow-md">
      <h1 className="text-4xl">
        AI.mage <p className="text-xl hidden text-black sm:inline-block">transform images with the magic of AI</p>
      </h1>
      <p className="text-xl">Login</p>
    </nav>
  );
};
