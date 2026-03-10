"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  householdSize: string;
  frustration: string;
  willingnessToPay: string;
  interests: string[];
}

const interestOptions = [
  { id: "meal-planning", label: "Meal Planning" },
  { id: "inventory", label: "Inventory Tracking" },
  { id: "shopping", label: "Shopping List" },
  { id: "recipes", label: "Recipe Suggestions" },
];

const priceOptions = [
  { value: "free", label: "Free only" },
  { value: "2.99", label: "\u20AC2.99/mo" },
  { value: "4.99", label: "\u20AC4.99/mo" },
  { value: "9.99", label: "\u20AC9.99/mo" },
];

export default function BetaSignup() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    householdSize: "2",
    frustration: "",
    willingnessToPay: "free",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (id: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

