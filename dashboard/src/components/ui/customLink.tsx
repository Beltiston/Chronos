"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useRef } from "react";

type CustomLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  prefetchDelay?: number;
};

export function CustomLink({
  href,
  children,
  className,
  prefetchDelay = 100,
  ...props
}: CustomLinkProps) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (typeof navigator === 'undefined') return;
      
    const connection = 'connection' in navigator ? navigator.connection : null;
    
    if (
      connection !== null &&
      typeof connection === 'object' &&
      'saveData' in connection &&
      connection.saveData
    ) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      router.prefetch(href.toString());
    }, prefetchDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
