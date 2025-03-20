
import React from "react";
import { cn } from "@/lib/utils";
import { X, Minus, Square } from "lucide-react";

interface RetroWindowProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  width?: string;
  height?: string;
  showControls?: boolean;
  onClose?: () => void;
}

const RetroWindow = ({
  children,
  title,
  className,
  width = "auto",
  height = "auto",
  showControls = true,
  onClose,
}: RetroWindowProps) => {
  return (
    <div
      className={cn("retro-window", className)}
      style={{ width, height }}
    >
      <div className="retro-title-bar select-none">
        <div className="flex items-center space-x-1">
          {title}
        </div>
        {showControls && (
          <div className="flex items-center space-x-1">
            <button className="text-white focus:outline-none" aria-label="Minimize">
              <Minus size={12} />
            </button>
            <button className="text-white focus:outline-none" aria-label="Maximize">
              <Square size={10} />
            </button>
            <button 
              className="text-white focus:outline-none" 
              aria-label="Close"
              onClick={onClose}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default RetroWindow;
