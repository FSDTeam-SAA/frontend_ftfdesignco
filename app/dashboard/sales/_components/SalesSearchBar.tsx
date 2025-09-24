import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SalesSearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  placeholder?: string;
}

export const SalesSearchBar: React.FC<SalesSearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onReset,
  placeholder = "Enter Employee ID",
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-48"
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline" onClick={onSearch}>
        Search
      </Button>
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};
