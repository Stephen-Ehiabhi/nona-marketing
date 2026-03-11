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

