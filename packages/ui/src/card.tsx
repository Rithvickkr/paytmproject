import React from "react";

export function Card({
  title,
  children,
}: { 
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-4">
      <h1 className="text-xl border-b pb-2 text-white">{title}</h1>
      <span>{children}</span>
    </div>
  );
}
