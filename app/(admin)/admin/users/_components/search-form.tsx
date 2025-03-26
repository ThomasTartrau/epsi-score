"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchFormProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchForm({
  initialQuery = "",
  onSearch,
  isLoading = false,
}: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="search"
        placeholder="Rechercher par email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
