"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ResponsiveModal = ({
  trigger,
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const ResponsiveModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isMobile = useIsMobile();
  const Component = isMobile ? DrawerHeader : DialogHeader;

  return <Component className={cn("", className)} {...props} />;
};

const ResponsiveModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isMobile = useIsMobile();
  const Component = isMobile ? DrawerFooter : DialogFooter;

  return <Component className={cn("", className)} {...props} />;
};

const ResponsiveModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  const Component = isMobile ? DrawerTitle : DialogTitle;

  return <Component ref={ref} className={cn("", className)} {...props} />;
});
ResponsiveModalTitle.displayName = "ResponsiveModalTitle";

const ResponsiveModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  const Component = isMobile ? DrawerDescription : DialogDescription;

  return <Component ref={ref} className={cn("", className)} {...props} />;
});
ResponsiveModalDescription.displayName = "ResponsiveModalDescription";

export {
  ResponsiveModal,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
};
