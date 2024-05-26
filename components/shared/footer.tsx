import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white py-4 flex justify-center items-center gap-4">
      <a href="https://github.com/rezha4/ai.mage" target="blank" className="flex gap-2 items-center text-xs">
        {" "}
        <GitHubLogoIcon width={25} height={25} />👈 Feel free to Fork, Clone, Create Issues, Create Pull Requests
      </a>
    </div>
  );
};

export default Footer;
