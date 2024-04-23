"use client";

import { useBalance } from "@repo/store/useBalance";

export default function() {
  const balance = useBalance();
  return <div className="text-4xl">
    Hi there {balance}
  </div>
}