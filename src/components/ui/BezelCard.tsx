import { cn } from "@/lib/utils";

interface BezelCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

export function BezelCard({
  children,
  className,
  innerClassName,
  padding = "md",
}: BezelCardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05]",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[calc(2rem-0.375rem)] bg-surface shadow-soft",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]",
          paddingMap[padding],
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
