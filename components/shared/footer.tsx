import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#020617] py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Branding */}
        <div className="flex items-center gap-2 opacity-50">
          <span className="text-xl font-bold tracking-tighter text-white">
            AI.<span className="text-cyan-400">mage</span>
          </span>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/rezha4/ai.mage"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
        >
          <GitHubLogoIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="text-sm font-medium">Star on GitHub</span>
        </a>

        {/* Copyright */}
        <p className="text-xs text-slate-600">
          © {currentYear} AI.mage. Built for the magic of creation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
