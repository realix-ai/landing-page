
import React from "react";
import { cn } from "@/lib/utils";

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
}

const RetroButton = ({
  className,
  variant = "default",
  size = "md",
  ...props
}: RetroButtonProps) => {
  return (
    <button
      className={cn(
        "retro-button select-none",
        {
          "bg-blue-700 text-white hover:bg-blue-600": variant === "primary",
          "bg-red-700 text-white hover:bg-red-600": variant === "danger",
          "text-xs px-2 py-0.5": size === "sm",
          "text-lg px-6 py-1.5": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
};

export default RetroButton;
