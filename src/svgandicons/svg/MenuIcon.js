import React from "react";

export default function MenuIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      height={24}
      width={24}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z" />
    </svg>
  );
}