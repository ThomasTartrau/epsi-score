import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logoVariants = cva("rounded-2xl", {
  variants: {
    size: {
      default: "h-16 w-16",
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-20 w-20",
      xl: "h-24 w-24",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
  href?: string;
}

const Logo = ({ size, className, href = "/" }: LogoProps) => {
  return (
    <Link href={href} className="text-primary text-2xl font-bold">
      <Image
        src="/logo.png"
        alt="Logo"
        className={cn(logoVariants({ size }), className)}
        width={64}
        height={64}
      />
    </Link>
  );
};

export default Logo;
