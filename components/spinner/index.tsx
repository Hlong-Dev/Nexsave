import React from "react";
import { Loader2 } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      icon: "h-10 w-10",
      lg: "h-6 w-6",
      default: "h-4 w-4",
      sm: "h-2 w-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
const Spinner = ({ size }: SpinnerProps) => {
  return <Loader2 className={cn(spinnerVariants({ size }))} />;
};

export default Spinner;
