/** @format */

import { Share2 } from "lucide-react";

export default function Share() {
  const captureWebGLandShare = async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

     requestAnimationFrame(async () => {
    try {
      const imageDataURL = canvas.toDataURL("image/png"); // Convert to PNG

      // Convert data URL to Blob
      const blob = await (await fetch(imageDataURL)).blob();
      const file = new File([blob], "ring_screenshot.png", { type: "image/png" });

      // Check if Web Share API is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Check out this ring!",
          text: "Look at this cool ring I designed!",
          url:"https://jewellery-configurator.vercel.app",
          files: [file],
        });
      } 
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  });
  };
  return (
    <>
      <button
        onClick={captureWebGLandShare}
        className="px-4 py-2 rounded-full z-20  bg-mygray shadow-md hover:bg-white transition-all   flex justify-center items-center">
        <Share2 className=" stroke-peach-200 " size={30} />
      </button>
    </>
  );
}
