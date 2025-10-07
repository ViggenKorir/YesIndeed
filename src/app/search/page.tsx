"use client";

import { useState } from "react";
// import { Search } from "lucide-react";

export default function SearchNav() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full flex justify-end p-4 bg-gradient-to-r from-blue-50 to-white">
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-40 h-40 bg-blue-300 [clip-path:circle(80%_at_100%_100%)]"
        />
      </div>
    </div>
  );
}
