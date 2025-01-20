import { Input } from "../ui/input";

interface SearchInputProps {
  searchQuery: string;
  placeholder: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  placeholder,
  handleSearchChange,
}) => (
  <div className="ml-4">
    <Input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearchChange}
      className="w-full max-w-sm p-2 rounded-md border border-gray-300"
    />
  </div>
);

export default SearchInput;
