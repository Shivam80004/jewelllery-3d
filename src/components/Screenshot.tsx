import { Camera } from "lucide-react";

export default function Screenshot(){




  const captureWebGL = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
      console.error("No canvas found!");
      return;
    }

    requestAnimationFrame(() => {
      try {
        // Capture the WebGL canvas as an image
        const image = canvas.toDataURL("image/png"); // PNG 
        // Create an anchor tag for downloading
        const link = document.createElement("a");
        link.href = image;
        link.download = "ring_screenshot.png";
        link.click();
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      }
    });
  };


return (
  <>
    <button
      onClick={captureWebGL}
      className="px-4 py-2 rounded-full z-20  bg-mygray shadow-md hover:bg-white transition-all  flex justify-center items-center">
      <Camera className=" stroke-peach-200 " size={30} />
    </button>
  </>
);
}