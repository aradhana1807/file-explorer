import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { File, FilePlus, Folder, FolderOpen, FolderPlus } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const FileExplorer = ({ handleInsertNode, explorer }) => {
  if (explorer.isFolder) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
      visible: false,
      isFolder: null,
    });

    const handleNewFolder = (e, isFolder) => {
      e.stopPropagation();
      setExpand(true);

      setShowInput({
        visible: true,
        isFolder,
      });
    };

    const onAddFolder = (e) => {
      if (e.keyCode === 13 && e.target.value) {
        handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
        toast.success(
          `Added ${showInput.isFolder ? "Folder" : "File"} ${e.target.value}`
        );
        setShowInput({ ...showInput, visible: false });
      }
    };

    return (
      <div>
        <div className="flex justify-between">
          <Button
            className="flex items-center cursor-pointer"
            variant="ghost"
            onClick={() => setExpand(!expand)}
          >
            {expand ? (
              <FolderOpen
                fill="#FFBF00"
                className="w-5 h-5 mr-2 dark:text-black"
              />
            ) : (
              <Folder className="w-5 h-5 text-amber-600 mr-2" fill="#FFBF00" />
            )}{" "}
            {explorer.name}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => handleNewFolder(e, true)}
            >
              Folder
              <FolderPlus className="ml-2 w-5 h-5 text-amber-600" />
            </Button>
            <Button
              onClick={(e) => handleNewFolder(e, false)}
              size="sm"
              variant="outline"
            >
              File
              <FilePlus className="ml-2 w-5 h-5 text-blue-500" />
            </Button>
          </div>
        </div>

        <div className={cn("ml-6 flex flex-col", expand ? "block" : "hidden")}>
          {showInput.visible && (
            <div className="flex gap-2 items-center transition">
              <span>
                {showInput.isFolder ? (
                  <Folder className="w-5 h-5 text-amber-600" fill="#FFBF00" />
                ) : (
                  <File className="w-5 h-5 text-blue-500" />
                )}
              </span>

              <Input
                autoFocus
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="w-[20vw] h-8"
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <FileExplorer
                handleInsertNode={handleInsertNode}
                explorer={item}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Button className="flex items-center cursor-pointer" variant="ghost">
        <File className="w-5 h-5 text-blue-500 mr-2" /> {explorer.name}
      </Button>
    );
  }
};
