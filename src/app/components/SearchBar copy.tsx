"use client";
import { useState, ChangeEvent } from "react";
import { Search, ShoppingCart, Heart, SlidersHorizontal } from "lucide-react";

const suggestions: string[] = [
  "Cusana",
  "CureWell",
  "CuisineCo",
  "WellnessHub",
  "NutriLife",
  "BioPharma",
];
function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
    } else {
      const results = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      setFiltered(results);
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setFiltered([]);
  };

  return (
    // {/* Center: Search bar */}
    <div className="absolute left-1/2 ml-10 mt-2 -translate-x-1/2 w-full max-w-xl flex justify-center bg-[rgb(255,255,255)] ">
      '{" "}
      <div className="flex items-center bg-[#ececec] rounded-xl px-3 py-1 w-full shadow-sm">
        ' <Search size={20} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="search business names"
          // className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400"
        />
        <select className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400">
          {/*<p>We do Web Development for the following fields:</p>*/}
          <option value="e-commerce">e-commerce</option>
          <option value="health">health</option>
          <option value="education">education</option>
          <option value="finance">finance</option>
          <option value="real-estate">real-estate</option>
          <option value="portfolio">portfolio</option>
          <option value="blog">blog</option>
          <option value="entertainment">entertainment</option>
          <option value="non-profit">non-profit</option>
          <option value="technology">technology</option>
          <option value="travel">travel</option>
          <option value="restaurant">restaurant</option>
          <option value="personal">personal</option>
          <option value="fashion">fashion</option>
          <option value="automotive">automotive</option>
          <option value="legal">legal</option>
          <option value="consulting">consulting</option>
          <option value="marketing">marketing</option>
          <option value="media">media</option>
          <option value="sports">sports</option>
          <option value="other">other</option>
        </select>
        <SlidersHorizontal
          size={20}
          className="text-gray-400 ml-2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SearchBar;
