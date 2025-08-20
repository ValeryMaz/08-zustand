import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (searchText: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}
