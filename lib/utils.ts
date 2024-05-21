import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error("URL is missing");
  }

  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length) {
        a.download = `${filename.replace(" ", "_")}.png`;
      }
      document.body.appendChild(a);
      a.click();
    })
    .catch((err) => console.error(err));
};
