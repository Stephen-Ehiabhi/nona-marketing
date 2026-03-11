"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface PhoneMockupProps {
  children?: ReactNode;
  screenshot?: string;
  alt?: string;
  variant?: "hero" | "feature";
  className?: string;
  style?: React.CSSProperties;
}

export default function PhoneMockup({
  children,
  screenshot,
  alt = "Nona app screenshot",
  variant = "feature",
  className = "",
  style,
}: PhoneMockupProps) {
  const sizeClass = variant === "hero"
    ? "w-[280px] md:w-[320px] lg:w-[340px]"
    : "w-[250px] md:w-[280px]";

  return (
    <div className={`iphone-15-pro ${sizeClass} ${className}`} style={style}>
      {/* Dynamic Island */}
      <div className="iphone-di" />
      {/* Screen */}
      <div className="iphone-screen">
        {screenshot ? (
          <Image
            src={screenshot}
            alt={alt}
            width={500}
            height={1088}
            className="w-full h-auto block"
            priority={variant === "hero"}
          />
        ) : (
          children
        )}
      </div>
      {/* Side buttons */}
      <div className="iphone-btn-r" />
      <div className="iphone-btn-l1" />
      <div className="iphone-btn-l2" />
      <div className="iphone-btn-l3" />
    </div>
  );
}
