"use client"
 
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
 
import { cn } from "@/lib/utils"
 
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  >(({ className, value, ...props }, ref) => (
  <div className="overflow-hidden">
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full rounded-full bg-primary/20 ",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full   flex-1 bg-purple-400 rounded-full transition-all shadow-2xl shadow-purple-600"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
      </ProgressPrimitive.Root>
      </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName
 
export { Progress }
 