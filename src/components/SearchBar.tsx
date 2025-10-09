import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // You can add debounced search logic here
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
    </div>
  );
}

export default SearchBar;
