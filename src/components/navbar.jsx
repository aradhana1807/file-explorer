import { Terminal } from "lucide-react";
import { ModeToggle } from "./toggle-dark";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border shadow-sm bg-[#f1f1f1] dark:bg-[#2c2c2c] px-10 py-2">
      <div className="flex items-center">
        <Terminal className="w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold">FileBrowser</h1>
      </div>

      <div className="flex items-center">
        <Button
          className="mr-2"
          variant="outline"
          size="icon"
          onClick={() =>
            window.open("https://github.com/aradhana1807", "_blank")
          }
        >
          <Github className="w-4 h-4" />
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};
