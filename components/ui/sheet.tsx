"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/* ROOT */
const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

/* PORTAL */
const SheetPortal = Dialog.Portal;

/* OVERLAY */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

/* CONTENT */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ className, children, side = "left", ...props }, ref) => {
  const sideClasses = {
    left: "fixed left-0 top-0 h-full w-72 border-r",
    right: "fixed right-0 top-0 h-full w-72 border-l",
    top: "fixed top-0 left-0 w-full h-64 border-b",
    bottom: "fixed bottom-0 left-0 w-full h-64 border-t",
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        ref={ref}
        className={cn(
          "z-50 bg-white dark:bg-slate-900 p-6 shadow-lg transition ease-in-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}

        {/* CLOSE BUTTON */}
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-5 w-5" />
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = "SheetContent";

/* HEADER */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

/* FOOTER */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex justify-end gap-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

/* TITLE */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

/* DESCRIPTION */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
};